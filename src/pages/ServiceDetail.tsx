import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Layers, ShieldCheck, Zap, HelpCircle } from 'lucide-react';

interface ServiceDetailData {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  deliverables: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  technologies: string[];
  faqs: { q: string; a: string }[];
}

const serviceDirectory: Record<string, ServiceDetailData> = {
  'marketing-consultation': {
    title: 'Marketing Consultation',
    tagline: 'Strategic vision and actionable roadmaps to unlock sustainable brand growth.',
    description:
      'We provide high-impact creative and marketing consultation that transforms business potential into market leadership. From competitive benchmarking and positioning to multi-quarter execution roadmaps, we empower founders and marketing leaders with data-backed direction.',
    tags: ['Creative Strategy', 'Market Positioning', 'Brand Roadmaps', 'Growth Architecture'],
    deliverables: [
      { title: 'Comprehensive Brand Audit', desc: 'In-depth analysis of current positioning, messaging consistency, and customer sentiment.' },
      { title: 'Market & Competitor Intel', desc: 'Actionable intelligence on key competitors, market share shifts, and whitespace opportunities.' },
      { title: 'Full Growth Roadmap', desc: 'Step-by-step quarterly strategy covering paid, organic, and retention acquisition channels.' },
      { title: 'KPI & Unit Economics Framework', desc: 'Custom metrics dashboard to track customer acquisition cost (CAC), LTV, and payback velocity.' },
    ],
    process: [
      { step: '01', title: 'Brand & Market Discovery', desc: 'Deep dive into historical performance, customer personas, and unit economics.' },
      { step: '02', title: 'Strategy Architecture', desc: 'Developing tailored positioning statements, market angles, and growth hypotheses.' },
      { step: '03', title: 'Execution Blueprint', desc: 'Mapping exact campaign timelines, resource allocations, and cross-channel budgets.' },
      { step: '04', title: 'Advisory & Optimization', desc: 'Ongoing strategic advisory sessions, monthly KPI reviews, and strategic pivots.' },
    ],
    technologies: ['Notion Strategy Hubs', 'Looker Studio', 'SEMrush', 'Miro', 'Tableau'],
    faqs: [
      { q: 'How long does an initial consultation engagement take?', a: 'Our comprehensive strategy blueprint typically takes 2 to 4 weeks depending on the business model and scope.' },
      { q: 'Can you work alongside our existing internal team?', a: 'Yes! We frequently collaborate with internal marketing directors and execution teams to guide strategy and enhance execution speed.' },
    ],
  },
  'digital-marketing': {
    title: 'Digital Marketing',
    tagline: '360° multichannel marketing strategies for service-based and product-based businesses.',
    description:
      'Our full-spectrum digital marketing campaigns integrate search, paid acquisition, social engagement, and lifecycle retention to build omnipresent brand authority and sustained customer acquisition.',
    tags: ['Multichannel Growth', 'Full-Funnel Campaigns', 'Retention Marketing', 'B2B & B2C'],
    deliverables: [
      { title: 'Omnichannel Campaign Management', desc: 'Coordinated execution across search engines, social media platforms, and digital display.' },
      { title: 'Audience Segmentation & Funneling', desc: 'Tailored messaging architectures designed for top, middle, and bottom-of-funnel prospects.' },
      { title: 'Email & SMS Automation', desc: 'Automated lifecycle flows, win-back sequences, and promotional broadcast management.' },
      { title: 'Conversion Rate Optimization (CRO)', desc: 'Landing page heatmapping, A/B testing, and checkout funnel optimization.' },
    ],
    process: [
      { step: '01', title: 'Funnel Architecture', desc: 'Mapping the customer journey from first touchpoint to repeat purchase.' },
      { step: '02', title: 'Creative & Copy Production', desc: 'Crafting high-converting ad copy, visual assets, and landing page content.' },
      { step: '03', title: 'Campaign Launch', desc: 'Deploying synchronized ad sets and tracking pixels across all selected channels.' },
      { step: '04', title: 'Continuous Scaling', desc: 'A/B testing ad variations, optimizing bids, and scaling winning audiences.' },
    ],
    technologies: ['Meta Business Suite', 'Google Ads', 'Klaviyo', 'HubSpot', 'Hotjar'],
    faqs: [
      { q: 'What industries do you specialize in?', a: 'We have proven track records in e-commerce, healthcare & aesthetics, SaaS, real estate, hospitality, and professional services.' },
      { q: 'How do you measure campaign success?', a: 'We focus on bottom-line business metrics: return on ad spend (ROAS), cost per acquisition (CPA), qualified leads, and total revenue.' },
    ],
  },
  'search-engine-optimization': {
    title: 'Search Engine Optimization (SEO / AEO / GEO)',
    tagline: 'Rank #1 on traditional search engines, AI search engines, and generative answer models.',
    description:
      'Modern search extends beyond standard Google algorithms. We optimize your brand for Search Engine Optimization (SEO), Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) like ChatGPT, Perplexity, and Google Gemini.',
    tags: ['Technical SEO', 'AEO (Answer Engine)', 'GEO (AI Search)', 'Local Citations', 'High-DA Backlinks'],
    deliverables: [
      { title: 'Comprehensive Technical Audit', desc: 'Core Web Vitals remediation, crawl budget optimization, and structured schema markup.' },
      { title: 'Answer Engine Optimization (AEO)', desc: 'Optimizing structured FAQs and authoritative definitions for voice and AI answer engines.' },
      { title: 'Generative Engine Optimization (GEO)', desc: 'Positioning your brand as the primary reference source cited by Gemini and ChatGPT.' },
      { title: 'High-Impact Content Silos', desc: 'Topic clusters and pillar pages designed to build undeniable topical authority.' },
    ],
    process: [
      { step: '01', title: 'Technical & Topical Crawl', desc: 'Identifying code errors, indexing blocks, and topical authority gaps.' },
      { step: '02', title: 'Keyword & Entity Mapping', desc: 'Extracting high-intent search terms and semantic entity graphs.' },
      { step: '03', title: 'On-Page & Schema Deployment', desc: 'Injecting JSON-LD schema, optimizing heading tags, and refreshing metadata.' },
      { step: '04', title: 'Authority & Link Acquisition', desc: 'Earning tier-1 editorial mentions and building persistent domain authority.' },
    ],
    technologies: ['Google Search Console', 'Ahrefs', 'SEMrush', 'Screaming Frog', 'Schema.org'],
    faqs: [
      { q: 'What is GEO (Generative Engine Optimization)?', a: 'GEO is the practice of optimizing digital footprint and brand citations so AI models (like ChatGPT, Gemini, and Claude) accurately recommend your business in response to user prompts.' },
      { q: 'How fast can we expect SEO rankings to improve?', a: 'Initial technical and indexing improvements typically appear in 4-6 weeks, with compound organic traffic growth accelerating between months 3 and 6.' },
    ],
  },
  'performance-marketing': {
    title: 'Performance Marketing',
    tagline: 'High-converting media buying with laser-focused ROAS and scalable conversion systems.',
    description:
      'We turn advertising dollars into predictable revenue engines. By combining behavioral audience modeling, creative iteration sprints, and advanced conversion tracking (CAPI), we scale paid media efficiently across Meta, Google, and TikTok.',
    tags: ['Meta Ads', 'Google Ads & PMax', 'TikTok Ads', 'CAPI Integration', 'ROAS Scaling'],
    deliverables: [
      { title: 'Precision Media Buying', desc: 'Full campaign structuring across Advantage+ Shopping, Google Performance Max, and TikTok Spark Ads.' },
      { title: 'Creative Fatigue Defense', desc: 'Weekly creative drops (UGC, static hooks, motion graphics) to keep ad fatigue low and CTR high.' },
      { title: 'Conversions API (CAPI)', desc: 'Server-side tracking implementation ensuring 100% attribution accuracy post-iOS14.' },
      { title: 'Dynamic Retargeting Matrix', desc: 'Custom audience exclusions and tiered retention sequences for maximum lifetime value.' },
    ],
    process: [
      { step: '01', title: 'Tracking Architecture', desc: 'Server-side pixel and Conversion API setup with offline event tracking.' },
      { step: '02', title: 'Creative Sprinting', desc: 'Formulating 10+ creative angles tested concurrently with controlled budgets.' },
      { step: '03', title: 'Algorithmic Scaling', desc: 'Deploying horizontal and vertical budget scaling on winning audience segments.' },
      { step: '04', title: 'Margin Optimization', desc: 'Refining cost-per-acquisition (CPA) and maximizing return on marketing investment.' },
    ],
    technologies: ['Meta Ads Manager', 'Google Performance Max', 'TikTok Ads Manager', 'Triple Whale', 'Stape.io'],
    faqs: [
      { q: 'What is the recommended monthly ad spend?', a: 'We manage ad accounts from $3,000/month to over $100,000/month across diverse global markets.' },
      { q: 'Do you handle the creative design and video editing?', a: 'Yes, our in-house creative team scripts, edits, and designs all video ads, hooks, and static creatives.' },
    ],
  },
  'content-creation': {
    title: 'Content Creation & Video Production',
    tagline: 'Viral short-form reels, high-engagement scripting, and studio-grade multimedia production.',
    description:
      'In a feed-driven digital world, attention is currency. We produce scroll-stopping visual content, short-form video reels, studio photo shoots, and compelling narrative scripts that turn casual viewers into loyal brand advocates.',
    tags: ['Short-Form Reels', 'TikTok & Shorts', 'Story Scripting', 'Product Photography', 'Post-Production'],
    deliverables: [
      { title: 'Short-Form Video Production', desc: 'End-to-end production of TikToks, Instagram Reels, and YouTube Shorts.' },
      { title: 'Hook & Script Architecture', desc: 'Psychology-driven video hooks designed to achieve 70%+ 3-second retention rates.' },
      { title: 'Motion Graphics & Sound Design', desc: 'Custom animated typography, dynamic sound effects, and color grading.' },
      { title: 'Visual Content Library', desc: 'Organized asset repository with high-res stills, b-roll footage, and promo cutdowns.' },
    ],
    process: [
      { step: '01', title: 'Concept & Trend Scouting', desc: 'Identifying trending audio, viral formats, and brand storytelling hooks.' },
      { step: '02', title: 'Scripting & Storyboarding', desc: 'Drafting scene-by-scene scripts optimized for high retention and clear call-to-actions.' },
      { step: '03', title: 'Filming & Studio Production', desc: 'High-definition 4K camera production, studio lighting, and audio recording.' },
      { step: '04', title: 'Rapid Post-Production', desc: 'Fast turnaround editing with kinetic captions, sound design, and color grading.' },
    ],
    technologies: ['Adobe Premiere Pro', 'After Effects', 'CapCut Pro', 'DaVinci Resolve', 'Sony Cinema FX'],
    faqs: [
      { q: 'How many videos do you deliver monthly?', a: 'Our content packages range from 12 to 30+ fully edited reels per month, tailored to your posting frequency and platform goals.' },
      { q: 'Can you produce content remotely if our team is located in another country?', a: 'Yes! You can ship products directly to our production studios, or our creative directors can guide remote filming with high-fidelity asset treatment.' },
    ],
  },
  'graphic-designing': {
    title: 'Graphics Designing & Visual Identity',
    tagline: 'Timeless brand identities, iconic logos, and captivating digital design systems.',
    description:
      'We craft bespoke visual identities that communicate authority and elegance. From cohesive design guidelines and vector logo marks to high-converting packaging and social media design systems, our work leaves an indelible impression.',
    tags: ['Brand Identity', 'Logo Design', 'Packaging & Print', 'Social Media Kits', 'UI/UX Design'],
    deliverables: [
      { title: 'Brand Identity Guidelines', desc: 'Comprehensive brand bible including typography scales, color psychology, and usage rules.' },
      { title: 'Vector Logo Suites', desc: 'Primary, secondary, and sub-mark vector files in all digital and print formats.' },
      { title: 'Social Media Design Kits', desc: 'Custom Canva and Figma templates for carousels, stories, announcements, and banners.' },
      { title: 'Packaging & Marketing Collateral', desc: 'Print-ready packaging, brochures, billboards, business cards, and exhibition graphics.' },
    ],
    process: [
      { step: '01', title: 'Visual Exploration', desc: 'Moodboards, style direction, and aesthetic alignment sessions.' },
      { step: '02', title: 'Concept Generation', desc: 'Drafting multiple distinct conceptual vectors and typography treatments.' },
      { step: '03', title: 'Refinement & Iteration', desc: 'Polishing geometry, optical balance, contrast ratios, and color harmony.' },
      { step: '04', title: 'Brand Asset Delivery', desc: 'Exporting production-ready vector SVG, EPS, AI, PNG, and PDF asset packages.' },
    ],
    technologies: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'InDesign', 'Cinema 4D'],
    faqs: [
      { q: 'Do I get full copyright and ownership of the designs?', a: 'Yes! Upon final project handover, 100% intellectual property and commercial copyright belongs to you.' },
      { q: 'What file formats will I receive?', a: 'You will receive vector sources (.AI, .EPS, .SVG) along with high-res raster files (.PNG, .JPEG, .PDF) for both digital and print applications.' },
    ],
  },
  'influencer-marketing': {
    title: 'Influencer Marketing & Creator Partnerships',
    tagline: 'Authentic creator collaborations that build cultural relevance and generate explosive sales.',
    description:
      'We connect your brand with vetted creators, influencers, and industry thought-leaders across Pakistan, UAE, UK, USA, and Europe. We manage end-to-end outreach, contracts, creative briefs, and ROI tracking to maximize social proof.',
    tags: ['Creator Outreach', 'Contract Negotiation', 'UGC Sourcing', 'Campaign Management'],
    deliverables: [
      { title: 'Vetted Influencer Roster', desc: 'Handpicked creators matched for audience demographic authenticity and engagement quality.' },
      { title: 'Creative Briefing & Oversight', desc: 'Strategic creative frameworks ensuring creator authenticity while delivering brand messaging.' },
      { title: 'Usage Rights & Licensing', desc: 'Contractual terms securing whitelisting and paid ad usage rights for high-performing creator videos.' },
      { title: 'Attribution & Sales Tracking', desc: 'Affiliate tracking, custom promo codes, and UTM parameter monitoring.' },
    ],
    process: [
      { step: '01', title: 'Audience Matchmaking', desc: 'Auditing creator followers for authenticity, bot percentages, and geographic distribution.' },
      { step: '02', title: 'Outreach & Negotiations', desc: 'Handling all communications, product gifting, rates, and contractual deliverables.' },
      { step: '03', title: 'Content Approval', desc: 'Reviewing drafts to ensure brand safety, accurate claims, and compelling calls-to-action.' },
      { step: '04', title: 'Amplification & Ads', desc: 'Whitelisting top creator videos as spark ads to dramatically lower acquisition costs.' },
    ],
    technologies: ['Modash', 'Grin', 'CreatorIQ', 'Shopify Collabs', 'Bitly Enterprise'],
    faqs: [
      { q: 'Do you work with micro-influencers or macro-celebrities?', a: 'We architect hybrid strategies leveraging micro-influencers for high-converting UGC combined with macro-influencers for massive reach.' },
      { q: 'How do you prevent influencer fraud or fake followers?', a: 'We run deep algorithmic scans on every creator’s audience quality score, engagement consistency, and comment authenticity before initiating contact.' },
    ],
  },
  'e-commerce': {
    title: 'E-Commerce Solutions & Store Scaling',
    tagline: 'End-to-end e-commerce store design, development, and conversion optimization.',
    description:
      'We build, manage, and scale high-velocity online stores on Shopify, WooCommerce, and custom headless architectures. From frictionless checkouts to inventory integrations and average order value (AOV) boosters, we turn visitors into buyers.',
    tags: ['Shopify Plus', 'WooCommerce', 'Conversion Optimization', 'Checkout Systems', 'Inventory Sync'],
    deliverables: [
      { title: 'Custom Shopify Storefronts', desc: 'High-speed, mobile-first e-commerce themes designed for frictionless shopping.' },
      { title: 'Upsell & Cross-Sell Engines', desc: 'In-cart upsells, post-purchase offers, and bundling apps configured to maximize AOV.' },
      { title: 'Payment & Logistics Integration', desc: 'Seamless integration with international and local gateways (Stripe, PayPal, PayFast, COD).' },
      { title: 'Speed & Mobile Optimization', desc: 'Sub-second load times and Core Web Vitals optimization for maximum mobile conversions.' },
    ],
    process: [
      { step: '01', title: 'Catalog & UX Architecture', desc: 'Structuring intuitive product filtering, navigation menus, and collection pages.' },
      { step: '02', title: 'Store Development & Customization', desc: 'Coding responsive Liquid or React templates with pixel-perfect typography.' },
      { step: '03', title: 'Apps & Flow Automation', desc: 'Configuring review widgets, abandoned cart recovery, and stock notifications.' },
      { step: '04', title: 'Launch & AOV Optimization', desc: 'Conducting end-to-end test orders, stress testing, and ongoing conversion rate testing.' },
    ],
    technologies: ['Shopify Plus', 'WooCommerce', 'Klaviyo', 'ReCharge', 'Judge.me', 'Stripe'],
    faqs: [
      { q: 'Can you migrate our existing store to Shopify without losing SEO?', a: 'Yes! We execute 301 redirect mapping, metadata migration, and URL preservation so you retain search rankings.' },
      { q: 'Do you set up local and international payment gateways?', a: 'Yes, we integrate both global gateways (Stripe, PayPal) and domestic payment systems (Credit Cards, Bank Transfer, COD).' },
    ],
  },
  'it-solutions': {
    title: 'IT Solutions & Custom Software Engineering',
    tagline: 'Robust web applications, mobile apps, and scalable digital infrastructure.',
    description:
      'From modern responsive web applications and native mobile apps to AI integrations and enterprise automation software, our engineering team builds fast, secure, and future-proof digital solutions.',
    tags: ['Web Applications', 'Mobile App Development', 'Custom SaaS', 'Cloud Infrastructure', 'API Integrations'],
    deliverables: [
      { title: 'Custom Web Applications', desc: 'Scalable web platforms built with React, Next.js, Node.js, and modern TypeScript.' },
      { title: 'iOS & Android Mobile Apps', desc: 'Cross-platform mobile applications delivering native performance and offline reliability.' },
      { title: 'Custom API & Backend Architecture', desc: 'High-throughput REST and GraphQL APIs with rock-solid database design.' },
      { title: 'Cloud Infrastructure & DevOps', desc: 'Continuous deployment pipelines, automated backups, and scalable cloud hosting.' },
    ],
    process: [
      { step: '01', title: 'Architecture Planning', desc: 'System modeling, database schemas, and API contract specifications.' },
      { step: '02', title: 'UI/UX Prototyping', desc: 'High-fidelity wireframing and clickable prototypes in Figma.' },
      { step: '03', title: 'Full-Stack Development', desc: 'Writing clean, modular, and fully tested TypeScript code.' },
      { step: '04', title: 'Deployment & Monitoring', desc: 'Cloud provisioning, performance tuning, and 24/7 uptime monitoring.' },
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
    faqs: [
      { q: 'Do you provide ongoing maintenance and technical support?', a: 'Yes, we offer dedicated maintenance service level agreements (SLAs) including security updates, feature additions, and server monitoring.' },
      { q: 'Can you build custom internal tools or integrations for our business?', a: 'Absolutely. We frequently engineer custom CRM dashboards, ERP integrations, and workflow automation systems.' },
    ],
  },
};

