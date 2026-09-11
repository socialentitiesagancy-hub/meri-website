import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/', active: location.pathname === '/' },
    { name: 'Services', href: '/services', active: location.pathname.startsWith('/services') },
    { name: 'Case Studies', href: '/case-studies', active: location.pathname.startsWith('/case-studies') },
    { name: 'Blogs', href: '/blogs', active: location.pathname.startsWith('/blog') },
    { name: 'About Us', href: '/about', active: location.pathname === '/about' },
    { name: 'Contact Us', href: '/contact', active: location.pathname === '/contact' },
  ];

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 bg-white/95 backdrop-blur-sm z-50 transition-all border-b border-stone-100/50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-3.5 sm:py-5 flex items-center justify-between font-nav relative">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group cursor-pointer select-none shrink-0"
        >
          <Logo size="md" variant="dark" />
        </Link>

        {/* Navigation Links - Desktop (Hidden on Tablet and Mobile) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-9 text-[#5B6A50] font-medium text-[17px] xl:text-[20px] tracking-normal">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={closeMenu}
              className={`transition-all relative flex items-center gap-1.5 ${
                link.active
                  ? 'font-extrabold underline decoration-2 underline-offset-8 text-[#5B6A50]'
                  : 'hover:opacity-80'
              }`}
            >
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Right Controls: CTA Button & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* CTA Button - Always on Navbar, responsive */}
          <Link
            to="/contact"
            onClick={closeMenu}
            className="bg-[#5B6A50] hover:bg-[#4e5c44] text-white px-3 sm:px-5 lg:px-7 py-1.5 sm:py-2.5 lg:py-3 rounded-full font-bold text-[12px] sm:text-[16px] lg:text-[20px] flex items-center gap-1.5 sm:gap-2 lg:gap-3 transition-all active:scale-98 group shadow-xs whitespace-nowrap"
          >
            <span>Get in Touch</span>
            {/* Bold white arrow */}
            <svg
              className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white stroke-[3.5] transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          {/* Mobile Hamburger Toggle Button (Visible on Tablet and Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-xl text-[#5B6A50] hover:bg-stone-100 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-7 sm:h-7" /> : <Menu className="w-5 h-5 sm:w-7 sm:h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-white/98 backdrop-blur-md border-b border-stone-200 shadow-xl overflow-hidden lg:hidden z-50 font-nav"
          >
            <div className="py-4 px-6 flex flex-col gap-3 max-w-[1400px] mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={closeMenu}
                  className={`text-[#5B6A50] font-semibold text-[17px] py-2 border-b border-stone-100 last:border-0 hover:pl-2 transition-all flex items-center justify-between ${
                    link.active ? 'font-bold underline' : ''
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};




