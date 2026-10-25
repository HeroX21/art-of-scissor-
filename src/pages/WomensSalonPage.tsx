import React from 'react';
import { useSalon } from '../context/SalonContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';
import { PackageCard } from '../components/PackageCard';
import { getGeneralWhatsAppUrl } from '../config/salonConfig';
import { Sparkles, MessageSquare, HeartHandshake } from 'lucide-react';

export const WomensSalonPage: React.FC = () => {
  const { config, womensPackages, openAppointmentModal } = useSalon();
  const primaryWaUrl = getGeneralWhatsAppUrl();

  // Hide draft packages for regular visitors unless approved by owner
  const publishedPackages = womensPackages.filter((p) => !p.isDraft);

  return (
    <>
      <SeoHead
        title="Women's Salon Services & Care Packages in Burari | ART OF SCISSOR"
        description="Discover women's haircuts, hair spa conditioning, ammonia-free hair colouring, facials, clean-ups, and threading at ART OF SCISSOR Unisex Salon in Burari, Delhi."
        canonicalPath="/womens-salon"
      />

      <div className="bg-[#0C0D0E] min-h-screen">
        <Breadcrumbs items={[{ label: "Women's Salon" }]} />

        {/* Page Hero */}
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
            <span>Women&apos;s Beauty & Hair Care</span>
            <span aria-hidden="true">·</span>
            <span>Burari, New Delhi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Hair Styling, Deep Spa & Radiant Skincare
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            Personalized hair wash, nourishing Matrix and L&apos;Oréal hair spas, gentle eyebrow
            threading, D-Tan clarifying treatments, and specialized facials.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openAppointmentModal("Women's Care")}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#dfbe58] text-black font-semibold text-xs tracking-wide uppercase rounded-lg transition-colors cursor-pointer"
            >
              Book Women&apos;s Appointment
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

        {/* Philosophy Note on Unisex Services */}
        <div className="max-w-4xl mx-auto px-4 mb-12">
          <div className="bg-[#141619] border border-white/10 rounded-xl p-4 text-xs text-neutral-300 flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white">Unisex Service Capability:</strong> At ART OF SCISSOR,
              haircuts, hair colour, hair spa, facials, clean-ups, and grooming services are
              available to all customers according to their individual needs. Gender menus are
              organized as a navigation convenience.
            </p>
          </div>
        </div>

        {/* Women's Packages Section */}
        <section className="py-16 bg-[#0E1013] border-t border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                Approved Special Combos
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Women&apos;s Treatment Packages
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light">
                Carefully adapted combinations from our verified service list.
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
