import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';
import { GalleryGrid } from '../components/GalleryGrid';
import { useSalon } from '../context/SalonContext';
import { MessageSquare } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../config/salonConfig';

export const GalleryPage: React.FC = () => {
  const { openAppointmentModal } = useSalon();
  const primaryWaUrl = getGeneralWhatsAppUrl();

  return (
    <>
      <SeoHead
        title="Salon Gallery & Interior | ART OF SCISSOR Unisex Salon Burari"
        description="Explore the ambiance, haircut styling stations, hair spa basins, and facial treatment suites at ART OF SCISSOR Unisex Salon in Burari, Delhi."
        canonicalPath="/gallery"
      />

      <div className="bg-[#0C0D0E] min-h-screen">
        <Breadcrumbs items={[{ label: 'Gallery' }]} />

        {/* Page Hero */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
            <span>Visual Tour</span>
            <span aria-hidden="true">·</span>
            <span>Salon Aesthetics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Inside ART OF SCISSOR Unisex Salon
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            Take a look at our illuminated styling mirrors, ergonomic chairs, relaxing hair spa wash
            stations, and clean facial treatment spaces in Burari, New Delhi.
          </p>
        </section>

        {/* Main Gallery Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <GalleryGrid />

          {/* CTA Banner */}
          <div className="mt-16 bg-[#141619] border border-[#D4AF37]/30 rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-serif font-bold text-white mb-2">
              Experience the Salon in Person
            </h3>
            <p className="text-xs text-neutral-300 mb-6 font-light">
              We invite you to drop by our salon near Rani Public School in West Sant Nagar, Burari,
              or book your slot in advance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => openAppointmentModal()}
                className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#dfbe58] text-black font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Schedule Appointment
              </button>
              <a
                href={primaryWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-neutral-900 border border-white/10 text-white font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
