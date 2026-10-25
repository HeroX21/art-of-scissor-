import React from 'react';
import { useSalon } from '../context/SalonContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';
import { LocationSection } from '../components/LocationSection';
import { Scissors, ShieldCheck, HeartHandshake, MapPin, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { config, openAppointmentModal } = useSalon();

  return (
    <>
      <SeoHead
        title="About ART OF SCISSOR Unisex Salon | Burari, Delhi"
        description="Learn about ART OF SCISSOR Unisex Salon in Burari, New Delhi. Dedicated to clean haircutting, hair spa therapy, facials, and personalized grooming near Rani Public School."
        canonicalPath="/about"
      />

      <div className="bg-[#0C0D0E] min-h-screen">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        {/* Page Hero */}
        <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
            <span>Our Salon Story</span>
            <span aria-hidden="true">·</span>
            <span>Burari, New Delhi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Personal Care & Grooming at <span className="text-[#D4AF37]">ART OF SCISSOR</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            Founded with the belief that great grooming begins with attentive listening, sterilized
            tools, and respectful care for each client hair texture and skin type.
          </p>
        </section>

        {/* Narrative & Philosophy */}
        <section className="py-16 bg-[#0E1013] border-t border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">
                  Our Identity
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  A Welcoming Unisex Salon in West Sant Nagar
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  Located near Rani Public School in Burari, ART OF SCISSOR was created to provide
                  both men and women with an elevated, unhurried salon experience. Rather than
                  generic factory-line styling, our approach centers on consultation — assessing
                  your natural hair growth, scalp condition, and skin sensitivity before beginning
                  any cut, treatment, or colour.
                </p>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  Whether you are seeking a clean scissor fade, deep hydration through Matrix or
                  L&apos;Oréal hair spas, an ammonia-free INOA hair colour, or a refreshing VLCC /
                  Lotus facial, our menu is transparent, honest, and free of unnecessary upselling.
                </p>
              </div>

              <div className="bg-[#141619] border border-white/10 rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <img
                  src="/src/assets/images/salon_interior_luxury_1792936763722.jpg"
                  alt="ART OF SCISSOR salon interior and styling stations"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Core Values / Commitments */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="bg-[#141619] border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1C1F26] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-bold text-white">Hygiene First</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Every blade used during shaving is fresh and disposable. Combs, scissors, and
                  styling tools undergo routine sanitization between each appointment.
                </p>
              </div>

              <div className="bg-[#141619] border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1C1F26] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-bold text-white">Tested Formulations</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  We use trusted brand names including Matrix, L&apos;Oréal Professional, INOA,
                  VLCC, Lotus Herbals, Cheryl&apos;s, and O3+ to ensure safe, dependable results.
                </p>
              </div>

              <div className="bg-[#141619] border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1C1F26] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-bold text-white">Honest Consultations</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  We give realistic styling advice suitable for Delhi&apos;s weather and water,
                  ensuring your hair looks great not just on day one, but every morning at home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <LocationSection />
      </div>
    </>
  );
};
