import React, { useState } from 'react';
import { CleanLogo } from './CleanLogo';
import samaaLogoAsset from '../assets/images/samaa_official_logo_1786808352787.jpg';
import menuLogoAsset from '../assets/images/menu_foods_logo_1786809147138.jpg';
import cliveLogoAsset from '../assets/images/clive_official_logo_1786809444818.jpg';
import hafeezSonsLogoAsset from '../assets/images/hafeez_sons_logo_1786810410880.jpg';
import vanityLogoAsset from '../assets/images/vanity_official_logo_1786810435198.jpg';
import saAestheticsLogoAsset from '../assets/images/sa_aesthetics_logo_1786810451119.jpg';
import ilsaLogoAsset from '../assets/images/ilsa_official_logo_1786810464591.jpg';
import oneCallLogoAsset from '../assets/images/one_call_solution_logo_1786810477551.jpg';
import cryptoSangatLogoAsset from '../assets/images/crypto_sangat_logo_1786811202244.jpg';
import buzzaziLogoAsset from '../assets/images/buzzazi_logo_1786811390741.jpg';
import panwarLogoAsset from '../assets/images/panwar_films_logo_1786811576394.jpg';
import expenseVisorLogoAsset from '../assets/images/expensevisor_logo_1786811588209.jpg';
import shawLogoAsset from '../assets/images/shaw_x_manufacturing_logo_1786811755564.jpg';
import bienLogoAsset from '../assets/images/bien_brand_logo_1786811773252.jpg';
import expressNewsLogoAsset from '../assets/images/express_news_badge_1786816893113.jpg';

interface Brand {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  renderLogo: () => React.ReactNode;
}

// Brand Logo rendered cleanly with exact uniform height and tight compact spacing
const BrandLogoCard: React.FC<{ brand: Brand }> = ({ brand }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="flex items-center justify-center shrink-0 h-[76px] sm:h-[88px] md:h-[96px] transition-all duration-300 cursor-pointer group select-none opacity-90 hover:opacity-100 px-3.5 sm:px-5"
      title={`${brand.name} • ${brand.category}`}
    >
      {brand.imageUrl && !imgError ? (
        <img
          src={brand.imageUrl}
          alt={brand.name}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="h-14 sm:h-16 md:h-18 max-w-[200px] sm:max-w-[240px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="transition-transform duration-300 group-hover:scale-105 flex items-center justify-center h-full max-h-[72px] sm:max-h-[84px]">
          {brand.renderLogo()}
        </div>
      )}
    </div>
  );
};

