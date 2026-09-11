import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#5A694E] text-white pt-12 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 font-sans select-none overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-10 lg:px-16">
        {/* Top 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-14 pb-12 sm:pb-16">
          
          {/* Column 1: Brand & About (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left pr-0 md:pr-4">
            {/* Social Entities Logo */}
            <div className="flex flex-col items-center mb-6 sm:mb-8 self-center md:self-start">
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-2 sm:mb-3 text-white">
                <LogoIcon className="w-full h-full text-white" />
              </div>
              <h2 className="font-extrabold text-xl sm:text-3xl tracking-tight text-white text-center leading-tight mt-1">
                Social Entities
              </h2>
              <span className="text-[10px] sm:text-[12px] tracking-[0.35em] text-stone-200 uppercase mt-1.5 font-medium">
                MAKES IT HAPPEN
              </span>
            </div>

            {/* Description Paragraph */}
            <p className="text-white text-[14px] sm:text-[16px] leading-[1.6] sm:leading-[1.65] font-normal max-w-md text-center md:text-left">
              We're a full-service digital agency blending strategy, creativity, and technology — offering marketing consultation, SEO, performance marketing, content creation, design, influencer marketing, e-commerce, and IT solutions to help brands grow.
            </p>
          </div>

          {/* Column 2: Services List (3 cols) */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left md:pl-2">
            <div className="mb-4 sm:mb-6">
              <h3 className="font-extrabold text-xl sm:text-[26px] text-white tracking-tight leading-none pb-1.5 border-b-2 border-white inline-block">
                Services
              </h3>
            </div>
            <ul className="space-y-2.5 sm:space-y-3 text-white text-[14px] sm:text-[16px] font-medium flex flex-col">
              <Link to="/case-studies" className="hover:opacity-80 transition-opacity font-bold underline decoration-white/40 underline-offset-4">Case Studies & Results</Link>
              <Link to="/blogs" className="hover:opacity-80 transition-opacity font-bold underline decoration-white/40 underline-offset-4">LinkedIn Blogs & Articles</Link>
              <Link to="/services/marketing-consultation" className="hover:opacity-80 transition-opacity">Marketing Consultation</Link>
              <Link to="/services/digital-marketing" className="hover:opacity-80 transition-opacity">Digital Marketing</Link>
              <Link to="/services/search-engine-optimization" className="hover:opacity-80 transition-opacity">Search Engine Optimization</Link>
              <Link to="/services/performance-marketing" className="hover:opacity-80 transition-opacity">Performance Marketing</Link>
              <Link to="/services/content-creation" className="hover:opacity-80 transition-opacity">Content Creation</Link>
              <Link to="/services/graphic-designing" className="hover:opacity-80 transition-opacity">Graphics Designing</Link>
              <Link to="/services/it-solutions" className="hover:opacity-80 transition-opacity">IT Solutions</Link>
            </ul>
          </div>

          {/* Column 3: Contact & Head Office (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left justify-between">
            <div>
              {/* Contact Us */}
              <div className="mb-3">
                <h3 className="font-extrabold text-xl sm:text-[26px] text-white tracking-tight leading-none pb-1.5 border-b-2 border-white inline-block">
                  Contact Us:
                </h3>
              </div>
              <div className="text-white text-[14px] sm:text-[16px] font-medium space-y-1 mb-6 sm:mb-7">
                <p>Looking for a solution?</p>
                <p>We’re here for you</p>
                <a
                  href="mailto:socialentitiesagancy@gmail.com"
                  className="font-bold hover:underline block mt-1 text-white"
                >
                  socialentitiesagancy@gmail.com
                </a>
              </div>

              {/* Head Office */}
              <div className="mb-3">
                <h3 className="font-extrabold text-xl sm:text-[26px] text-white tracking-tight leading-none pb-1.5 border-b-2 border-white inline-block">
                  Head Office:
                </h3>
              </div>
              <p className="text-white text-[14px] sm:text-[16px] font-medium leading-snug max-w-xs">
                50-N Gurumangat Rd, Block N<br />
                Gulberg 2, Lahore, Punjab, Pakistan
              </p>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center justify-center md:justify-start gap-3.5 sm:gap-4 mt-8 sm:mt-10 pt-2 flex-wrap">
              {/* Facebook Icon */}
              <a
                href="https://www.facebook.com/socialentities"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#5A694E] flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram Icon */}
              <a
                href="https://www.instagram.com/socialentities/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 border-white text-white flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* WhatsApp Icon */}
              <a
                href="https://wa.me/923024482639"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 text-white flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="WhatsApp"
              >
                <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>

              {/* TikTok Icon */}
              <a
                href="https://www.tiktok.com/@socialentities"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center text-white hover:scale-105 transition-transform"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.36 1.52-1.38 2.52-.01 1.01.46 2.02 1.25 2.62.91.71 2.18.84 3.23.47 1.01-.34 1.83-1.18 2.05-2.23.08-.47.12-.95.11-1.43V.02z" />
                </svg>
                <span className="text-[9px] font-bold tracking-tight text-white mt-0.5">TikTok</span>
              </a>

              {/* LinkedIn Icon */}
              <a
                href="https://www.linkedin.com/company/social-entities/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-8 h-8 sm:w-9 sm:h-9 rounded bg-white text-[#5A694E] flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="LinkedIn"
              >
                <span className="font-extrabold text-base sm:text-lg leading-none font-sans lowercase">in</span>
                <span className="absolute -right-1 -bottom-0.5 text-[7px] sm:text-[8px] font-bold text-white font-sans">®</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Big Heading: LET'S GROW */}
        <div className="pt-6 sm:pt-14 pb-2 text-center overflow-hidden">
          <div className="text-[12vw] sm:text-[90px] md:text-[130px] lg:text-[150px] font-black text-white tracking-tight leading-none uppercase select-none font-sans whitespace-nowrap" role="heading" aria-level={2}>
            LET'S GROW
          </div>
        </div>

        {/* Discreet Bottom Bar with Admin Portal Access */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/60 flex-wrap gap-4">
          <p>© {new Date().getFullYear()} Social Entities Agency. All rights reserved.</p>
          <Link
            to="/admin-se-portal"
            className="hover:text-white transition-colors flex items-center gap-1.5 opacity-60 hover:opacity-100"
            title="Authorized Admin Access"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

