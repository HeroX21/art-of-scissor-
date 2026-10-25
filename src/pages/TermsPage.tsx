import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';
import { useSalon } from '../context/SalonContext';

export const TermsPage: React.FC = () => {
  const { config } = useSalon();

  return (
    <>
      <SeoHead
        title="Terms and Conditions | ART OF SCISSOR Unisex Salon"
        description="Terms and conditions for salon services, appointment inquiries, and cancellations at ART OF SCISSOR Unisex Salon in Burari, New Delhi."
        canonicalPath="/terms-and-conditions"
      />

      <div className="bg-[#0C0D0E] min-h-screen">
        <Breadcrumbs items={[{ label: 'Terms and Conditions' }]} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-neutral-300 space-y-8 text-xs sm:text-sm font-light leading-relaxed">
          <div>
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Salon Guidelines
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mt-1">
              Terms and Conditions
            </h1>
            <p className="text-xs text-neutral-400 mt-2">
              Last Updated: {new Date().getFullYear()} · ART OF SCISSOR Unisex Salon, Burari
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-semibold text-white">
              1. Nature of Website Inquiries
            </h2>
            <p>
              Submitting an appointment inquiry or downloading an appointment pass through this
              website constitutes a scheduling request, not an automatic guarantee of immediate
              chair availability. A booking is considered confirmed once our salon manager contacts
              you via WhatsApp or phone to confirm the exact time slot.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-semibold text-white">
              2. Salon Pricing & Package Menu
            </h2>
            <p>
              Service packages, included treatments, and any displayed pricing reflect current salon
              rates and may be updated periodically by the salon owner. In the event of a discrepancy,
              the rate communicated directly by the salon front desk at the time of consultation
              shall apply.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-semibold text-white">
              3. Punctuality & Cancellation Etiquette
            </h2>
            <p>
              We value your time and the time of other clients. If you need to reschedule or cancel
              an appointment, please notify us via WhatsApp or phone at least 2 hours in advance so
              that the chair may be offered to other clients.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-semibold text-white">
              4. Skin Sensitivity & Consultation
            </h2>
            <p>
              Before undergoing hair colouring, bleach, chemical treatments, or facial peels, please
              inform our stylists of any known skin allergies, scalp sensitivities, or previous
              adverse reactions. We conduct patch tests or strand consultations when appropriate.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-semibold text-white">
              5. Governing Law
            </h2>
            <p>
              These terms are governed by the applicable laws of the National Capital Territory of
              Delhi, India.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
