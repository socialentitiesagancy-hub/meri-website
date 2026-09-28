import type { BlogPost } from '../types/blog';
import type { CaseStudy } from '../types/caseStudy';

export interface InitialData {
  blogs?: BlogPost[];
  caseStudies?: CaseStudy[];
}

declare global {
  interface Window {
    __INITIAL_DATA__?: InitialData;
  }
}

let serverData: InitialData = {};

export function setServerInitialData(data: InitialData) {
  serverData = data;
}

export function getInitialData(): InitialData {
  if (typeof window === 'undefined') return serverData;
  return window.__INITIAL_DATA__ ?? {};
}
