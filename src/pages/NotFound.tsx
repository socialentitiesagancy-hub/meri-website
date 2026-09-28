import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

export const NotFound: React.FC = () => (
  <main className="flex-1 min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
    <Seo title="Page Not Found | Social Entities" noindex />
    <h1 className="text-2xl font-black text-[#0F1A34] mb-3">Page Not Found</h1>
    <p className="text-sm text-stone-500 mb-6">The page you're looking for doesn't exist or has moved.</p>
    <Link
      to="/"
      className="bg-[#5B6A50] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
    >
      &larr; Back to Home
    </Link>
  </main>
);
