import React from 'react';
import heroImage from '../assets/images/hero_full_props_newspaper_1785151982901.jpg';

export const HeroGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-[650px] lg:max-w-[720px] mx-auto flex items-center justify-center select-none font-sans">
      <div className="relative w-full flex items-center justify-center bg-white">
        {/* Main Composite Image with all photography props */}
        <img
          src={heroImage}
          alt="Social Entities - Digital Agency Marketing Newspaper with Equipment Props"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-auto object-contain transition-all duration-300 hover:scale-[1.01]"
        />
      </div>
    </div>
  );
};
