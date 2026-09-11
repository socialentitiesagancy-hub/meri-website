import React from 'react';
import { HeroContent } from '../components/HeroContent';
import { HeroGraphic } from '../components/HeroGraphic';
import { HomeAbout } from '../components/HomeAbout';
import { Achievements } from '../components/Achievements';
import { Services } from '../components/Services';
import { Clients } from '../components/Clients';
import { WorkingProcess } from '../components/WorkingProcess';

export const Home: React.FC = () => {
  return (
    <main className="flex-1">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-12 flex items-center" id="home">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center w-full">
          {/* Left Column: Typography Copy */}
          <div className="flex justify-start">
            <HeroContent />
          </div>

          {/* Right Column: Composite Visual Graphic */}
          <div className="flex justify-center lg:justify-end">
            <HeroGraphic />
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <HomeAbout />

      {/* Achievements Section */}
      <Achievements />

      {/* Our Comprehensive Services Section */}
      <Services />

      {/* Admired by Clients Section */}
      <Clients />

      {/* Working Process Section */}
      <WorkingProcess />
    </main>
  );
};
