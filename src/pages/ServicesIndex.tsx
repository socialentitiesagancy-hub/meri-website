import React from 'react';
import { ServicesHero } from '../components/ServicesHero';
import { PartnerBadges } from '../components/PartnerBadges';
import { ServiceCardsGrid } from '../components/ServiceCardsGrid';
import { Seo } from '../components/Seo';

export const ServicesIndex: React.FC = () => {
  return (
    <main className="flex-1">
      <Seo
        title="Digital Marketing & IT Services | Social Entities"
        description="From strategy and SEO to content, design and IT solutions, Social Entities offers everything your brand needs to grow, digitally and beyond. Explore services."
      />
      <ServicesHero />
      <PartnerBadges />
      <ServiceCardsGrid />
    </main>
  );
};
