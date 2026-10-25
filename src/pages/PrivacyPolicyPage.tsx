import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';
import { useSalon } from '../context/SalonContext';

export const PrivacyPolicyPage: React.FC = () => {
  const { config } = useSalon();

  return (
    <>
      <SeoHead
        title="Privacy Policy | ART OF SCISSOR Unisex Salon"
        description="Privacy policy for ART OF SCISSOR Unisex Salon in Burari, Delhi. Details how appointment inquiries, phone communications, and local settings are handled."
        canonicalPath="/privacy-policy"
      />

      <div className="bg-[#0C0D0E] min-h-screen">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-neutral-300 space-y-8 text-xs sm:text-sm font-light leading-relaxed">
          <div>
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Legal Information
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mt-1">
              Privacy Policy
            </h1>
            <p className="text-xs text-neutral-400 mt-2">
              Effective Date: {new Date().getFullYear()} · ART OF SCISSOR Unisex Salon
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-semibold text-white">
              1. Information We Collect
            </h2>
            <p>
              ART OF SCISSOR Unisex Salon operates with minimal data collection. When you submit an
              appointment inquiry through our website, we request only the necessary information to
              schedule your salon service:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400">
              <li>Full name (to address you when scheduling).</li>
              <li>Mobile phone number (to contact you via WhatsApp or phone call).</li>
              <li>Requested service or package, preferred date, and preferred time slot.</li>
              <li>Optional styling or skin preference notes.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-semibold text-white">
              2. How Your Information Is Used
            </h2>
            <p>Your details are used solely to:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400">
              <li>Facilitate direct WhatsApp or phone communication regarding chair availability.</li>
              <li>Confirm or reschedule appointment inquiries.</li>
              <li>Assist our stylists in preparing for your requested treatment.</li>
            </ul>
            <p>We do not sell, rent, or trade your personal information to third parties.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-semibold text-white">
              3. WhatsApp and Third-Party Communication
            </h2>
            <p>
              When you initiate an inquiry via WhatsApp, communication is transferred to the
              WhatsApp platform, which operates under WhatsApp/Meta&apos;s independent Privacy
              Policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-semibold text-white">
              4. Local Storage
            </h2>
            <p>
              Our website uses browser local storage solely to store local configuration preferences
              (such as salon owner management settings and saved appointment passes). No tracking
              cookies or marketing beacons are installed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-semibold text-white">
              5. Contact Us
            </h2>
            <p>For questions regarding our privacy practices, you may reach us at:</p>
            <p className="text-neutral-400">
              ART OF SCISSOR Unisex Salon
              <br />
              Ground Floor, Plot No. 7, Street No. 7, near Rani Public School, A-2 Block, Virendar
              Nagar, Block B, West Sant Nagar, Burari, New Delhi 110084, India
              <br />
              Email: {config.email}
              <br />
              Phone: {config.primaryPhone}
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
