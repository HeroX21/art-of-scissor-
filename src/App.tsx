/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SalonProvider, useSalon } from './context/SalonContext';
import { SALON_SERVICES } from './config/salonConfig';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AppointmentModal } from './components/AppointmentModal';
import { OwnerPortalModal } from './components/OwnerPortalModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MensSalonPage } from './pages/MensSalonPage';
import { WomensSalonPage } from './pages/WomensSalonPage';
import { SpecialPackagesPage } from './pages/SpecialPackagesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { activeRoute } = useSalon();

  // Route matcher helper
  const renderCurrentView = () => {
    // Clean normalized path
    const path = activeRoute.replace(/\/$/, '') || '/';

    // Static pages
    if (path === '/') return <HomePage />;
    if (path === '/about') return <AboutPage />;
    if (path === '/mens-salon') return <MensSalonPage />;
    if (path === '/womens-salon') return <WomensSalonPage />;
    if (path === '/special-packages') return <SpecialPackagesPage />;
    if (path === '/gallery') return <GalleryPage />;
    if (path === '/contact') return <ContactPage />;
    if (path === '/book-appointment') return <BookAppointmentPage />;
    if (path === '/privacy-policy') return <PrivacyPolicyPage />;
    if (path === '/terms-and-conditions') return <TermsPage />;

    // Individual service routes
    const matchingService = SALON_SERVICES.find(
      (s) => `/${s.slug}` === path || `/${s.id}` === path
    );
    if (matchingService) {
      return <ServiceDetailPage service={matchingService} />;
    }

    // 404 fallback
    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0C0D0E] text-[#F4F4F0] relative selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Sticky Header with Announcement Bar */}
      <Navbar />

      {/* Main Routed Page Content */}
      <main className="flex-1">{renderCurrentView()}</main>

      {/* Site Footer with Verified Business Info */}
      <Footer />

      {/* Floating Accessible WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Interactive Global Modals */}
      <AppointmentModal />
      <OwnerPortalModal />
    </div>
  );
};

export default function App() {
  return (
    <SalonProvider>
      <AppContent />
    </SalonProvider>
  );
}
