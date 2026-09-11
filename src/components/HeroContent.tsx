import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroContent: React.FC = () => {
  return (
    <div className="flex flex-col items-start max-w-[620px] pt-2 sm:pt-4 lg:pt-8 font-sans">
      {/* Top Accent Gradient Capsule Bar */}
      <div className="w-40 sm:w-56 h-[26px] sm:h-[34px] rounded-full bg-gradient-to-r from-[#586A4E] via-[#889467] to-[#C9BA8D] mb-5 sm:mb-8 shadow-xs opacity-95 hover:opacity-100 transition-opacity" />

      {/* Main Headline */}
      <h1 className="text-fluid-h1 font-[800] text-[#0F1A34] tracking-[-0.025em] mb-4 sm:mb-6">
        Empowering brands <br className="hidden sm:inline" />
        in the digital age.
      </h1>

      {/* Subheading Paragraph */}
      <p className="text-fluid-p font-[700] text-[#111E38] mb-8 sm:mb-10 max-w-[580px]">
        At our digital agency, we blend creativity, strategy, and technology to build impactful digital experiences that drive real results.
      </p>

      {/* Explore Button */}
      <Link
        to="/services"
        className="bg-[#596A4E] hover:bg-[#4d5e43] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-[14px] sm:text-[16px] tracking-wider uppercase flex items-center gap-2.5 sm:gap-3 transition-all shadow-md hover:shadow-lg active:scale-95 group cursor-pointer"
      >
        <span>EXPLORE</span>
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.5]" />
        </div>
      </Link>
    </div>
  );
};
