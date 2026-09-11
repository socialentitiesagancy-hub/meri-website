import React from 'react';
import { ServicesHero } from '../components/ServicesHero';
import { PartnerBadges } from '../components/PartnerBadges';
import { ServiceCardsGrid } from '../components/ServiceCardsGrid';

export const ServicesIndex: React.FC = () => {
  return (
    <main className="flex-1">
      <ServicesHero />
      <PartnerBadges />
      <ServiceCardsGrid />
    </main>
  );
};