export const Clients: React.FC = () => {
  // Row 1: Premier Broadcast, Healthcare, Apparel, Energy & Enterprise Brands
  const brandsRow1: Brand[] = [
    // 1. SAMAA TV (Exact Logo from user upload with consistent seamless background)
    {
      id: 'samaa',
      name: 'SAMAA TV',
      category: 'Broadcast News Network',
      renderLogo: () => (
        <CleanLogo
          src={samaaLogoAsset}
          alt="SAMAA TV"
          tolerance={24}
          className="h-14 sm:h-16 md:h-18 max-w-[200px] sm:max-w-[240px] w-auto object-contain"
        />
      ),
    },

    // 2. EXPRESS NEWS (Asset Logo from user upload)
    {
      id: 'express',
      name: 'Express News',
      category: 'Television Network',
      renderLogo: () => (
        <CleanLogo
          src={expressNewsLogoAsset}
          alt="Express News"
          tolerance={24}
          className="h-14 sm:h-16 md:h-18 max-w-[200px] sm:max-w-[240px] w-auto object-contain"
        />
      ),
    },

    // 3. CLIVE SHOES (Exact Logo from user upload with consistent seamless background)
    {
      id: 'clive',
      name: 'Clive',
      category: 'Footwear & Retail',
      renderLogo: () => (
        <CleanLogo
          src={cliveLogoAsset}
          alt="Clive - live your dream"
          tolerance={24}
          className="h-14 sm:h-16 md:h-18 max-w-[200px] sm:max-w-[240px] w-auto object-contain"
        />
      ),
    },

    // 4. KROSS KULTURE (Exact Interlocking Monogram from user upload - Standalone without text)
    {
      id: 'krosskulture',
      name: 'Kross Kulture',
      category: 'Luxury Fashion',
      renderLogo: () => (
        <div className="flex items-center justify-center">
          {/* Exact Interlocking Monogram from download (7).png - Clean Transparent Black Vector */}
          <svg
            className="w-14 sm:w-16 md:w-18 h-14 sm:h-16 md:h-18 shrink-0"
            viewBox="0 0 256 256"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="#000000" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="miter">
              {/* Top Arched Crown with Collegiate Bracket Spurs */}
              <path d="M 98 44 C 92 34 84 26 95 14 C 104 12 152 12 161 14 C 172 26 164 34 158 44" />
              <path d="M 108 54 C 114 47 121 45 128 45 C 135 45 142 47 148 54" />
              <path d="M 115 45 L 115 54 M 141 45 L 141 54" />

              {/* Vertical Left Double Strut */}
              <path d="M 76 44 L 76 212" />
              <path d="M 104 54 L 104 202" />

              {/* Bottom Arched Crown with Collegiate Bracket Spurs */}
              <path d="M 98 212 C 92 222 84 230 95 242 C 104 244 152 244 161 242 C 172 230 164 222 158 212" />
              <path d="M 108 202 C 114 209 121 211 128 211 C 135 211 142 209 148 202" />
              <path d="M 115 211 L 115 202 M 141 211 L 141 202" />

              {/* Horizontal Outer 'C' - Left Bracketed Spine */}
              <path d="M 76 54 L 46 54 C 36 54 28 62 22 74 C 28 88 28 104 28 128 C 28 152 28 168 22 182 C 28 194 36 202 46 202 L 76 202" />
              <path d="M 52 82 L 52 174" />

              {/* Top Arm of 'C' with Outer Spur */}
              <path d="M 158 54 L 208 54 C 218 54 226 62 232 74 C 224 88 224 102 234 114 L 198 114 L 198 82 L 104 82" />
              <path d="M 76 82 L 52 82" />
              <path d="M 76 54 L 104 54" />
              <path d="M 148 54 L 158 54" />

              {/* Bottom Arm of 'C' with Outer Spur */}
              <path d="M 158 202 L 208 202 C 218 202 226 194 232 182 C 224 168 224 154 234 142 L 198 142 L 198 174 L 104 174" />
              <path d="M 76 174 L 52 174" />
              <path d="M 76 202 L 104 202" />
              <path d="M 148 202 L 158 202" />

              {/* Center Intersecting Crossbar Tongue */}
              <path d="M 144 82 L 144 114 L 234 114 M 144 142 L 234 142" />
              <path d="M 144 142 L 144 174" />
              <path d="M 104 114 L 144 114 M 104 142 L 144 142" />

              {/* Right Side Inner Contour of Vertical Monogram */}
              <path d="M 172 54 L 172 82 M 172 174 L 172 202" />
              <path d="M 172 82 C 180 92 180 164 172 174" />
            </g>
          </svg>
        </div>
      ),
    },

    // 5. SHIFA INTERNATIONAL HOSPITALS (Exact Logo from user upload)
    {
      id: 'shifa',
      name: 'Shifa International Hospitals Ltd.',
      category: 'Healthcare & Hospitals',
      renderLogo: () => (
        <div className="flex items-center gap-3">
          {/* Exact Red Crescent & Blue Striped Globe Mark */}
          <svg className="w-11 sm:w-13 h-11 sm:h-13 shrink-0" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer Red Crescent */}
            <path
              d="M50 4C23.5 4 2 25.5 2 52C2 78.5 23.5 100 50 100C63.5 100 75.8 94.4 84.6 85.3C60.2 87.5 38.8 69.8 38.8 45.4C38.8 28.2 48.9 13.5 63.8 7C59.5 5 54.8 4 50 4Z"
              fill="#D92228"
            />
            {/* Blue Globe with Curved White Latitude Stripes */}
            <g>
              <mask id="shifaMask">
                <circle cx="58" cy="50" r="40" fill="white" />
              </mask>
              <g mask="url(#shifaMask)">
                <circle cx="58" cy="50" r="40" fill="#0083CB" />
                {/* 5 Distinct Horizontal Curved Latitude Bands */}
                <path d="M10 24 Q58 37 106 24" stroke="white" strokeWidth="4.5" fill="none" />
                <path d="M10 40 Q58 53 106 40" stroke="white" strokeWidth="4.5" fill="none" />
                <path d="M10 57 Q58 70 106 57" stroke="white" strokeWidth="4.5" fill="none" />
                <path d="M12 73 Q58 86 104 73" stroke="white" strokeWidth="4.5" fill="none" />
                <path d="M22 88 Q58 98 94 88" stroke="white" strokeWidth="4" fill="none" />
              </g>
            </g>
          </svg>
          {/* Bold 3-line Stacked Typography */}
          <div className="flex flex-col text-left leading-[1.12]">
            <span className="font-extrabold text-[15px] sm:text-[17px] tracking-tight text-[#111827]">
              Shifa
            </span>
            <span className="font-extrabold text-[13px] sm:text-[14px] tracking-tight text-[#111827]">
              International
            </span>
            <span className="font-bold text-[10px] sm:text-[11px] tracking-tight text-[#4B5563]">
              Hospitals Ltd.
            </span>
          </div>
        </div>
      ),
    },

    // 6. MENU FOODS (Exact Screenshot Logo with consistent seamless background)
    {
      id: 'menu',
      name: 'MENU Foods',
      category: 'Consumer Foods',
      renderLogo: () => (
        <CleanLogo
          src={menuLogoAsset}
          alt="MENU Foods"
          tolerance={24}
          className="h-12 sm:h-14 md:h-15 max-w-[170px] sm:max-w-[195px] w-auto object-contain"
        />
      ),
    },

    // 7. AGIVA (Exact Logo from user upload)
    {
      id: 'agiva',
      name: 'AGIVA Care & Beauty',
      category: 'Cosmetics & Grooming',
      renderLogo: () => (
        <div className="flex flex-col items-center justify-center leading-none text-center">
          <div className="flex items-center gap-1 font-sans font-black text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#18181B]">
            {/* First A: chevron */}
            <span className="font-light text-2xl sm:text-3xl md:text-4xl leading-none">Λ</span>
            <span>G</span>
            <span>I</span>
            <span>V</span>
            {/* Second A: chevron */}
            <span className="font-light text-2xl sm:text-3xl md:text-4xl leading-none">Λ</span>
          </div>
          <span className="text-[9.5px] sm:text-[10.5px] font-bold text-[#18181B] tracking-[0.28em] uppercase mt-1">
            CARE &amp; BEAUTY
          </span>
        </div>
      ),
    },

    // 8. SUNFINITY SOLAR (Exact Logo from user upload)
    {
      id: 'sunfinity',
      name: 'Sunfinity Solar',
      category: 'Renewable Solar Energy',
      renderLogo: () => (
        <div className="flex items-center justify-center">
          <svg className="h-12 sm:h-14 md:h-15 w-auto" viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="sunfinGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF2A3" />
                <stop offset="55%" stopColor="#FDCE25" />
                <stop offset="85%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EAB308" />
              </radialGradient>
            </defs>

            {/* Radiant Sun Sphere with Concentric Halo Rings */}
            <g transform="translate(100, 42)">
              {/* Fine radiating orbit rings */}
              <circle cx="0" cy="0" r="38" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
              <circle cx="0" cy="0" r="37" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="5 1.5" opacity="0.7" />
              <circle cx="0" cy="0" r="35.5" stroke="#FBBF24" strokeWidth="0.8" opacity="0.5" />
              <circle cx="0" cy="0" r="34" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="8 2" opacity="0.8" />
              <circle cx="0" cy="0" r="32" stroke="#FCD34D" strokeWidth="1.2" opacity="0.6" />
              {/* Core Sun Disk */}
              <circle cx="0" cy="0" r="30" fill="url(#sunfinGlow)" />
            </g>

            {/* "Sunfinity" Bold Blue Typography */}
            <text
              x="22"
              y="54"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="34"
              fontWeight="900"
              letterSpacing="-0.02em"
              fill="#006DAE"
            >
              Sunfinity
            </text>

            {/* "SOLAR" Uppercase Subtitle beneath Finity */}
            <text
              x="106"
              y="68"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="12.5"
              fontWeight="800"
              letterSpacing="0.12em"
              fill="#006DAE"
            >
              SOLAR
            </text>
          </svg>
        </div>
      ),
    },

    // 9. PAKISTAN BRITAIN BUSINESS COUNCIL (Exact Logo from user upload)
    {
      id: 'pbbc',
      name: 'Pakistan Britain Business Council',
      category: 'Bilateral Trade & Council',
      renderLogo: () => (
        <div className="flex items-center gap-3">
          {/* Dual Stacked Flags Container */}
          <div className="flex flex-col gap-0.5 rounded-[2px] overflow-hidden shrink-0 shadow-xs">
            {/* Pakistan Flag */}
            <svg className="w-10 h-5.5 shrink-0" viewBox="0 0 36 20" fill="none">
              {/* Green Field */}
              <rect width="36" height="20" fill="#01411C" />
              {/* White Hoist Stripe */}
              <rect width="9" height="20" fill="#FFFFFF" />
              {/* White Crescent & Star */}
              <circle cx="23" cy="10" r="5.2" fill="#FFFFFF" />
              <circle cx="24.5" cy="9.2" r="4.3" fill="#01411C" />
              {/* Star */}
              <polygon
                points="24.2,6.5 24.9,8.3 26.8,8.3 25.3,9.4 25.8,11.2 24.2,10.1 22.6,11.2 23.1,9.4 21.6,8.3 23.5,8.3"
                fill="#FFFFFF"
              />
            </svg>

            {/* UK Union Jack Flag */}
            <svg className="w-10 h-5.5 shrink-0" viewBox="0 0 36 20" fill="none">
              {/* Blue field */}
              <rect width="36" height="20" fill="#012169" />
              {/* White Diagonals */}
              <path d="M0,0 L36,20 M36,0 L0,20" stroke="#FFFFFF" strokeWidth="4" />
              {/* Red Diagonals */}
              <path d="M0,0 L18,10 M36,0 L18,10 M0,20 L18,10 M36,20 L18,10" stroke="#C8102E" strokeWidth="1.6" />
              {/* White Cross */}
              <path d="M18,0 V20 M0,10 H36" stroke="#FFFFFF" strokeWidth="6.5" />
              {/* Red St George Cross */}
              <path d="M18,0 V20 M0,10 H36" stroke="#C8102E" strokeWidth="3.5" />
            </svg>
          </div>

          {/* Thin Vertical Divider Bar */}
          <div className="w-[1.5px] h-9 bg-stone-400 rounded-full mx-0.5 shrink-0" />

          {/* Stacked Clean Typography */}
          <div className="flex flex-col text-left leading-[1.14]">
            <span className="font-sans font-semibold text-[15px] sm:text-[16.5px] tracking-tight text-[#111827]">
              Pakistan
            </span>
            <span className="font-sans font-semibold text-[15px] sm:text-[16.5px] tracking-tight text-[#111827]">
              Britain
            </span>
            <span className="font-sans font-medium text-[9.5px] sm:text-[10.5px] tracking-tight text-[#4B5563]">
              Business Council
            </span>
          </div>
        </div>
      ),
    },

    // 10. ROSA BLANCA COUNTRY CLUB (Exact Logo from user upload)
    {
      id: 'rosablanca',
      name: 'Rosa Blanca Country Club',
      category: 'Hospitality & Leisure',
      renderLogo: () => (
        <div className="flex flex-col items-center justify-center text-center">
          {/* Gold Rose Flower Line-Art & Filigree Scroll Emblems */}
          <svg className="h-7 sm:h-8 md:h-9 w-auto mb-0.5" viewBox="0 0 120 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Central Stylized Rose Bud */}
            <g stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
              {/* Rose Petals Contour */}
              <path d="M60 4 C 54 8 54 18 60 22 C 66 18 66 8 60 4 Z" />
              <path d="M57 10 C 60 8 63 11 60 14" />
              <path d="M56 16 C 60 14 62 17 60 20" />
              {/* Stem & Leaf */}
              <path d="M60 22 L60 30" />
              <path d="M60 26 Q64 24 67 27 Q63 29 60 28" fill="#C5A059" fillOpacity="0.2" />
            </g>

            {/* Left Filigree Scroll Wings */}
            <g stroke="#C5A059" strokeWidth="1.2" strokeLinecap="round" fill="none">
              <path d="M54 28 C 45 25 35 32 25 26 C 18 22 12 28 8 28" />
              <path d="M50 30 C 42 34 32 30 22 35 C 16 38 10 34 5 32" />
              <path d="M42 27 C 36 22 30 24 24 20" />
            </g>

            {/* Right Filigree Scroll Wings */}
            <g stroke="#C5A059" strokeWidth="1.2" strokeLinecap="round" fill="none">
              <path d="M66 28 C 75 25 85 32 95 26 C 102 22 108 28 112 28" />
              <path d="M70 30 C 78 34 88 30 98 35 C 104 38 110 34 115 32" />
              <path d="M78 27 C 84 22 90 24 96 20" />
            </g>
          </svg>

          {/* "Rosa Blanca" Elegant Gold Calligraphic Script */}
          <div
            className="text-[24px] sm:text-[28px] md:text-[30px] font-normal leading-none text-[#C5A059]"
            style={{ fontFamily: "'Great Vibes', 'Alex Brush', 'Dancing Script', cursive" }}
          >
            Rosa Blanca
          </div>

          {/* "COUNTRY CLUB" Subtitle in Tracked Serif Gold */}
          <div
            className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase text-[#A07C35] mt-1"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            COUNTRY CLUB
          </div>
        </div>
      ),
    },

    // 11. SA AESTHETICS (Asset Logo from upload)
    {
      id: 'saaesthetics',
      name: 'SA Aesthetics by Swaira',
      category: 'Aesthetics & Beauty Clinic',
      renderLogo: () => (
        <CleanLogo
          src={saAestheticsLogoAsset}
          alt="SA Aesthetics By Swaira"
          tolerance={24}
          className="h-14 sm:h-16 md:h-18 max-w-[210px] sm:max-w-[250px] w-auto object-contain"
        />
      ),
    },
  ];

  // Row 2: Tech, Beauty, Media & Global Service Brands
  const brandsRow2: Brand[] = [
    // 12. ILSA COSMETICS (Asset Logo from upload)
    {
      id: 'ilsa',
      name: 'ilsa.',
      category: 'Cosmetics & Beauty',
      renderLogo: () => (
        <CleanLogo
          src={ilsaLogoAsset}
          alt="ilsa."
          tolerance={24}
          className="h-14 sm:h-16 md:h-18 max-w-[210px] sm:max-w-[250px] w-auto object-contain"
        />
      ),
    },

    // 13. EXPENSEVISOR (Asset Logo from upload)
    {
      id: 'expensevisor',
      name: 'ExpenseVisor',
      category: 'Fintech & SaaS',
      renderLogo: () => (
        <CleanLogo
          src={expenseVisorLogoAsset}
          alt="ExpenseVisor - The Expense Report Company"
          tolerance={24}
          className="h-14 sm:h-16 md:h-18 max-w-[220px] sm:max-w-[260px] w-auto object-contain"
        />
      ),
    },

    // 14. PANWAR FILMS (Asset Logo from upload)
    {
      id: 'panwar',
      name: 'Panwar Films',
      category: 'Cinema & Media Production',
      renderLogo: () => (
        <CleanLogo
          src={panwarLogoAsset}
          alt="Panwar Films"
          tolerance={24}
          className="h-14 sm:h-16 md:h-18 max-w-[220px] sm:max-w-[260px] w-auto object-contain"
        />
      ),
    },

    // 15. THE NAIL BAR BY ANISHA YOUSAF (Exact Logo from user upload)
    {
      id: 'nailbar',
      name: 'The Nail Bar by Anisha Yousaf',
      category: 'Luxury Nail & Beauty Lounge',
      renderLogo: () => (
        <div className="flex items-center justify-center">
          <svg className="h-12 sm:h-14 md:h-15 w-auto" viewBox="0 0 285 105" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* "THE" label top-left above N */}
            <text x="8" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="600" letterSpacing="0.08em" fill="#18181B">
              THE
            </text>

            {/* Main Wordmark: NAIL BAR */}
            <g stroke="#18181B" strokeWidth="4.5" strokeLinecap="square" strokeLinejoin="miter" fill="none">
              {/* N */}
              <path d="M 8 76 L 8 32 L 40 76 L 40 32" />
              {/* A in NAIL */}
              <path d="M 52 76 L 68 32 L 84 76" />
              {/* I */}
              <path d="M 97 32 L 97 76" />
              {/* L */}
              <path d="M 110 32 L 110 76 L 128 76" />
              {/* B */}
              <path d="M 150 76 L 150 32 L 168 32 C 176 32 182 37 182 43 C 182 49 176 53 168 53 L 150 53 L 170 53 C 179 53 185 58 185 64 C 185 70 179 76 170 76 Z" />
              {/* A in BAR (Minimalist inverted chevron Λ with open base) */}
              <path d="M 195 76 L 209 32 L 223 76" />
              {/* R */}
              <path d="M 237 76 L 237 32 L 255 32 C 263 32 269 37 269 44 C 269 51 263 55 255 55 L 237 55 M 253 55 L 269 76" />
            </g>

            {/* Nail Polish Bottle Cap atop the 'A' */}
            <rect x="60" y="5" width="16" height="23" rx="2" fill="#18181B" />
            {/* Applicator Brush Stem & Tip inside A */}
            <rect x="66.5" y="28" width="3" height="21" fill="#D4AF37" />
            <ellipse cx="68" cy="50" rx="2.5" ry="3.5" fill="#C59B63" />

            {/* "BY" text */}
            <text x="126" y="96" fontFamily="system-ui, -apple-system, sans-serif" fontSize="14" fontWeight="600" letterSpacing="0.04em" fill="#18181B">
              BY
            </text>

            {/* "Anisha Yousaf" Cursive Handwritten Signature */}
            <text x="148" y="98" fontFamily="'Alex Brush', 'Caveat', 'Dancing Script', cursive" fontSize="28" fontStyle="italic" fontWeight="600" fill="#18181B">
              Anisha Yousaf
            </text>
          </svg>
        </div>
      ),
    },

    // 16. HAFEEZ SONS (Asset Logo from upload)
    {
      id: 'hafeezsons',
      name: 'Hafeez Sons',
      category: 'Industrial Tools & Power',
      renderLogo: () => (
        <CleanLogo
          src={hafeezSonsLogoAsset}
          alt="Hafeez Sons Work With Power"
          tolerance={24}
          className="h-14 sm:h-16 md:h-18 max-w-[210px] sm:max-w-[250px] w-auto object-contain"
        />
      ),
    },

    // 17. CRYPTO SANGAT (Asset Logo from upload)
    {
      id: 'cryptosangat',
      name: 'Crypto Sangat',
      category: 'Web3 & Blockchain',
      renderLogo: () => (
        <CleanLogo
          src={cryptoSangatLogoAsset}
          alt="Crypto Sangat"
          tolerance={24}
          className="h-14 sm:h-16 md:h-18 max-w-[210px] sm:max-w-[250px] w-auto object-contain"
        />
      ),
    },

    // 18. ONE CALL SOLUTION (Asset Logo from upload)
    {
      id: 'onecall',
      name: 'One Call Solution',
      category: 'Global Education & Migration',
      renderLogo: () => (
        <CleanLogo
          src={oneCallLogoAsset}
          alt="One Call Solution Global Education & Migration"
          tolerance={24}
          className="h-14 sm:h-16 md:h-18 max-w-[220px] sm:max-w-[260px] w-auto object-contain"
        />
      ),
    },

    // 19. BUZZAZI (Asset Logo from upload)
    {
      id: 'buzzazi',
      name: 'BUZZAZI',
      category: 'Luxury Fashion',
      renderLogo: () => (
        <CleanLogo
          src={buzzaziLogoAsset}
          alt="BUZZAZI"
          tolerance={24}
          className="h-14 sm:h-16 md:h-18 max-w-[210px] sm:max-w-[250px] w-auto object-contain"
        />
      ),
    },

    // 20. BIEN (Asset Logo from upload)
    {
      id: 'bien',
      name: 'bien',
      category: 'Fashion & Style',
      renderLogo: () => (
        <CleanLogo
          src={bienLogoAsset}
          alt="bien"
          tolerance={24}
          className="h-14 sm:h-16 md:h-18 max-w-[210px] sm:max-w-[250px] w-auto object-contain"
        />
      ),
    },

    // 21. VANITY (Asset Logo from upload)
    {
      id: 'vanity',
      name: 'Vanity',
      category: 'Aesthetics & Style',
      renderLogo: () => (
        <CleanLogo
          src={vanityLogoAsset}
          alt="Vanity"
          tolerance={24}
          className="h-14 sm:h-16 md:h-18 max-w-[220px] sm:max-w-[260px] w-auto object-contain"
        />
      ),
    },

    // 22. SHAW MANUFACTURING (Asset Logo from upload)
    {
      id: 'shaw',
      name: 'SHAW Manufacturing',
      category: 'Manufacturing',
      renderLogo: () => (
        <CleanLogo
          src={shawLogoAsset}
          alt="SHAW X Manufacturing"
          tolerance={24}
          className="h-14 sm:h-16 md:h-18 max-w-[220px] sm:max-w-[260px] w-auto object-contain"
        />
      ),
    },
  ];

  // Seamless duplication for infinite smooth marquee loops
  const marqueeRow1 = [...brandsRow1, ...brandsRow1];
  const marqueeRow2 = [...brandsRow2, ...brandsRow2];

  return (
    <section id="clients" className="w-full bg-white py-16 sm:py-24 font-canva select-none overflow-hidden relative border-t border-b border-stone-200/60">
      
      {/* Top Section Header */}
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 text-center mb-10 sm:mb-14">
        <h2 className="text-[34px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#5B6A50] tracking-tight mb-3.5">
          Admired by Clients
        </h2>
        <p className="text-stone-500 text-sm sm:text-base lg:text-lg font-normal max-w-xl mx-auto">
          Trusted by leading national broadcast networks, healthcare institutes, retail fashion houses, and enterprise giants.
        </p>
      </div>

      {/* Infinite Scrolling Ticker Stage with Edge Vignette Masking */}
      <div className="relative w-full space-y-6 sm:space-y-8 pause-on-hover py-2">
        
        {/* Left & Right Gradient Fade overlays for smooth infinite entry/exit */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Row 1: Forward Marquee Ticker */}
        <div className="overflow-hidden flex w-full">
          <div className="animate-marquee flex items-center gap-3 sm:gap-5 md:gap-6 px-2">
            {marqueeRow1.map((brand, index) => (
              <BrandLogoCard key={`${brand.id}-row1-${index}`} brand={brand} />
            ))}
          </div>
        </div>

        {/* Row 2: Reverse Marquee Ticker */}
        <div className="overflow-hidden flex w-full">
          <div className="animate-marquee-reverse flex items-center gap-3 sm:gap-5 md:gap-6 px-2">
            {marqueeRow2.map((brand, index) => (
              <BrandLogoCard key={`${brand.id}-row2-${index}`} brand={brand} />
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};
