import React from 'react';
import worldMapImg from '../assets/images/world_map_pinpoints_1785241526322.jpg';

export const ServicesHero: React.FC = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 lg:pt-16 pb-4 sm:pb-6 lg:pb-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Typography */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h1 className="text-[#5B6A50] font-extrabold text-[42px] sm:text-[60px] lg:text-[72px] tracking-tight leading-none mb-6 uppercase">
            SERVICES
          </h1>
          <p className="text-[#1C2740] font-bold text-[18px] sm:text-[22px] lg:text-[24px] leading-[1.45] tracking-tight max-w-[520px]">
            From strategy and SEO to content, design, and IT solutions — we offer everything your brand needs to grow, digitally and beyond.
          </p>
        </div>

        {/* Right Column: World Map Image with Pinpoints */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end items-center">
          <div className="w-full max-w-[780px] relative">
            <img
              src={worldMapImg}
              alt="Global Presence World Map"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

