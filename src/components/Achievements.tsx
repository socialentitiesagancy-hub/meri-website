import React from 'react';
import growthArrowImg from '../assets/images/achievements_growth_arrow_white_bg_1785158881892.jpg';
import { AnimatedCounter } from './AnimatedCounter';

export const Achievements: React.FC = () => {
  const stats = [
    {
      label: 'CLIENT SERVED',
      value: '270+',
    },
    {
      label: 'YEARS SERVED',
      value: '7+',
    },
    {
      label: 'MEGA PROJECTS',
      value: '23+',
    },
    {
      label: 'COUNTRIES',
      value: '4',
    },
  ];

  return (
    <section id="achievements" className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20 font-canva bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Side: Growth Arrow Graphic */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="w-full max-w-[420px] sm:max-w-[460px] bg-white flex items-center justify-center p-2">
            <img
              src={growthArrowImg}
              alt="Our Achievements Growth Arrow Graphic"
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.01]"
            />
          </div>
        </div>

        {/* Right Side: Title + 2x2 Stat Grid */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Title */}
          <h2 className="text-fluid-h2 font-bold text-[#1C2740] mb-6 sm:mb-8 lg:mb-10 tracking-tight text-center lg:text-left">
            Our Achievements that speak louder than words
          </h2>

          {/* 2x2 Grid of Cards */}
          <div className="grid grid-cols-2 gap-3.5 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border-[2px] sm:border-[2.5px] border-[#536349] rounded-xl sm:rounded-[18px] py-4 sm:py-7 px-3 sm:px-5 flex flex-col items-center justify-center text-center shadow-xs transition-all duration-200 hover:shadow-md"
              >
                <span className="text-[#536349] font-bold text-[11px] sm:text-[15px] tracking-wider uppercase mb-1 sm:mb-2">
                  {stat.label}
                </span>
                <span className="text-[#1C2740] font-black text-[28px] sm:text-[44px] leading-none">
                  <AnimatedCounter value={stat.value} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

