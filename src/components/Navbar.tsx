import React, { useState, useEffect } from 'react';
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

  const closeMenu = () => setMobileMenuOpen(false);

  // Close drawer whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="w-full sticky top-0 bg-white/95 backdrop-blur-sm z-50 border-b border-stone-100/50">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-12 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4 font-nav relative min-h-[56px] sm:min-h-[64px]">
        {/* Brand Logo — shrinks on narrow screens so CTA + menu fit */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group cursor-pointer select-none min-w-0 shrink"
          aria-label="Social Entities Home"
        >
          <Logo
            size="sm"
            variant="dark"
            className="[&_span]:text-[15px] sm:[&_span]:text-[18px] md:[&_span]:text-[20px] [&_svg]:w-7 [&_svg]:h-7 sm:[&_svg]:w-8 sm:[&_svg]:h-8"
          />
        </Link>

        {/* Desktop links — xl+ only so mid laptops/tablets don't overflow */}
        <nav
          className="hidden xl:flex items-center gap-5 2xl:gap-8 text-[#5B6A50] font-medium text-[16px] 2xl:text-[18px] tracking-normal"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`transition-all relative whitespace-nowrap ${
                link.active
                  ? 'font-extrabold underline decoration-2 underline-offset-8 text-[#5B6A50]'
                  : 'hover:opacity-80'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: CTA + hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <Link
            to="/contact"
            onClick={closeMenu}
            className="bg-[#5B6A50] hover:bg-[#4e5c44] text-white px-2.5 sm:px-5 xl:px-6 py-1.5 sm:py-2.5 rounded-full font-bold text-[11px] sm:text-[15px] xl:text-[17px] flex items-center gap-1 sm:gap-2 transition-all active:scale-[0.98] group shadow-xs"
          >
            <span className="sm:hidden">Contact</span>
            <span className="hidden sm:inline">Get in Touch</span>
            <svg
              className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white stroke-[3] transition-transform group-hover:translate-x-0.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="xl:hidden p-2 rounded-xl text-[#5B6A50] hover:bg-stone-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B6A50]/40"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            ) : (
              <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile / tablet / laptop-small drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[56px] sm:top-[64px] bg-black/25 xl:hidden z-40"
              onClick={closeMenu}
            />

            <motion.nav
              id="mobile-nav-drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full left-0 w-full bg-white border-b border-stone-200 shadow-xl xl:hidden z-50 font-nav max-h-[min(70vh,520px)] overflow-y-auto overscroll-contain"
              aria-label="Mobile"
            >
              <div className="py-2 px-3 sm:px-6 flex flex-col max-w-[1400px] mx-auto pb-[max(1rem,env(safe-area-inset-bottom))]">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={closeMenu}
                    className={`text-[#5B6A50] text-[16px] sm:text-[18px] py-3.5 px-2 border-b border-stone-100 last:border-0 transition-colors flex items-center justify-between min-h-[48px] ${
                      link.active
                        ? 'font-extrabold bg-[#5B6A50]/5 rounded-lg'
                        : 'font-semibold hover:bg-stone-50 rounded-lg'
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                ))}

                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="mt-3 mb-1 sm:hidden bg-[#5B6A50] text-white text-center font-bold text-[15px] py-3 rounded-full"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
