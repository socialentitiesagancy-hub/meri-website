import { CaseStudy } from '../types/caseStudy';

const STORAGE_KEY = 'se_case_studies_db_v2';
export const MAX_CASE_STUDIES = 6;

// Scratch initialization - no demo seed data by default
export const initialCaseStudiesSeed: CaseStudy[] = [];

export function getStoredCaseStudies(): CaseStudy[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Return empty scratch array
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.slice(0, MAX_CASE_STUDIES);
  } catch (err) {
    console.error('Failed to load case studies from localStorage', err);
    return [];
  }
}

export function saveCaseStudy(study: CaseStudy): { success: boolean; data: CaseStudy[]; message?: string } {
  const current = getStoredCaseStudies();
  const existingIndex = current.findIndex((c) => c.id === study.id);

  if (existingIndex < 0 && current.length >= MAX_CASE_STUDIES) {
    return {
      success: false,
      data: current,
      message: `Maximum limit of ${MAX_CASE_STUDIES} case studies reached. Please edit or remove an existing case study to publish a new one.`,
    };
  }

  let updated: CaseStudy[];
  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = study;
  } else {
    updated = [study, ...current];
  }

  // Ensure strict limit of 6
  updated = updated.slice(0, MAX_CASE_STUDIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return { success: true, data: updated };
}

export function deleteCaseStudy(id: string): CaseStudy[] {
  const current = getStoredCaseStudies();
  const updated = current.filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function togglePublishStatus(id: string): CaseStudy[] {
  const current = getStoredCaseStudies();
  const updated = current.map((c) => (c.id === id ? { ...c, isPublished: !c.isPublished } : c));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  const current = getStoredCaseStudies();
  return current.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

export function clearAllCaseStudies(): CaseStudy[] {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  return [];
}
