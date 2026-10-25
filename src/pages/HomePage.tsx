import React from 'react';
import { useSalon } from '../context/SalonContext';
import { SALON_SERVICES, getGeneralWhatsAppUrl } from '../config/salonConfig';
import { ThreeShearsHero } from '../components/ThreeShearsHero';
import { ServiceCard } from '../components/ServiceCard';
import { PackageCard } from '../components/PackageCard';
import { GalleryGrid } from '../components/GalleryGrid';
import { LocationSection } from '../components/LocationSection';
import { SeoHead } from '../components/SeoHead';
import { ArrowRight, Sparkles, ShieldCheck, MapPin, Phone, MessageSquare } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { config, mensPackages, womensPackages, navigate, openAppointmentModal } = useSalon();

  const primaryWhatsAppUrl = getGeneralWhatsAppUrl();

  const handleNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  // Published packages preview (first 3)
  const mensPreview = mensPackages.filter((p) => !p.isDraft).slice(0, 3);
  const womensPreview = womensPackages.filter((p) => !p.isDraft).slice(0, 3);

  return (
    <>
      <SeoHead
        title="ART OF SCISSOR Unisex Salon in Burari, Delhi"
        description="Explore haircuts, hair spa, hair colouring, facials and grooming packages at ART OF SCISSOR Unisex Salon near Rani Public School, Burari, New Delhi. Contact us to inquire about appointments."
        canonicalPath="/"
      />

      {/* Hero Section with Interactive 3D Golden Shears */}
      <ThreeShearsHero
        onBookClick={() => openAppointmentModal()}
        onWhatsAppClick={() => window.open(primaryWhatsAppUrl, '_blank', 'noopener,noreferrer')}
      />

      {/* Services Overview Section */}
      <section className="py-20 bg-[#0C0D0E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                <span>Salon Capabilities</span>
                <span aria-hidden="true">·</span>
                <span>Complete Hair & Skin Menu</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
                Our Grooming & Beauty Services
              </h2>
              <p className="text-sm text-neutral-400 mt-2 font-light max-w-xl">
                Explore individual treatments designed for hair health, skin rejuvenation, and
                personalized day-to-day grooming.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => handleNav('/mens-salon', e)}
                className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-[#141619] hover:bg-[#1C1F26] border border-white/10 rounded-lg transition-colors cursor-pointer"
              >
                Men&apos;s Menu
              </button>
              <button
                onClick={(e) => handleNav('/womens-salon', e)}
                className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-[#141619] hover:bg-[#1C1F26] border border-white/10 rounded-lg transition-colors cursor-pointer"
              >
                Women&apos;s Menu
              </button>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SALON_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Men's Packages Spotlight Preview */}
      <section className="py-20 bg-[#0E1013] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                <span>Value Grooming</span>
                <span aria-hidden="true">·</span>
                <span>Men&apos;s Collection</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
                Featured Men&apos;s Packages
              </h2>
              <p className="text-sm text-neutral-400 mt-2 font-light max-w-xl">
                Popular bundled services combining haircuts, shaving, hair spa, D-Tan packs, and
                facial treatments.
              </p>
            </div>

            <a
              href="/mens-salon"
              onClick={(e) => handleNav('/mens-salon', e)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-[#dfbe58] transition-colors"
            >
              <span>View All 15 Men&apos;s Packages</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mensPreview.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Women's Packages Spotlight Preview */}
      <section className="py-20 bg-[#0C0D0E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                <span>Care & Glow</span>
                <span aria-hidden="true">·</span>
                <span>Women&apos;s Collection</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
                Featured Women&apos;s Packages
              </h2>
              <p className="text-sm text-neutral-400 mt-2 font-light max-w-xl">
                Curated combinations of hair wash, haircuts, spa therapies, facial clean-ups, and
                eyebrow threading.
              </p>
            </div>

            <a
              href="/womens-salon"
              onClick={(e) => handleNav('/womens-salon', e)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-[#dfbe58] transition-colors"
            >
              <span>View All Women&apos;s Packages</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {womensPreview.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ART OF SCISSOR (Factual, service-focused copy) */}
      <section className="py-20 bg-[#0E1013] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
              <span>Trust & Convenience</span>
              <span aria-hidden="true">·</span>
              <span>Our Service Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Why Visit ART OF SCISSOR in Burari
            </h2>
            <p className="text-sm text-neutral-400 mt-3 font-light leading-relaxed">
              We focus on reliable, hygienic grooming practices and comfortable salon sessions
              tailored to your schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#141619] border border-white/10 rounded-2xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1C1F26] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                Comprehensive Unisex Menu
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Multiple grooming and beauty services under one roof — precision haircutting,
                ammonia-free hair colour, Matrix and L&apos;Oréal hair spas, and dermatological
                facials.
              </p>
            </div>

            <div className="bg-[#141619] border border-white/10 rounded-2xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1C1F26] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                Convenient Burari Location
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Situated on the Ground Floor near Rani Public School in West Sant Nagar, Burari,
                making visits effortless for residents of Virendar Nagar and North Delhi.
              </p>
            </div>

            <div className="bg-[#141619] border border-white/10 rounded-2xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1C1F26] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                Direct WhatsApp Scheduling
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                No complicated app logins or registration walls. Easily check slot availability,
                inquire about treatment options, or reserve a chair directly over WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-[#0C0D0E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                <span>Salon Ambiance</span>
                <span aria-hidden="true">·</span>
                <span>Visual Highlights</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
                Inside the Salon Experience
              </h2>
            </div>
            <a
              href="/gallery"
              onClick={(e) => handleNav('/gallery', e)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <GalleryGrid limit={4} />
        </div>
      </section>

      {/* Location Section */}
      <LocationSection />

      {/* Final Conversion CTA */}
      <section className="py-20 bg-gradient-to-b from-[#0E1013] to-[#08090A] border-t border-[#D4AF37]/20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <span>ART OF SCISSOR Unisex Salon</span>
            <span aria-hidden="true">·</span>
            <span>Burari, New Delhi</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Ready for Your Next Salon Experience?
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto font-light leading-relaxed">
            Whether refreshing your haircut, treating your hair to an intensive spa treatment, or
            pampering your skin, we are ready to assist you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm rounded-lg transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Book on WhatsApp</span>
            </a>

            <a
              href={`tel:${config.primaryPhoneRaw}`}
              className="px-6 py-3 bg-[#181B20] hover:bg-[#22262E] text-white border border-[#D4AF37]/40 hover:border-[#D4AF37] font-semibold text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call the Salon ({config.primaryPhone})</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
