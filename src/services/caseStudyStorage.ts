import { CaseStudy } from '../types/caseStudy';

const API = '/api/case-studies';
const LS_KEY = 'se_case_studies_cache';
export const MAX_CASE_STUDIES = 6;

function lsGet(): CaseStudy[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
}
function lsSet(studies: CaseStudy[]) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(studies)); } catch {}
}

export async function getStoredCaseStudies(): Promise<CaseStudy[]> {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error();
    const studies: CaseStudy[] = await res.json();
    lsSet(studies);
    return studies;
  } catch {
    return lsGet();
  }
}

export async function saveCaseStudy(
  study: CaseStudy
): Promise<{ success: boolean; data: CaseStudy[]; message?: string }> {
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(study),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Save failed' }));
      return { success: false, data: lsGet(), message: err.error };
    }
    const data: CaseStudy[] = await res.json();
    lsSet(data);
    return { success: true, data };
  } catch (err) {
    return { success: false, data: lsGet(), message: String(err) };
  }
}

export async function deleteCaseStudy(id: string): Promise<CaseStudy[]> {
  try {
    const res = await fetch(API, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error();
    const data: CaseStudy[] = await res.json();
    lsSet(data);
    return data;
  } catch {
    return lsGet();
  }
}

export async function togglePublishStatus(id: string): Promise<CaseStudy[]> {
  const all = await getStoredCaseStudies();
  const study = all.find((c) => c.id === id);
  if (!study) return all;
  return (await saveCaseStudy({ ...study, isPublished: !study.isPublished })).data;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  const all = await getStoredCaseStudies();
  return all.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

export async function clearAllCaseStudies(): Promise<CaseStudy[]> {
  const all = await getStoredCaseStudies();
  await Promise.all(all.map((c) => deleteCaseStudy(c.id)));
  lsSet([]);
  return [];
}

export const initialCaseStudiesSeed: CaseStudy[] = [];
