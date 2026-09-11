import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Globe, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';

interface LocationInfo {
  name: string;
  country: string;
  tagline: string;
  overview: string;
  headOffice?: string;
  services: { title: string; desc: string }[];
  marketStrengths: string[];
}

const locationDirectory: Record<string, LocationInfo> = {
  pakistan: {
    name: 'Pakistan (Lahore HQ)',
    country: 'Pakistan',
    tagline: 'The creative and technical epicenter of Social Entities.',
    overview: 'Our primary headquarters in Lahore houses our full creative production studio, engineering team, and media buying war room. We service premier Pakistani enterprises and high-growth consumer brands nationwide.',
    headOffice: '50-N Gurumangat Rd, Block N, Gulberg 2, Lahore, Punjab, Pakistan',
    services: [
      { title: 'Full-Service Digital Strategy', desc: 'Omnichannel creative and media execution for top Pakistani retail, lifestyle, and corporate enterprises.' },
      { title: 'Local E-Commerce Scaling', desc: 'Shopify development and Cash-on-Delivery (COD) / digital payment optimization for high-velocity stores.' },
      { title: 'High-Impact Content Studio', desc: '4K video filming, viral reel scripting, and brand photography from our Lahore studio.' },
    ],
    marketStrengths: ['Native Cultural Relevance', 'Nationwide Creator Network', 'Rapid Studio Production Turnaround'],
  },
  uae: {
    name: 'United Arab Emirates (Dubai)',
    country: 'United Arab Emirates',
    tagline: 'High-performance growth marketing in the Middle East’s business capital.',
    overview: 'From luxury real estate to cutting-edge tech startups and hospitality brands in Dubai and Abu Dhabi, Social Entities delivers premium multilingual digital campaigns tailored to the GCC market.',
    services: [
      { title: 'GCC Performance Marketing', desc: 'Targeted Arabic & English media buying across Meta, Snapchat, TikTok, and Google Ads.' },
      { title: 'Luxury & Hospitality Branding', desc: 'Bespoke UI/UX, brand identity, and immersive video production for high-end brands.' },
      { title: 'Regional Influencer Campaigns', desc: 'Direct partnerships with verified Gulf creators and industry leaders.' },
    ],
    marketStrengths: ['Arabic & English Dual Fluency', 'GCC Compliance & Ad Targeting', 'High-Net-Worth Persona Modeling'],
  },
  uk: {
    name: 'United Kingdom (London)',
    country: 'United Kingdom',
    tagline: 'Data-driven marketing and IT solutions for UK and European brands.',
    overview: 'Serving forward-thinking enterprises across London and the UK, we provide comprehensive Search Engine Optimization (SEO/GEO), performance advertising, and custom software development.',
    services: [
      { title: 'Advanced SEO & GEO', desc: 'Dominating UK search rankings on Google, Gemini, and AI answer engines.' },
      { title: 'Custom Software & SaaS Engineering', desc: 'Full-stack React, Next.js, and cloud application development with strict GDPR compliance.' },
      { title: 'E-Commerce Growth', desc: 'Direct-to-consumer scaling on Shopify Plus with European multi-currency checkouts.' },
    ],
    marketStrengths: ['GDPR Compliant Systems', 'Tier-1 Search Authority', 'Cross-Border European Scaling'],
  },
  usa: {
    name: 'United States (North America)',
    country: 'United States',
    tagline: 'Scalable paid acquisition and creative excellence in the world’s largest market.',
    overview: 'We partner with US-based e-commerce brands, SaaS companies, and digital innovators to build resilient customer acquisition systems with proven return on ad spend (ROAS).',
    services: [
      { title: 'Paid Media Buying & Scaling', desc: 'Advantage+ Shopping, TikTok Spark Ads, and Google Performance Max optimization.' },
      { title: 'Viral Short-Form Content', desc: 'High-converting UGC, motion graphics, and hook testing designed for US consumer psychology.' },
      { title: 'Custom IT & App Development', desc: 'High-throughput cloud architecture, API integrations, and mobile applications.' },
    ],
    marketStrengths: ['Proven North American ROAS', 'Creative Hook Iteration Sprints', 'High-Throughput Engineering'],
  },
  australia: {
    name: 'Australia (Sydney & Melbourne)',
    country: 'Australia',
    tagline: 'Empowering Australian businesses with global creative talent and technical expertise.',
    overview: 'We support Australian innovators across retail, professional services, and technology with modern digital experiences, search domination, and paid social campaigns.',
    services: [
      { title: 'Local Search & Map Domination', desc: 'Geo-targeted local SEO and Google Business Profile optimization across Aussie metros.' },
      { title: 'DTC E-Commerce Optimization', desc: 'Conversion rate optimization and full-funnel retention marketing for Aussie retailers.' },
      { title: 'Custom Web & Mobile Apps', desc: 'Fast, accessible web applications built to global web standards.' },
    ],
    marketStrengths: ['Timezone-Aligned Delivery', 'High Mobile Conversion Focus', 'Transparent Data Reporting'],
  },
  europe: {
    name: 'Europe & International',
    country: 'Europe',
    tagline: 'Pan-European digital campaigns and multi-market localization.',
    overview: 'We orchestrate multi-territory digital expansion across the European continent, blending localized messaging, technical SEO, and multilingual creative assets.',
    services: [
      { title: 'Pan-European SEO & Localization', desc: 'Multilingual keyword architectures and entity indexing across European markets.' },
      { title: 'Cross-Border Ad Campaigns', desc: 'Localized ad copy and creative variants tailored for cultural nuances.' },
      { title: 'Enterprise Digital Platforms', desc: 'Custom enterprise software and cloud integrations.' },
    ],
    marketStrengths: ['Multilingual Adaptability', 'International Tax & Checkout Sync', 'Modern Engineering Stack'],
  },
};

