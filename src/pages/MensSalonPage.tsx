import React from 'react';
import { useSalon } from '../context/SalonContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';
import { PackageCard } from '../components/PackageCard';
import { getGeneralWhatsAppUrl } from '../config/salonConfig';
import { Scissors, Sparkles, MessageSquare, Phone } from 'lucide-react';

export const MensSalonPage: React.FC = () => {
  const { config, mensPackages, openAppointmentModal } = useSalon();
  const primaryWaUrl = getGeneralWhatsAppUrl();

  // Published packages for visitors
  const publishedPackages = mensPackages.filter((p) => !p.isDraft);

  return (
    <>
      <SeoHead
        title="Men's Salon Services & Packages in Burari | ART OF SCISSOR"
        description="Browse men's haircuts, beard grooming, hair spa, INOA hair colour, and 15 curated special packages at ART OF SCISSOR Unisex Salon in Burari, Delhi."
        canonicalPath="/mens-salon"
      />

      <div className="bg-[#0C0D0E] min-h-screen">
        <Breadcrumbs items={[{ label: "Men's Salon" }]} />

        {/* Page Hero */}
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
            <span>Men&apos;s Grooming</span>
            <span aria-hidden="true">·</span>
            <span>Burari, New Delhi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Men&apos;s Haircuts, Beard Care & Grooming Packages
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            From precision fades and razor edging to revitalizing hair spas and dermatological
            facials, explore our full menu of dedicated men&apos;s services.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openAppointmentModal("Men's Grooming")}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#dfbe58] text-black font-semibold text-xs tracking-wide uppercase rounded-lg transition-colors cursor-pointer"
            >
              Book Men&apos;s Appointment
            </button>
            <a
              href={primaryWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-neutral-900 border border-white/10 hover:border-[#D4AF37] text-white font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </section>

        {/* 15 Special Packages Section */}
        <section className="py-16 bg-[#0E1013] border-t border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                Original Salon Menu
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Complete Men&apos;s Special Packages
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light">
                Comprehensive grooming packages combining multiple essential treatments. Tap any
                package to initiate a WhatsApp inquiry or book an appointment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
