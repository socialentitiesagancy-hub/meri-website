import React from 'react';
import ourStoryTeamImg from '../assets/images/our_story_team_covered_heads_1785249480342.jpg';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="w-full bg-white py-10 sm:py-16 lg:py-20 font-sans select-none overflow-hidden">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Top Hero Statement Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          {/* Main Headline */}
          <h1 className="text-fluid-h1 font-bold text-[#536245] max-w-[880px]">
            Driven by creativity, defined by results — crafting digital tech experiences that matter
          </h1>

          {/* Subtext Paragraph - Indented to the right */}
          <div className="flex justify-end mt-8 sm:mt-12 lg:mt-14">
            <p className="text-fluid-p text-[#536245] font-normal leading-[1.6] max-w-[500px]">
              We are a passionate team of digital innovators, designers, strategists, and developers dedicated to creating impactful digital experiences with a strong focus on creativity, technology, and user-centric solutions.
            </p>
          </div>
        </div>

        {/* Our Story Block */}
        <div className="pt-2 lg:pt-4">
          {/* Main Story Content: 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Team Cutout Image (Portrait, pure white background) */}
            <div className="lg:col-span-6 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[460px] bg-white">
                <img
                  src={ourStoryTeamImg}
                  alt="Social Entities Creative Team"
                  loading="lazy"
                  className="w-full h-auto object-contain mix-blend-multiply"
                  style={{ 
                    filter: 'contrast(1.35) brightness(1.15)',
                    maskImage: 'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)'
                  }}
                />
              </div>
            </div>

            {/* Right Column: Pill Badge + Story Text */}
            <div className="lg:col-span-6 flex flex-col justify-center items-start lg:items-end">
              {/* OUR STORY Pill Badge (Top Right of Text Column) */}
              <div className="mb-6 lg:mb-8">
                <div className="bg-gradient-to-r from-[#536245] via-[#85946C] to-[#C5B487] text-white font-black text-[18px] sm:text-[22px] lg:text-[26px] tracking-wider uppercase px-7 sm:px-9 py-2.5 sm:py-3 rounded-full shadow-xs inline-block">
                  OUR STORY
                </div>
              </div>

              {/* Story Text */}
              <p className="text-fluid-p text-[#536245] font-normal leading-[1.75] text-justify [text-align-last:left] w-full max-w-[540px]">
                Social Entities began with a simple belief: brands grow when strategy, creativity, and technology work together. From marketing consultation to IT solutions, we've built a full-service team across Pakistan, UAE, UK, USA, Australia, and now in Europe as well, turning ideas into measurable results.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


