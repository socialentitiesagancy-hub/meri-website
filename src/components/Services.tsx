import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import service01Img from '../assets/images/service_01_consultation_1785159208376.jpg';
import service02Img from '../assets/images/service_02_digital_mktg_1785159228386.jpg';
import service03Img from '../assets/images/service_03_seo_1785159248452.jpg';
import service04Img from '../assets/images/service_04_performance_1785159268960.jpg';
import service05Img from '../assets/images/service_05_content_1785159289967.jpg';
import service06Img from '../assets/images/service_06_graphics_1785159307784.jpg';
import service07Img from '../assets/images/service_07_itsolutions_1785159325828.jpg';

interface ServiceItem {
  id: string;
  slug: string;
  num: string;
  title: string;
  tags: string[];
  description: string;
  image: string;
}

export const Services: React.FC = () => {
  // Default open first item (01) as seen in the reference screenshot
  const [openId, setOpenId] = useState<string | null>('01');

  const servicesData: ServiceItem[] = [
    {
      id: '01',
      slug: 'marketing-consultation',
      num: '(01)',
      title: 'Marketing Consultation',
      tags: ['Strategy', 'Planning', 'Growth'],
      description:
        'We focus on strategy, planning, and growth — offering both creative consultation and marketing consultation to help businesses build clear roadmaps, refine positioning, and scale effectively.',
      image: service01Img,
    },
    {
      id: '02',
      slug: 'digital-marketing',
      num: '(02)',
      title: 'Digital Marketing',
      tags: ['Services Based', 'Product Based'],
      description:
        'Tailored digital marketing campaigns designed to reach target audiences, drive high conversions, and maximize overall ROI across service-based and product-based business models.',
      image: service02Img,
    },
    {
      id: '03',
      slug: 'search-engine-optimization',
      num: '(03)',
      title: 'Search Engine Optimization',
      tags: ['SEO', 'AEO', 'GEO'],
      description:
        'Comprehensive optimization spanning traditional Search Engine Optimization (SEO), Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) to dominate search visibility.',
      image: service03Img,
    },
    {
      id: '04',
      slug: 'performance-marketing',
      num: '(04)',
      title: 'Performance Marketing',
      tags: ['Meta Ads', 'Google Ads', 'TikTok Ads'],
      description:
        'Data-driven paid media management across Meta, Google, and TikTok platforms focused on high-converting ads, precise audience targeting, and measurable ROAS.',
      image: service04Img,
    },
    {
      id: '05',
      slug: 'content-creation',
      num: '(05)',
      title: 'Content Creation',
      tags: ['Scripting', 'Reels', 'Reels Ads'],
      description:
        'Engaging multimedia content creation including creative scripting, viral short-form video reels, and high-impact reel advertisements designed for maximum audience engagement.',
      image: service05Img,
    },
    {
      id: '06',
      slug: 'graphic-designing',
      num: '(06)',
      title: 'Graphics Designing',
      tags: ['Brand Identity', 'Logos', 'Designing'],
      description:
        'Bespoke visual branding, logo design, marketing collateral, and complete brand identity packages that captivate audiences and establish visual authority.',
      image: service06Img,
    },
    {
      id: '07',
      slug: 'it-solutions',
      num: '(07)',
      title: 'IT Solution',
      tags: ['WebSite', 'App', 'Software'],
      description:
        'Robust digital technology solutions including custom modern website development, high-performance mobile applications, and custom enterprise software engineering.',
      image: service07Img,
    },
  ];

  const toggleService = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-[#526046] text-white py-12 sm:py-20 lg:py-24 font-canva border-t border-b border-[#47543d] select-none">
      <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Services List Container */}
        <div className="flex flex-col border-t border-white/25">
          {servicesData.map((service) => {
            const isOpen = openId === service.id;

            return (
              <div
                key={service.id}
                className="border-b border-white/25 transition-colors duration-200"
              >
                {/* Header Row (Clickable) */}
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full py-4 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 text-left group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  {/* Left: Number + Title */}
                  <div className="flex items-center gap-2.5 sm:gap-5">
                    <span className="text-[#88A6C3] font-semibold text-[15px] sm:text-[22px] tracking-tight shrink-0">
                      {service.num}
                    </span>
                    <h3 className="text-white font-bold text-fluid-p tracking-tight group-hover:text-stone-200 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Right: Pill Tags + Arrow */}
                  <div className="flex items-center justify-between md:justify-end gap-2.5 sm:gap-4 flex-wrap mt-2 md:mt-0">
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      {service.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="border border-white/60 rounded-full px-2 sm:px-3 py-0.5 text-[10px] sm:text-[13px] md:text-[15px] font-medium text-white/90 bg-white/5 backdrop-blur-xs whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Single Arrow Icon */}
                    <div className="ml-1 flex items-center justify-center shrink-0">
                      <MoveRight
                        className={`w-5 h-5 sm:w-7 sm:h-8 text-white transition-transform duration-300 ease-in-out ${
                          isOpen ? 'rotate-[-45deg] scale-110' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Animated Accordion Expanded Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden origin-top"
                    >
                      <div className="pb-6 sm:pb-8 pt-1 sm:pt-4 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 items-center">
                        {/* Image Column - Olive background matching section */}
                        <div className="md:col-span-5 flex justify-center md:justify-start">
                          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#45523a] p-0 max-w-[320px] sm:max-w-[400px] md:max-w-none shadow-md w-full aspect-[4/3]">
                            <img
                              src={service.image}
                              alt={service.title}
                              loading="lazy"
                              decoding="async"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                            />
                          </div>
                        </div>

                        {/* Description Text Column */}
                        <div className="md:col-span-7 flex flex-col items-start justify-center">
                          <p className="text-white/90 font-medium text-fluid-p tracking-wide mb-4">
                            {service.description}
                          </p>
                          <Link
                            to={`/services/${service.slug}`}
                            className="inline-flex items-center gap-2 text-white bg-white/15 hover:bg-white/25 px-5 py-2.5 rounded-full font-bold text-[13px] sm:text-[14px] tracking-wide transition-all shadow-xs hover:scale-105 active:scale-95"
                          >
                            <span>Explore Service Details</span>
                            <MoveRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

