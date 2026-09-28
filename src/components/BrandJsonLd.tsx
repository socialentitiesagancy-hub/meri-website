import React from 'react';
import {
  AREAS_SERVED,
  BRAND_ALTERNATE_NAMES,
  BRAND_EMAIL,
  BRAND_LOGO,
  BRAND_NAME,
  BRAND_PHONE_DISPLAY,
  ORG_ID,
  SITE_URL,
  SOCIAL_PROFILES,
  postalAddress,
  toJsonLd,
} from '../data/brand';

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: BRAND_NAME,
  alternateName: BRAND_ALTERNATE_NAMES,
  url: SITE_URL,
  logo: BRAND_LOGO,
  email: BRAND_EMAIL,
  telephone: BRAND_PHONE_DISPLAY,
  address: postalAddress,
  areaServed: AREAS_SERVED.map((name) => ({ '@type': 'Country', name })),
  sameAs: SOCIAL_PROFILES,
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  name: BRAND_NAME,
  alternateName: BRAND_ALTERNATE_NAMES,
  url: SITE_URL,
  publisher: { '@id': ORG_ID },
};

export const BrandJsonLd: React.FC = () => (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(website) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(organization) }} />
  </>
);
