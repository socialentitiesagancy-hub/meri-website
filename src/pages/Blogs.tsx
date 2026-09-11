import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ExternalLink,
  Lock,
  Calendar,
  Clock,
  ArrowUpRight,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { BlogPost } from '../types/blog';
import { getStoredBlogs } from '../services/blogStorage';

export const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const list = getStoredBlogs().filter((b) => b.isPublished);
    setBlogs(list);
  }, []);

  const categories = [
    'All',
    'Performance Marketing',
    'SEO & AEO',
    'Digital Strategy',
    'E-Commerce Growth',
    'AI & Automation',
    'Content & Creative',
    'Leadership',
  ];

  const filteredBlogs =
    activeCategory === 'All'
      ? blogs
      : blogs.filter((b) => b.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <main className="flex-1 bg-white font-sans pt-8 sm:pt-12 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto w-full">
      {/* Hero Header */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-[#536245]/10 text-[#536245] font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm uppercase tracking-wider mb-4">
          <Sparkles className="w-4 h-4 text-[#536245]" />
          <span>Thought Leadership & Industry Insights</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F1A34] tracking-tight leading-[1.1] mb-6">
          Marketing Insights & Growth Articles
        </h1>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-4">
          Actionable frameworks, media buying breakdowns, and algorithm updates curated by the Social Entities growth strategy team. Click any article card to read the complete discussion directly on LinkedIn.
        </p>
        <div>
          <Link
            to="/admin-se-portal"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#536245] font-semibold bg-stone-100 hover:bg-stone-200/80 px-3.5 py-1.5 rounded-full transition-colors"
          >
            <Lock className="w-3 h-3 text-[#536245]" />
            <span>Manage Blogs in CRM Portal</span>
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
                ? 'bg-[#536245] text-white shadow-xs scale-102'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 rounded-3xl border border-stone-200 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-[#536245]/10 rounded-2xl flex items-center justify-center text-[#536245] mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0F1A34] mb-2">No Articles Published Yet</h3>
          <p className="text-stone-500 text-xs sm:text-sm mb-6 max-w-md mx-auto">
            You can add new blog cards with their LinkedIn redirection links directly from your Admin CRM panel.
          </p>
          <Link
            to="/admin-se-portal"
            className="inline-flex items-center gap-2 bg-[#536245] hover:bg-[#445138] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Add Blog in CRM</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredBlogs.map((blog) => (
            <a
              key={blog.id}
              href={blog.linkedinUrl || 'https://www.linkedin.com/company/social-entities'}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-3xl border border-stone-200/90 overflow-hidden hover:shadow-xl hover:border-[#536245]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Cover Image & Category Tag */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-stone-100">
                  <img
                    src={blog.coverImage || 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=1200&auto=format&fit=crop'}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-[#536245] font-black text-xs px-3.5 py-1.5 rounded-full shadow-xs uppercase tracking-wider">
                    {blog.category}
                  </div>

                  {/* LinkedIn Badge matching agency dark slate tone */}
                  <div className="absolute top-4 right-4 bg-[#0F1A34]/90 backdrop-blur-xs text-white p-2 rounded-full shadow-md group-hover:bg-[#536245] group-hover:scale-110 transition-all">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 0 0-1.66 1.63 1.64 1.64 0 0 0 1.66 1.63 1.63 1.63 0 0 0 1.64-1.63c0-.9-.74-1.63-1.64-1.63Z" />
                    </svg>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-3 text-xs text-stone-400 font-semibold mb-3">
                    <span className="flex items-center gap-1.5 text-stone-600">
                      <Calendar className="w-3.5 h-3.5 text-[#536245]" />
                      {blog.publishedDate || 'Recent'}
                    </span>
                    {blog.readTime && (
                      <span className="flex items-center gap-1 text-stone-400">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {blog.readTime}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-black text-[#0F1A34] mb-3 leading-snug group-hover:text-[#536245] transition-colors">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Redirection Bar with Signature Theme Styling */}
              <div className="px-6 sm:px-7 pb-6 pt-2">
                <div className="w-full bg-[#0F1A34] group-hover:bg-[#536245] text-white py-3.5 rounded-2xl font-bold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center justify-center gap-2 transition-all shadow-xs">
                  <span>Read on LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* CTA Bottom Banner */}
      <div className="mt-20 sm:mt-28 bg-[#0F1A34] rounded-3xl p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C5B487]" />
            <span>Connect on LinkedIn</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight mb-4">
            Follow Social Entities on LinkedIn
          </h3>
          <p className="text-stone-300 text-sm sm:text-base mb-8 leading-relaxed">
            Join thousands of growth marketers, brand founders, and digital strategists who read our marketing breakdowns, growth teardowns, and experiments.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://www.linkedin.com/company/social-entities"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#536245] via-[#85946C] to-[#C5B487] hover:brightness-105 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase inline-flex items-center gap-2 transition-all shadow-md active:scale-98"
            >
              <span>Follow Our LinkedIn Page</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all"
            >
              Contact Agency
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

