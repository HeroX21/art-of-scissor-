import React from 'react';
import { useSalon } from '../context/SalonContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';
import { LocationSection } from '../components/LocationSection';
import { Phone, MessageSquare, Mail, MapPin, Calendar, Clock } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../config/salonConfig';

export const ContactPage: React.FC = () => {
  const { config, openAppointmentModal } = useSalon();
  const primaryWaUrl = getGeneralWhatsAppUrl();

  return (
    <>
      <SeoHead
        title="Contact & Location | ART OF SCISSOR Unisex Salon Burari"
        description="Visit ART OF SCISSOR Unisex Salon near Rani Public School, Burari, New Delhi. Call +91 95822 53329 or chat on WhatsApp for bookings and location directions."
        canonicalPath="/contact"
      />

      <div className="bg-[#0C0D0E] min-h-screen">
        <Breadcrumbs items={[{ label: 'Contact and Location' }]} />

        {/* Page Hero */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
            <span>Direct Communication</span>
            <span aria-hidden="true">·</span>
            <span>Burari, New Delhi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Contact ART OF SCISSOR
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            Have a question about a hairstyle, hair colour shade, or special package? Reach out
            directly via WhatsApp or phone.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openAppointmentModal()}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#dfbe58] text-black font-semibold text-xs tracking-wide uppercase rounded-lg transition-colors cursor-pointer"
            >
              Book an Appointment
            </button>
            <a
              href={primaryWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Us Directly</span>
            </a>
          </div>
        </section>

        {/* Contact Method Highlights */}
        <section className="py-12 bg-[#0E1013] border-t border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Primary Contact */}
              <div className="bg-[#141619] border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1C1F26] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <MessageSquare className="w-5 h-5 text-[#25D366]" />
                </div>
                <h3 className="text-base font-serif font-bold text-white">
                  WhatsApp & Primary Line
                </h3>
                <p className="text-xs text-neutral-400">
                  Best for appointment scheduling, package questions, and immediate replies.
                </p>
                <div className="pt-2">
                  <a
                    href={`tel:${config.primaryPhoneRaw}`}
                    className="font-mono text-sm text-[#D4AF37] font-bold hover:underline block"
                  >
                    {config.primaryPhone}
                  </a>
                </div>
              </div>

              {/* Secondary Line */}
              <div className="bg-[#141619] border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1C1F26] border border-white/10 flex items-center justify-center text-neutral-300">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-bold text-white">Secondary Phone Line</h3>
                <p className="text-xs text-neutral-400">
                  Alternative calling line for bookings and salon reception inquiries.
                </p>
                <div className="pt-2">
                  <a
                    href={`tel:${config.secondaryPhoneRaw}`}
                    className="font-mono text-sm text-neutral-200 font-bold hover:underline block"
                  >
                    {config.secondaryPhone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="bg-[#141619] border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1C1F26] border border-white/10 flex items-center justify-center text-neutral-300">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-bold text-white">Email Inquiries</h3>
                <p className="text-xs text-neutral-400">
                  For formal inquiries, business collaborations, or customer feedback.
                </p>
                <div className="pt-2">
                  <a
                    href={`mailto:${config.email}`}
                    className="text-xs text-neutral-200 font-medium hover:underline block truncate"
                  >
                    {config.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Location and Directions Section */}
        <LocationSection />
      </div>
    </>
  );
};
