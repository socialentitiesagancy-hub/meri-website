import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const ServiceCardsGrid: React.FC = () => {
  const services: ServiceCardData[] = [
    {
      id: 'marketing-consultation',
      title: 'Marketing Consultation',
      description:
        'We craft data-driven marketing strategies covering both physical and online markets, helping businesses identify opportunities, define goals, and achieve measurable growth.',
      icon: (
        <svg viewBox="0 0 100 100" className="w-13 h-13 fill-none stroke-white">
          {/* Light Rays above bulb */}
          <line x1="50" y1="10" x2="50" y2="17" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="36" y1="16" x2="41" y2="21" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="64" y1="16" x2="59" y2="21" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="28" y1="27" x2="34" y2="30" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="72" y1="27" x2="66" y2="30" strokeWidth="3.5" strokeLinecap="round" />

          {/* Overlapping Background Speech Bubble (Right) */}
          <path
            d="M 58 48 C 65 48 76 54 76 64 C 76 72 68 78 60 78 C 58 82 54 84 50 86 C 54 81 56 79 56 78"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Main Speech Bubble (Left) */}
          <path
            d="M 22 52 C 22 38 34 30 48 30 C 62 30 72 38 72 52 C 72 63 64 70 52 72 C 46 78 38 82 32 84 C 36 78 38 74 37 72 C 28 68 22 61 22 52 Z"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Lightbulb inside Main Speech Bubble */}
          <path
            d="M 43 32 C 37 32 33 37 33 43 C 33 48 36 51 39 54 L 39 59 C 39 60 40 61 42 61 L 54 61 C 56 61 57 60 57 59 L 57 54 C 60 51 63 48 63 43 C 63 37 59 32 53 32 Z"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path d="M 42 65 L 54 65" strokeWidth="3" strokeLinecap="round" />
          <path d="M 45 69 L 51 69" strokeWidth="3" strokeLinecap="round" />
          {/* Bulb Filament */}
          <path d="M 45 46 L 48 38 L 51 46" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M 43 43 L 53 43" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      description:
        'We offer 30+ digital marketing services designed to boost your online presence, engagement, and conversions across every major platform and channel.',
      icon: (
        <svg viewBox="0 0 100 100" className="w-13 h-13 fill-none stroke-white">
          {/* Bar Chart Columns */}
          <rect x="22" y="52" width="12" height="26" rx="2" strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="44" y="38" width="12" height="40" rx="2" strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="66" y="24" width="12" height="54" rx="2" strokeWidth="3.5" strokeLinejoin="round" />
          {/* Thick Rising Arrow */}
          <path
            d="M 18 52 L 38 32 L 52 42 L 78 16"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 62 16 L 78 16 L 78 32"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'search-engine-optimization',
      title: 'Search Engine Optimization',
      description:
        "We optimize your website's visibility through technical SEO, on-page optimization, and link building, helping you rank higher and attract organic traffic.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-13 h-13 fill-none stroke-white">
          {/* Monitor Screen */}
          <rect x="24" y="22" width="60" height="42" rx="4" strokeWidth="3.5" stroke="white" fill="none" />
          {/* Stand */}
          <path d="M 44 64 L 40 76 L 68 76 L 64 64" strokeWidth="3.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 34 76 L 74 76" strokeWidth="3.5" stroke="white" strokeLinecap="round" />
          
          {/* SEO Text */}
          <text x="60" y="49" fill="white" fontSize="18" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5" textAnchor="middle">
            SEO
          </text>
          
          {/* Magnifying Glass Overlapping Left Screen */}
          <circle cx="34" cy="40" r="11" strokeWidth="3.5" stroke="white" fill="#536245" />
          <line x1="26" y1="48" x2="14" y2="60" strokeWidth="4.5" stroke="white" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'performance-marketing',
      title: 'Performance Marketing',
      description:
        'We run high-converting paid campaigns across Meta Ads, Google Ads, and TikTok Ads, maximizing ROI through targeted, data-backed advertising strategies.',
      icon: (
        <svg viewBox="0 0 100 100" className="w-13 h-13 fill-none stroke-white">
          {/* Megaphone Body */}
          <path
            d="M 22 38 L 42 28 L 68 18 L 68 62 L 42 52 L 22 42 Z"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Handle */}
          <path d="M 36 49 L 40 68 C 41 72 45 74 49 72 C 52 70 53 66 51 63 L 45 52" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Soundwaves */}
          <path d="M 76 28 C 82 34 82 46 76 52" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 84 20 C 93 30 93 50 84 60" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'content-creation',
      title: 'Content Creation',
      description:
        "We handle scripting, pre-production, filming, and post-production editing, delivering polished, engaging content tailored to your brand's voice and audience.",
      icon: (
        <svg viewBox="0 0 100 100" className="w-13 h-13 fill-none stroke-white">
          {/* Movie Projector / Camera */}
          <circle cx="38" cy="30" r="10" strokeWidth="3.5" />
          <circle cx="62" cy="30" r="10" strokeWidth="3.5" />
          {/* Base / Mic / Camera body */}
          <rect x="26" y="46" width="48" height="26" rx="4" strokeWidth="3.5" />
          {/* Lens */}
          <path d="M 74 53 L 88 44 L 88 74 L 74 65 Z" strokeWidth="3.5" strokeLinejoin="round" />
          {/* Microphone lines */}
          <line x1="36" y1="58" x2="36" y2="64" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="36" cy="54" r="3" fill="white" />
        </svg>
      ),
    },
    {
      id: 'graphic-designing',
      title: 'Graphic Designing',
      description:
        'We design social media posts, UI interfaces, printable materials, and complete brand identities, ensuring consistent, visually compelling brand representation everywhere.',
      icon: (
        <svg viewBox="0 0 100 100" className="w-13 h-13 fill-none stroke-white">
          {/* Monitor Screen */}
          <rect x="20" y="20" width="60" height="42" rx="4" strokeWidth="3.5" />
          <path d="M 40 62 L 36 76 L 64 76 L 60 62" strokeWidth="3.5" strokeLinejoin="round" />
          {/* Design Layout inside */}
          <rect x="28" y="28" width="22" height="18" strokeWidth="2.5" strokeDasharray="3 2" />
          <rect x="56" y="28" width="16" height="6" rx="1" fill="white" />
          <rect x="56" y="38" width="16" height="6" rx="1" fill="white" />
          <line x1="28" y1="52" x2="72" y2="52" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      id: 'influencer-marketing',
      title: 'Influencer Marketing',
      description:
        'We connect brands with top influencers across Pakistan and UAE, creating authentic partnerships that boost reach, credibility, and engagement.',
      icon: (
        <svg viewBox="0 0 100 100" className="w-13 h-13 fill-none stroke-white">
          {/* Smartphone */}
          <rect x="28" y="14" width="34" height="62" rx="6" strokeWidth="3.5" />
          <line x1="40" y1="20" x2="50" y2="20" strokeWidth="3" strokeLinecap="round" />
          <circle cx="45" cy="70" r="2.5" fill="white" />
          {/* Person silhouette inside phone */}
          <circle cx="45" cy="36" r="6" strokeWidth="3" />
          <path d="M 35 52 C 35 44 40 42 45 42 C 50 42 55 44 55 52" strokeWidth="3" strokeLinecap="round" />
          {/* Megaphone coming out */}
          <path d="M 52 34 L 72 24 L 72 46 L 52 38 Z" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M 76 28 C 80 32 80 38 76 42" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'e-commerce',
      title: 'E-Commerce',
      description:
        'We provide 360° e-commerce store management, handling everything from setup and product listings to marketing, operations, and ongoing optimization.',
      icon: (
        <svg viewBox="0 0 100 100" className="w-13 h-13 fill-none stroke-white">
          {/* Awning Roof */}
          <path d="M 20 34 L 80 34 L 74 18 L 26 18 Z" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M 20 34 C 20 40 26 40 26 34 C 26 40 32 40 32 34 C 32 40 38 40 38 34 C 38 40 44 40 44 34 C 44 40 50 40 50 34 C 50 40 56 40 56 34 C 56 40 62 40 62 34 C 62 40 68 40 68 34 C 68 40 74 40 74 34 C 74 40 80 40 80 34" strokeWidth="3" />
          {/* Store Frame */}
          <path d="M 24 38 L 24 74 L 76 74 L 76 38" strokeWidth="3.5" strokeLinejoin="round" />
          {/* Shopping Cart inside */}
          <path d="M 34 50 L 40 50 L 46 62 L 62 62 L 66 54 L 43 54" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="48" cy="68" r="2.5" fill="white" />
          <circle cx="58" cy="68" r="2.5" fill="white" />
        </svg>
      ),
    },
    {
      id: 'it-solutions',
      title: 'IT Solutions',
      description:
        'We deliver AI automation, customized frontend and backend development, Shopify, WordPress, SaaS, and PaaS solutions tailored to your business needs.',
      icon: (
        <svg viewBox="0 0 100 100" className="w-13 h-13 fill-none stroke-white">
          {/* Lightbulb contour */}
          <path
            d="M 36 52 C 28 46 25 35 30 25 C 35 15 48 12 58 17 C 66 22 69 32 64 41 C 61 46 58 50 58 55 L 36 55 Z"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 38 62 L 56 62" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 42 68 L 52 68" strokeWidth="3.5" strokeLinecap="round" />
          {/* Tech Nodes & Circuit Lines */}
          <circle cx="47" cy="34" r="4" fill="white" />
          <line x1="47" y1="20" x2="47" y2="30" strokeWidth="3" strokeLinecap="round" />
          <line x1="47" y1="38" x2="47" y2="48" strokeWidth="3" strokeLinecap="round" />
          <line x1="33" y1="34" x2="43" y2="34" strokeWidth="3" strokeLinecap="round" />
          <line x1="51" y1="34" x2="61" y2="34" strokeWidth="3" strokeLinecap="round" />
          <circle cx="18" cy="34" r="3" fill="white" />
          <circle cx="76" cy="34" r="3" fill="white" />
          <circle cx="47" cy="10" r="3" fill="white" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16 font-sans select-none">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3x3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-10 gap-y-20 lg:gap-y-22 pt-10 pb-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative bg-white rounded-[4px] border-[2.5px] sm:border-[3px] border-[#536245] pt-14 sm:pt-16 pb-9 sm:pb-10 px-5 sm:px-7 flex flex-col items-center text-center justify-between transition-all duration-300 group"
            >
              {/* Top Center Circular Badge with Icon (Exact match to reference) */}
              <div className="absolute -top-11 sm:-top-12 left-1/2 -translate-x-1/2 w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-[#536245] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 z-10 shadow-xs">
                {service.icon}
              </div>

              {/* Title & Description */}
              <div className="flex flex-col items-center mt-1 w-full">
                <Link to={`/services/${service.id}`} className="hover:opacity-80 transition-opacity">
                  <h3 className="text-[20px] sm:text-[23px] font-bold text-[#536245] tracking-tight mb-2.5 leading-snug">
                    {service.title}
                  </h3>
                </Link>
                <p className="text-[#1A283E] font-bold text-[13px] sm:text-[14px] leading-[1.55] max-w-[320px] text-justify [text-align-last:center]">
                  {service.description}
                </p>
              </div>

              {/* Bottom Center Pill Button with Exact Olive-to-Gold Gradient */}
              <Link
                to="/contact"
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#536245] via-[#85946C] to-[#C5B487] hover:brightness-105 text-white font-black text-[12px] sm:text-[13px] tracking-wider uppercase px-6 sm:px-7 py-2 sm:py-2.5 rounded-full flex items-center gap-2 shadow-xs transition-transform hover:scale-105 cursor-pointer z-10 whitespace-nowrap"
              >
                <span>EXPLORE</span>
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


