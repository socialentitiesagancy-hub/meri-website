import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Building2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Share2,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { CaseStudy } from '../types/caseStudy';
import { getCaseStudyBySlug, getStoredCaseStudies } from '../services/caseStudyStorage';

export const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (slug) {
      const found = getCaseStudyBySlug(slug);
      if (found) {
        setStudy(found);
      } else {
        // Fallback to first study or redirect
        const all = getStoredCaseStudies();
        if (all.length > 0) {
          setStudy(all[0]);
        }
      }
    }
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!study) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-[#0F1A34] mb-3">Case Study Not Found</h2>
        <p className="text-sm text-stone-500 mb-6">The requested case study could not be loaded.</p>
        <Link
          to="/case-studies"
          className="bg-[#5B6A50] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
        >
          &larr; View All Case Studies
        </Link>
      </div>
    );
  }

  const relatedStudies = getStoredCaseStudies()
    .filter((c) => c.id !== study.id && c.isPublished)
    .slice(0, 2);

  return (
    <main className="flex-1 bg-white font-sans pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-stone-200 bg-stone-50/70 py-4 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-[#5B6A50] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Case Studies</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#5B6A50] bg-white border border-stone-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      <article className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12">
        {/* Header Badges */}
        <div className="flex items-center gap-2.5 flex-wrap mb-4">
          <span className="bg-[#5B6A50]/10 text-[#5B6A50] font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            {study.category}
          </span>
          <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
            {study.industry}
          </span>
          <span className="text-xs text-stone-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {study.publishedDate}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1A34] tracking-tight leading-[1.15] mb-6">
          {study.title}
        </h1>

        {/* Summary */}
        <p className="text-base sm:text-xl text-stone-600 leading-relaxed mb-10 max-w-4xl font-normal">
          {study.summary}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 bg-[#0F1A34] text-white rounded-3xl mb-12 shadow-lg">
          {study.metrics.map((metric, idx) => (
            <div key={idx} className="border-r last:border-r-0 border-white/10 pr-4">
              <span className="block text-2xl sm:text-4xl font-black text-[#8EA37F] mb-1">
                {metric.value}
              </span>
              <span className="text-xs sm:text-sm text-stone-300 font-semibold leading-snug">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden mb-12 border border-stone-200 shadow-md">
          <img
            src={study.coverImage}
            alt={study.title}
            loading="lazy"
            decoding="async"
            className="w-full h-[320px] sm:h-[480px] object-cover"
          />
        </div>

        {/* Main Formatted HTML Story from Gmail Editor */}
        <div className="max-w-3xl mx-auto">
          <div
            className="case-study-content text-stone-800 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: study.contentHtml }}
          />
        </div>

        {/* Bottom Author & Share row */}
        <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-stone-200 flex items-center justify-between flex-wrap gap-4 text-xs text-stone-500">
          <div>
            <span>Authored by </span>
            <strong className="text-stone-800">{study.author || 'Social Entities Strategic Team'}</strong>
          </div>
          <button
            type="button"
            onClick={handleShare}
            className="text-[#5B6A50] font-bold hover:underline"
          >
            Share this Case Study &rarr;
          </button>
        </div>

        {/* Next Steps CTA */}
        <div className="max-w-3xl mx-auto mt-16 bg-stone-50 rounded-3xl p-8 sm:p-10 border border-stone-200 text-center">
          <h3 className="text-2xl font-black text-[#0F1A34] mb-3">
            Want to see similar growth for your brand?
          </h3>
          <p className="text-sm text-stone-600 mb-6 max-w-lg mx-auto">
            Book a complimentary 30-minute growth roadmap session with our senior digital strategists.
          </p>
          <Link
            to="/contact"
            className="bg-[#5B6A50] hover:bg-[#4d5c43] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <span>Schedule Free Audit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related Case Studies */}
        {relatedStudies.length > 0 && (
          <div className="mt-20 pt-12 border-t border-stone-200">
            <h3 className="text-xl font-black text-[#0F1A34] mb-8">
              More Case Studies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedStudies.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/case-studies/${rel.slug}`}
                  className="group block bg-stone-50 rounded-2xl p-6 border border-stone-200 hover:border-[#5B6A50]/40 transition-all"
                >
                  <span className="text-[11px] font-bold text-[#5B6A50] uppercase tracking-wider block mb-2">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-base text-[#0F1A34] group-hover:text-[#5B6A50] transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2">
                    {rel.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
};
