import { BlogPost } from '../types/blog';

const BLOGS_STORAGE_KEY = 'se_blogs_db_v2';
export const MAX_BLOGS = 50;

export function getStoredBlogs(): BlogPost[] {
  try {
    const raw = localStorage.getItem(BLOGS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch (err) {
    console.error('Failed to load blogs from localStorage', err);
    return [];
  }
}

export function saveBlog(blog: BlogPost): { success: boolean; data: BlogPost[]; message?: string } {
  const current = getStoredBlogs();
  const existingIndex = current.findIndex((b) => b.id === blog.id);

  if (existingIndex < 0 && current.length >= MAX_BLOGS) {
    return {
      success: false,
      data: current,
      message: `Maximum limit of ${MAX_BLOGS} blogs reached. Please edit or delete an existing blog post.`,
    };
  }

  let updated: BlogPost[];
  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = blog;
  } else {
    updated = [blog, ...current];
  }

  localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(updated));
  return { success: true, data: updated };
}

export function deleteBlog(id: string): BlogPost[] {
  const current = getStoredBlogs();
  const updated = current.filter((b) => b.id !== id);
  localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function toggleBlogPublishStatus(id: string): BlogPost[] {
  const current = getStoredBlogs();
  const updated = current.map((b) => (b.id === id ? { ...b, isPublished: !b.isPublished } : b));
  localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearAllBlogs(): BlogPost[] {
  localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify([]));
  return [];
}

