import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { get } from '@vercel/blob';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  try {
    process.loadEnvFile(path.join(root, '.env.local'));
  } catch {}
}

const MAX_TITLE = 60;

// Blob content is optional at build time: without it, static pages still build and lists render empty.
async function readBlobList(key) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const result = await get(key, { access: 'private', useCache: false });
    if (!result || !result.stream) return [];
    const data = await new Response(result.stream).json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn(`\n[prerender] WARNING: could not read ${key} from Vercel Blob (${err.message}). Building it as empty.\n`);
    return [];
  }
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.warn(
    '\n[prerender] WARNING: BLOB_READ_WRITE_TOKEN is not set. Static pages will build, but /blog and /case-studies\n' +
      '[prerender] will be prerendered with no posts and no /case-studies/<slug> pages will be generated.\n' +
      '[prerender] Set it in Vercel > Settings > Environment Variables for the Production and Preview builds.\n'
  );
}

// React 19 emits hoisted <title>/<meta>/<link> ahead of the app markup when there is no <head> in the tree.
const HOISTED = /^(?:\s*(?:<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>))+/;

function splitHead(markup) {
  const match = markup.match(HOISTED);
  if (!match) return { head: '', body: markup };
  return { head: match[0].trim(), body: markup.slice(match[0].length) };
}

function serialize(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

// Flat <route>.html so extensionless URLs resolve in both `vite preview` and Vercel cleanUrls.
const SITE_URL = 'https://socialentities.com';

// Admin-entered dates are "Sep 26, 2026" (blogs) or "September 2026" (case studies); keep only the precision they carry.
function toW3cDate(value) {
  if (typeof value !== 'string') return undefined;
  const text = value.trim();
  const withDay = /^[A-Za-z]+ \d{1,2}, \d{4}$/.test(text);
  const monthOnly = /^[A-Za-z]+ \d{4}$/.test(text);
  if (!withDay && !monthOnly) return undefined;
  const d = new Date(monthOnly ? text.replace(' ', ' 1, ') : text);
  if (Number.isNaN(d.getTime())) return undefined;
  const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  return withDay ? `${ym}-${String(d.getDate()).padStart(2, '0')}` : ym;
}

function newest(items) {
  return items.map((i) => toW3cDate(i.publishedDate)).filter(Boolean).sort().at(-1);
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildSitemap(entries) {
  const urls = entries.map(({ url, lastmod }) => {
    const loc = url === '/' ? `${SITE_URL}/` : SITE_URL + url;
    const mod = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>${mod}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

const ROBOTS_TXT = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

function outputFile(route) {
  return route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, `${route.slice(1)}.html`);
}

const { render, serviceIds, locationIds } = await import(pathToFileURL(ssrEntry).href);
const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('[prerender] dist/index.html has no empty <div id="root"></div>; was it already prerendered?');
}
await fs.writeFile(path.join(distDir, 'spa-shell.html'), template);

const [blogs, caseStudies] = await Promise.all([
  readBlobList('data/blogs.json'),
  readBlobList('data/case-studies.json'),
]);
const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;
const publishedStudies = caseStudies.filter((c) => c.isPublished && SAFE_SLUG.test(c.slug ?? ''));
for (const c of caseStudies) {
  if (c.isPublished && !SAFE_SLUG.test(c.slug ?? '')) {
    console.warn(`[prerender] WARNING: skipping case study with unsafe slug ${JSON.stringify(c.slug)}`);
  }
}

const routes = [
  { url: '/' },
  { url: '/about' },
  { url: '/services' },
  { url: '/contact' },
  { url: '/case-studies', data: { caseStudies }, lastmod: newest(publishedStudies) },
  { url: '/blog', data: { blogs }, lastmod: newest(blogs.filter((b) => b.isPublished)) },
  ...serviceIds.map((id) => ({ url: `/services/${id}` })),
  ...locationIds.map((id) => ({ url: `/locations/${id}` })),
  ...publishedStudies.map((c) => ({
    url: `/case-studies/${c.slug}`,
    data: { caseStudies },
    lastmod: toW3cDate(c.publishedDate),
  })),
  // Any unmatched path renders the NotFound view; Vercel serves this file with status 404.
  { url: '/__not-found', file: path.join(distDir, '404.html') },
];

const longTitles = [];

for (const route of routes) {
  const { url, data = {}, file = outputFile(url) } = route;
  const { head, body } = splitHead(render(url, data));
  const robots = (head.match(/<meta name="robots" content="([^"]*)"/) || [])[1] ?? '';
  if (robots.includes('noindex')) route.sitemap = false;
  const dataScript = Object.keys(data).length
    ? `<script>window.__INITIAL_DATA__=${serialize(data)}</script>`
    : '';
  const html = template
    .replace('</head>', `${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>${dataScript}`);

  const title = (head.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] ?? '';
  const titleText = title.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
  if (titleText.length > MAX_TITLE) longTitles.push(`${url} (${titleText.length}): ${titleText}`);

  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
  console.log(`[prerender] ${url} -> ${path.relative(root, file)}`);
}

if (longTitles.length) {
  throw new Error(`[prerender] titles over ${MAX_TITLE} characters:\n  ${longTitles.join('\n  ')}`);
}

const sitemapEntries = routes.filter((r) => r.sitemap !== false);
await fs.writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap(sitemapEntries));
await fs.writeFile(path.join(distDir, 'robots.txt'), ROBOTS_TXT);
console.log(`[prerender] sitemap.xml (${sitemapEntries.length} URLs) and robots.txt written`);

console.log(`[prerender] ${routes.length} routes (${blogs.length} blogs, ${publishedStudies.length} published case studies)`);
