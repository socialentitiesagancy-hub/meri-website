import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://socialentities.com';

interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
  /** true: "noindex, nofollow"; 'follow': "noindex, follow" (keep link equity flowing from thin pages). */
  noindex?: boolean | 'follow';
}

export function clipDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '') + '…';
}

export const MAX_TITLE = 60;

// Uses the first suffix that fits; otherwise shortens the name to fit the last one.
export function fitTitle(name: string, suffixes: string[]): string {
  const clean = name.replace(/\s+/g, ' ').trim();
  for (const suffix of suffixes) {
    if (clean.length + suffix.length <= MAX_TITLE) return clean + suffix;
  }
  const suffix = suffixes[suffixes.length - 1];
  return clipDescription(clean, MAX_TITLE - suffix.length) + suffix;
}

export const Seo: React.FC<SeoProps> = ({ title, description, canonical, noindex }) => {
  const { pathname } = useLocation();
  const path = (canonical ?? pathname).replace(/\/+$/, '') || '/';
  const url = path === '/' ? SITE_URL : SITE_URL + path;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta
        name="robots"
        content={
          noindex === 'follow'
            ? 'noindex, follow'
            : noindex
              ? 'noindex, nofollow'
              : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      {!noindex && <link rel="canonical" href={url} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:url" content={url} />
    </Helmet>
  );
};
