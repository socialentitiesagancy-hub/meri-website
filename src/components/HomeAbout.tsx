import React from 'react';
import { AboutUsGraphic } from './AboutUsGraphic';

export const HomeAbout: React.FC = () => {
  return (
    <section id="about" className="w-full bg-white py-12 sm:py-16 lg:py-24 font-sans select-none">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Centered Section Heading */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-20">
          <h2 className="text-fluid-h2 font-bold text-[#536245] tracking-tight">
            About Us
          </h2>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Bold Summary Paragraph */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-fluid-p font-bold text-[#1B273D] text-justify [text-align-last:left]">
              We're a full-service digital agency blending strategy, creativity, and technology — offering marketing consultation, SEO, performance marketing, content creation, design, influencer marketing, e-commerce, and IT solutions to help brands grow.
            </p>
          </div>

          {/* Right Column: SOCIAL ENTITIES Graphic */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="w-full max-w-[680px]">
              <AboutUsGraphic />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};



