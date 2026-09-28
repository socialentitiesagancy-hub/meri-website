// Only facts already shown on the site (Footer, Contact page). Don't add anything that isn't published there.
export const SITE_URL = 'https://socialentities.com/';
export const ORG_ID = `${SITE_URL}#organization`;
export const BRAND_NAME = 'Social Entities Agency';
export const BRAND_ALTERNATE_NAMES = ['Social Entities', 'socialentities.com'];
export const BRAND_LOGO = `${SITE_URL}logo.png`;
export const BRAND_EMAIL = 'socialentitiesagancy@gmail.com';
export const BRAND_PHONE_DISPLAY = '+92 302 4482639';
export const BRAND_PHONE_TEL = '+923024482639';
export const BRAND_WHATSAPP_URL = 'https://wa.me/923024482639';

export const OFFICE_ADDRESS = {
  streetAddress: '50-N Gurumangat Rd, Block N, Gulberg 2',
  addressLocality: 'Lahore',
  addressRegion: 'Punjab',
  addressCountry: 'PK',
};
export const OFFICE_ADDRESS_TEXT = '50-N Gurumangat Rd, Block N, Gulberg 2, Lahore, Punjab, Pakistan';

export const SOCIAL_PROFILES = [
  'https://www.facebook.com/socialentities',
  'https://www.instagram.com/socialentities/',
  'https://www.tiktok.com/@socialentities',
  'https://www.linkedin.com/company/social-entities',
];

export const AREAS_SERVED = ['Pakistan', 'United States', 'United Kingdom'];

export const postalAddress = { '@type': 'PostalAddress', ...OFFICE_ADDRESS };

export const toJsonLd = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c');