export const LocationDetail: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();

  const normalizedKey = locationId ? locationId.toLowerCase().trim() : 'pakistan';
  const location = locationDirectory[normalizedKey] || {
    name: locationId ? locationId.charAt(0).toUpperCase() + locationId.slice(1) : 'Global Location',
    country: locationId || 'Global',
    tagline: 'Expanding brand potential with strategy, creativity, and technology.',
    overview: `Social Entities provides full-service digital agency capabilities to brands and innovators operating in ${locationId}.`,
    services: [
      { title: 'Digital Marketing & Strategy', desc: 'Tailored campaigns designed to capture market share and drive verified ROI.' },
      { title: 'SEO & Content Creation', desc: 'Dominating search presence and captivating audiences with studio-grade creative.' },
      { title: 'IT & Software Solutions', desc: 'Custom web and mobile app development engineered for performance.' },
    ],
    marketStrengths: ['Global Strategic Standard', 'Dedicated Account Leads', 'End-to-End Execution'],
  };

  return (
    <main className="flex-1 bg-white font-sans pt-8 sm:pt-12 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-12 max-w-[1380px] mx-auto w-full select-none">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200/70">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#5B6A50] hover:text-[#4a5840] font-bold text-[14px] sm:text-[15px] bg-stone-50 border border-stone-200 px-4 py-2 rounded-full transition-all shadow-2xs hover:shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <span className="text-xs sm:text-sm font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-[#5B6A50]" />
          <span>Global Footprint</span>
        </span>
      </div>

      {/* Hero Section */}
      <div className="mb-14 max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-[#5B6A50]/10 text-[#5B6A50] font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm mb-5 uppercase tracking-wider">
          <MapPin className="w-4 h-4" />
          <span>Regional Presence • {location.country}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F1A34] tracking-tight leading-[1.1] mb-5">
          Digital Marketing & IT Solutions in {location.name}
        </h1>
        <p className="text-lg sm:text-xl font-semibold text-[#5B6A50] mb-4">
          {location.tagline}
        </p>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8">
          {location.overview}
        </p>

        {/* Head Office Highlight if exists */}
        {location.headOffice && (
          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 mb-8 max-w-2xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B6A50] mb-1">Office Location</h4>
            <p className="text-sm sm:text-base font-semibold text-[#0F1A34]">{location.headOffice}</p>
          </div>
        )}

        {/* Primary CTA */}
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            to="/contact"
            className="bg-[#5B6A50] hover:bg-[#4e5c44] text-white px-8 py-3.5 sm:py-4 rounded-full font-bold text-[15px] sm:text-[16px] inline-flex items-center gap-3 transition-all shadow-sm group hover:scale-102 active:scale-98"
          >
            <span>Start Project in {location.country}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="https://wa.me/923024482639"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#5B6A50] text-[#5B6A50] hover:bg-[#5B6A50] hover:text-white px-6 py-3.5 rounded-full font-bold text-[15px] transition-all shadow-2xs"
          >
            WhatsApp Consultation
          </a>
        </div>
      </div>

      {/* Services in this Location */}
      <section className="mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1A34] tracking-tight mb-8">
          Core Capabilities in {location.country}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {location.services.map((item, idx) => (
            <div
              key={idx}
              className="bg-stone-50/80 p-6 sm:p-8 rounded-2xl border border-stone-200 hover:border-[#5B6A50]/40 transition-colors shadow-2xs flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-[#0F1A34] mb-3">{item.title}</h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">{item.desc}</p>
              </div>
              <Link
                to="/services"
                className="text-[#5B6A50] font-bold text-sm inline-flex items-center gap-1.5 hover:underline"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Market Strengths */}
      <section className="mb-16 bg-[#5B6A50] text-white p-8 sm:p-12 rounded-3xl">
        <h3 className="text-2xl sm:text-3xl font-black mb-6">Why Partner with Social Entities in {location.country}?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {location.marketStrengths.map((str, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white/10 p-5 rounded-2xl border border-white/15">
              <CheckCircle2 className="w-5 h-5 text-[#C5B487] shrink-0 mt-0.5" />
              <span className="font-bold text-sm sm:text-base text-white">{str}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Banner */}
      <div className="bg-stone-100 p-8 sm:p-12 rounded-3xl text-center border border-stone-200">
        <h3 className="text-2xl sm:text-3xl font-black text-[#0F1A34] mb-3">
          Let’s discuss your regional growth strategy.
        </h3>
        <p className="text-stone-600 max-w-xl mx-auto mb-6 text-sm sm:text-base">
          Our global strategists are ready to craft a tailor-made roadmap for your enterprise.
        </p>
        <Link
          to="/contact"
          className="bg-[#5B6A50] hover:bg-[#4e5c44] text-white px-8 py-3.5 rounded-full font-bold text-[16px] inline-flex items-center gap-2 shadow-xs transition-all hover:scale-105"
        >
          <span>Contact Our Regional Lead</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </main>
  );
};