export const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();

  const currentSlug = serviceId || 'marketing-consultation';
  const service = serviceDirectory[currentSlug] || {
    title: currentSlug.replace(/-/g, ' ').toUpperCase(),
    tagline: 'Professional digital solutions engineered to elevate your brand.',
    description: 'Social Entities offers end-to-end digital capabilities designed to accelerate your growth and establish market leadership.',
    tags: ['Digital Solutions', 'Strategy', 'Execution'],
    deliverables: [
      { title: 'Strategic Roadmap', desc: 'Comprehensive blueprint aligning deliverables with your core business KPIs.' },
      { title: 'Expert Execution', desc: 'Hands-on implementation leveraging cutting-edge tools and methodologies.' },
      { title: 'Measurable ROI', desc: 'Transparent reporting and continuous optimization based on real performance data.' },
    ],
    process: [
      { step: '01', title: 'Discovery', desc: 'Understanding your unique goals, competitors, and operational requirements.' },
      { step: '02', title: 'Architecture', desc: 'Drafting the tailored execution framework.' },
      { step: '03', title: 'Deployment', desc: 'Launching the strategy with precision.' },
      { step: '04', title: 'Optimization', desc: 'Ongoing iterations to maximize long-term return.' },
    ],
    technologies: ['Google Analytics', 'Meta Business Suite', 'Figma', 'TypeScript'],
    faqs: [
      { q: 'How do we get started?', a: 'Simply reach out via our contact form or WhatsApp to schedule an introductory consultation with our strategy leads.' },
    ],
  };

  return (
    <main className="flex-1 bg-white font-sans pt-8 sm:pt-12 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-12 max-w-[1380px] mx-auto w-full select-none">
      
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200/70">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-[#5B6A50] hover:text-[#4a5840] font-bold text-[14px] sm:text-[15px] bg-stone-50 border border-stone-200 px-4 py-2 rounded-full transition-all shadow-2xs hover:shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
        <span className="text-xs sm:text-sm font-semibold text-stone-500 uppercase tracking-wider">
          Social Entities • Service Hub
        </span>
      </div>

      {/* Hero Header */}
      <div className="max-w-4xl mb-12 sm:mb-16">
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {service.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-[#5B6A50]/10 text-[#5B6A50] font-bold text-[12px] sm:text-[13px] px-3.5 py-1 rounded-full uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F1A34] tracking-tight leading-[1.1] mb-6">
          {service.title}
        </h1>
        <p className="text-lg sm:text-xl font-semibold text-[#5B6A50] mb-4 leading-snug">
          {service.tagline}
        </p>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-3xl mb-8">
          {service.description}
        </p>

        {/* Primary CTA Button */}
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            to="/contact"
            className="bg-[#5B6A50] hover:bg-[#4e5c44] text-white px-8 py-3.5 sm:py-4 rounded-full font-bold text-[15px] sm:text-[16px] inline-flex items-center gap-3 transition-all shadow-sm group cursor-pointer hover:scale-102 active:scale-98"
          >
            <span>Book Consultation for this Service</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="https://wa.me/923024482639"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#5B6A50] text-[#5B6A50] hover:bg-[#5B6A50] hover:text-white px-6 py-3.5 rounded-full font-bold text-[15px] transition-all shadow-2xs"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Key Deliverables Grid */}
      <section className="mb-16 sm:mb-24">
        <div className="flex items-center gap-3 mb-8">
          <Layers className="w-6 h-6 text-[#5B6A50]" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1A34] tracking-tight">
            Key Deliverables & Scope
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.deliverables.map((item, idx) => (
            <div
              key={idx}
              className="bg-stone-50/80 p-6 sm:p-8 rounded-2xl border border-stone-200/80 hover:border-[#5B6A50]/40 transition-colors shadow-2xs"
            >
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#5B6A50] shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F1A34] mb-2">{item.title}</h3>
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Working Methodology */}
      <section className="mb-16 sm:mb-24 bg-[#5B6A50] text-white p-8 sm:p-12 lg:p-14 rounded-3xl shadow-sm">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <Zap className="w-4 h-4" />
            <span>Proven Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            How We Deliver Results for {service.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((step, idx) => (
            <div key={idx} className="bg-white/10 p-6 rounded-2xl border border-white/15 backdrop-blur-xs flex flex-col justify-between">
              <div>
                <span className="text-[#C5B487] font-black text-2xl mb-2 block">{step.step}</span>
                <h4 className="text-lg font-bold mb-2 text-white">{step.title}</h4>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack / Platforms */}
      <section className="mb-16 sm:mb-20">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-5 h-5 text-[#5B6A50]" />
          <h3 className="text-xl sm:text-2xl font-bold text-[#0F1A34]">
            Technologies & Platforms We Leverage
          </h3>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {service.technologies.map((tech, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 px-4 py-2 rounded-xl text-stone-700 font-semibold text-sm shadow-2xs flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#5B6A50]" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-[#5B6A50]" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1A34] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                <h3 className="text-base sm:text-lg font-bold text-[#0F1A34] mb-2">{faq.q}</h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA Banner */}
      <div className="bg-stone-100 p-8 sm:p-12 rounded-3xl text-center border border-stone-200">
        <h3 className="text-2xl sm:text-3xl font-black text-[#0F1A34] mb-3">
          Ready to scale your business with {service.title}?
        </h3>
        <p className="text-stone-600 max-w-xl mx-auto mb-6 text-sm sm:text-base">
          Let’s discuss your current challenges and build a custom growth strategy tailored for your target audience.
        </p>
        <Link
          to="/contact"
          className="bg-[#5B6A50] hover:bg-[#4e5c44] text-white px-8 py-3.5 rounded-full font-bold text-[16px] inline-flex items-center gap-2 shadow-xs transition-all hover:scale-105"
        >
          <span>Get Started Today</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </main>
  );
};
