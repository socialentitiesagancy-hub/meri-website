import React from 'react';
import { motion } from 'motion/react';
import metaAiBadge from '../assets/images/meta_ai_badge_1785246765240.jpg';
import metaMediaBadge from '../assets/images/meta_media_badge_1785246784939.jpg';
import googleAdsLogo from '../assets/images/google_ads_logo_official_1785246687479.jpg';
import googleAnalyticsLogo from '../assets/images/google_analytics_official_1785246744646.jpg';
import shopifyLogo from '../assets/images/shopify_logo_official_1785246707283.jpg';
import wordpressLogo from '../assets/images/wordpress_logo_official_1785246724383.jpg';

export const PartnerBadges: React.FC = () => {
  const badges = [
    { src: metaAiBadge, alt: "Meta Certified AI", h: "h-[85px] sm:h-[95px] md:h-[100px] lg:h-[110px]" },
    { src: metaMediaBadge, alt: "Meta Media Planning", h: "h-[85px] sm:h-[95px] md:h-[100px] lg:h-[110px]" },
    { src: googleAdsLogo, alt: "Google Ads", h: "h-[70px] sm:h-[80px] md:h-[85px] lg:h-[95px]" },
    { src: googleAnalyticsLogo, alt: "Google Analytics", h: "h-[70px] sm:h-[80px] md:h-[85px] lg:h-[95px]" },
    { src: shopifyLogo, alt: "Shopify", h: "h-[60px] sm:h-[70px] md:h-[75px] lg:h-[85px]" },
    { src: wordpressLogo, alt: "WordPress", h: "h-[70px] sm:h-[80px] md:h-[85px] lg:h-[95px]" },
  ];

  // Duplicate for seamless loop on mobile
  const duplicatedBadges = [...badges, ...badges, ...badges];

  return (
    <section className="w-full bg-white pt-4 pb-10 sm:pt-6 sm:pb-14 border-t border-b border-stone-200/80 font-sans select-none overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop View: Static Centered (lg and up) */}
        <div className="hidden lg:flex flex-nowrap items-center justify-between gap-4 xl:gap-8 py-2 w-full overflow-hidden">
          {badges.map((badge, idx) => (
            <div key={`desktop-${idx}`} className="shrink hover:scale-105 transition-transform duration-200 flex items-center justify-center">
              <img 
                src={badge.src} 
                alt={badge.alt} 
                loading="lazy"
                decoding="async"
                className={`${badge.h} w-auto max-w-full object-contain mix-blend-multiply`}
              />
            </div>
          ))}
        </div>

        {/* Mobile & Tablet View: Infinite Scroll (below lg) */}
        <div className="lg:hidden relative w-full overflow-hidden">
          <motion.div 
            className="flex items-center gap-8 sm:gap-12 py-2 w-max"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {duplicatedBadges.map((badge, idx) => (
              <div key={`mobile-${idx}`} className="shrink-0 flex items-center justify-center">
                <img 
                  src={badge.src} 
                  alt={badge.alt} 
                  loading="lazy"
                  decoding="async"
                  className={`${badge.h} w-auto object-contain mix-blend-multiply`}
                />
              </div>
            ))}
          </motion.div>
          
          {/* Gradient Fades for Mobile */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>

      </div>
    </section>
  );
};





