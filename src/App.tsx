import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageLoader } from './components/PageLoader';

import { Home } from './pages/Home';
import { ServicesIndex } from './pages/ServicesIndex';
import { ServiceDetail } from './pages/ServiceDetail';
import { LocationDetail } from './pages/LocationDetail';
import { ContactUs } from './components/ContactUs';
import { AboutUs } from './components/AboutUs';
import { CaseStudies } from './pages/CaseStudies';
import { CaseStudyDetail } from './pages/CaseStudyDetail';
import { Blogs } from './pages/Blogs';
import { AdminPortal } from './pages/admin/AdminPortal';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();

  // Check if current route or query is for Admin
  const searchParams = new URLSearchParams(location.search);
  const isAdminParam = searchParams.get('admin') === 'true' || searchParams.get('portal') === 'admin';
  const isAdminPath =
    location.pathname.startsWith('/admin-se-portal') ||
    location.pathname.startsWith('/admin-portal') ||
    location.pathname.startsWith('/admin') ||
    window.location.hash.includes('admin');

  const isAdminRoute = isAdminPath || isAdminParam;

  useEffect(() => {
    // Only show loader on initial website visit, skip for admin routes
    if (isAdminRoute) {
      setIsLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [isAdminRoute]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#596A4E]/20 flex flex-col justify-between overflow-x-hidden">
      <ScrollToTop />
      {/* Branded Social Entities Initial Loader */}
      {isLoading && !isAdminRoute && (
        <PageLoader
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* Top Navigation - hidden in admin workspace */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<main className="flex-1"><AboutUs /></main>} />
        <Route path="/services" element={<ServicesIndex />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/locations/:locationId" element={<LocationDetail />} />
        <Route path="/contact" element={<main className="flex-1"><ContactUs /></main>} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog" element={<Blogs />} />
        
        {/* Dedicated Admin Portal Routes */}
        <Route path="/admin-se-portal" element={<AdminPortal />} />
        <Route path="/admin-portal" element={<AdminPortal />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/admin/*" element={<AdminPortal />} />
        
        {/* Fallback route */}
        <Route path="*" element={isAdminRoute ? <AdminPortal /> : <Home />} />
      </Routes>

      {/* Footer Section - hidden in admin workspace */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}



