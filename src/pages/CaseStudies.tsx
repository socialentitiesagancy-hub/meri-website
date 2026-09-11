import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Sparkles, Filter, ExternalLink, Lock, CheckCircle2 } from 'lucide-react';
import { CaseStudy } from '../types/caseStudy';
import { getStoredCaseStudies } from '../services/caseStudyStorage';

export const CaseStudies: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const list = getStoredCaseStudies().filter((c) => c.isPublished);
    setCaseStudies(list);
  }, []);

  const categories = [
    'All',
    'Performance Marketing',
    'Search Engine Optimization',
    'Digital Marketing',
    'E-Commerce',
    'IT Solutions',
    'Brand Identity',
    'Content Creation',
  ];

  const filteredStudies =
    activeCategory === 'All'
      ? caseStudies
      : caseStudies.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <main className="flex-1 bg-white font-sans pt-8 sm:pt-12 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto w-full">
      {/* Hero Header */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-[#5B6A50]/10 text-[#5B6A50] font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm uppercase tracking-wider mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Proven Client Results</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F1A34] tracking-tight leading-[1.1] mb-6">
          Case Studies & Growth Stories
        </h1>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-4">
          Discover how Social Entities accelerates revenue, scales media buying, and engineers custom software for high-growth enterprises worldwide.
        </p>
        <div>
          <Link
            to="/admin-se-portal"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#5B6A50] font-semibold bg-stone-100 hover:bg-stone-200/80 px-3.5 py-1.5 rounded-full transition-colors"
          >
            <Lock className="w-3 h-3 text-[#5B6A50]" />
            <span>Manage & Add Case Studies (Admin)</span>
          </Link>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#5B6A50] text-white shadow-xs scale-102'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Case Studies */}
      {filteredStudies.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 rounded-3xl border border-stone-200">
          <p className="text-stone-500 text-base font-semibold mb-3">No case studies published in this category yet.</p>
          <Link
            to="/admin-se-portal"
            className="text-xs font-bold text-[#5B6A50] hover:underline"
          >
            Login to Admin to create one &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10">
          {filteredStudies.map((study) => (
            <article
              key={study.id}
              className="group bg-white rounded-3xl border border-stone-200/90 overflow-hidden hover:shadow-xl hover:border-[#5B6A50]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-100">
                  <img
                    src={study.coverImage}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#5B6A50] font-black text-xs px-3.5 py-1.5 rounded-full shadow-xs uppercase tracking-wider">
                    {study.category}
                  </div>
                </div>

                {/* Content info */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between text-xs text-stone-400 font-semibold mb-3">
                    <span className="text-stone-700 font-bold">{study.client}</span>
                    <span>{study.industry}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-[#0F1A34] mb-4 leading-tight group-hover:text-[#5B6A50] transition-colors">
                    {study.title}
                  </h2>

                  <p className="text-sm text-stone-600 leading-relaxed mb-6 line-clamp-3">
                    {study.summary}
                  </p>

                  {/* Impact Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-stone-100 mb-6 bg-stone-50/50 rounded-2xl p-4">
                    {study.metrics.slice(0, 4).map((m, idx) => (
                      <div key={idx}>
                        <span className="block text-lg sm:text-xl font-black text-[#5B6A50]">
                          {m.value}
                        </span>
                        <span className="text-[11px] font-semibold text-stone-500 line-clamp-1">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                <Link
                  to={`/case-studies/${study.slug}`}
                  className="w-full bg-[#0F1A34] group-hover:bg-[#5B6A50] text-white py-3.5 rounded-2xl font-bold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* CTA Bottom Banner */}
      <div className="mt-20 sm:mt-28 bg-[#0F1A34] rounded-3xl p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#5B6A50]" />
            <span>Ready for explosive growth?</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight mb-4">
            Let’s Build Your Next High-Impact Growth Story
          </h3>
          <p className="text-stone-300 text-sm sm:text-base mb-8 leading-relaxed">
            Partner with Social Entities for revenue-focused digital marketing, generative SEO, and custom software systems.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/contact"
              className="bg-[#5B6A50] hover:bg-[#4d5c43] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all shadow-md active:scale-98"
            >
              Book Strategy Call
            </Link>
            <Link
              to="/services"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
