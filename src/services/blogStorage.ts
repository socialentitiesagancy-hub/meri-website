import { BlogPost } from '../types/blog';

const API = '/api/blogs';
const LS_KEY = 'se_blogs_cache';
export const MAX_BLOGS = 50;

function lsGet(): BlogPost[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
}
function lsSet(blogs: BlogPost[]) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(blogs)); } catch {}
}

export async function getStoredBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error();
    const blogs: BlogPost[] = await res.json();
    lsSet(blogs);
    return blogs;
  } catch {
    return lsGet();
  }
}

export async function saveBlog(
  blog: BlogPost
): Promise<{ success: boolean; data: BlogPost[]; message?: string }> {
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    });
    if (!res.ok) throw new Error(await res.text());
    const data: BlogPost[] = await res.json();
    lsSet(data);
    return { success: true, data };
  } catch (err) {
    return { success: false, data: lsGet(), message: String(err) };
  }
}

export async function deleteBlog(id: string): Promise<BlogPost[]> {
  try {
    const res = await fetch(API, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error();
    const data: BlogPost[] = await res.json();
    lsSet(data);
    return data;
  } catch {
    return lsGet();
  }
}

export async function toggleBlogPublishStatus(id: string): Promise<BlogPost[]> {
  const all = await getStoredBlogs();
  const blog = all.find((b) => b.id === id);
  if (!blog) return all;
  return (await saveBlog({ ...blog, isPublished: !blog.isPublished })).data;
}

export async function clearAllBlogs(): Promise<BlogPost[]> {
  const all = await getStoredBlogs();
  for (const b of all) await deleteBlog(b.id);
  lsSet([]);
  return [];
}
