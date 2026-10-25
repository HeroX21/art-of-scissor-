import React, { useState } from 'react';
import { ServiceItem, SALON_SERVICES, getServiceWhatsAppUrl } from '../config/salonConfig';
import { useSalon } from '../context/SalonContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';
import { PackageCard } from '../components/PackageCard';
import { Clock, CheckCircle2, MessageSquare, Calendar, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

interface ServiceDetailPageProps {
  service: ServiceItem;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service }) => {
  const { mensPackages, womensPackages, navigate, openAppointmentModal } = useSalon();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [imageFailed, setImageFailed] = useState(false);

  const waUrl = getServiceWhatsAppUrl(service.title);

  // Find relevant packages that include this service
  const serviceKeyword = service.title.toLowerCase().split(' ')[0];
  const relatedPackages = [
    ...mensPackages.filter((p) => !p.isDraft),
    ...womensPackages.filter((p) => !p.isDraft)
  ]
    .filter((pkg) =>
      pkg.items.some(
        (item) =>
          item.toLowerCase().includes(serviceKeyword) ||
          service.title.toLowerCase().includes(item.toLowerCase())
      )
    )
    .slice(0, 3);

  // Other services for contextual internal links
  const otherServices = SALON_SERVICES.filter((s) => s.id !== service.id).slice(0, 4);

  return (
    <>
      <SeoHead
        title={`${service.title} in Burari, Delhi | ART OF SCISSOR Unisex Salon`}
        description={`${service.shortDescription} Located near Rani Public School, Burari. WhatsApp or call to inquire about timings.`}
        canonicalPath={`/${service.slug}`}
        schemaType="Service"
        serviceData={{
          name: service.title,
          description: service.shortDescription
        }}
      />

      <div className="bg-[#0C0D0E] min-h-screen">
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/#services' },
            { label: service.title }
          ]}
        />

        {/* Hero Section */}
        <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                <span>{service.category} Treatment</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{service.approxTime}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>Burari, Delhi</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {service.fullDescription}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openAppointmentModal(service.title)}
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-[#dfbe58] text-black font-semibold text-xs tracking-wide uppercase rounded-lg transition-colors flex items-center gap-2 shadow cursor-pointer active:scale-98"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Service</span>
                </button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-neutral-900 border border-white/10 hover:border-[#D4AF37] text-white font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Media (5 cols) */}
            <div className="lg:col-span-5 bg-[#141619] border border-white/10 rounded-2xl overflow-hidden aspect-[4/3] shadow-xl relative">
              {!imageFailed ? (
                <img
                  src={service.image}
                  alt={`${service.title} at ART OF SCISSOR Unisex Salon`}
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-neutral-900 text-center">
                  <Sparkles className="w-10 h-10 text-[#D4AF37] mb-2" />
                  <span className="text-base font-serif font-bold text-white">{service.title}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-[#0E1013] border-t border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center max-w-xl mx-auto">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                Care Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Treatment Highlights & Benefits
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-[#141619] border border-white/10 rounded-xl p-4 flex items-start gap-3.5"
                >
                  <div className="w-6 h-6 rounded-full bg-[#1C1F26] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Relevant Packages Cross-Sell */}
        {relatedPackages.length > 0 && (
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  Bundled Savings
                </span>
                <h2 className="text-2xl font-serif font-bold text-white mt-0.5">
                  Packages Featuring {service.title}
                </h2>
              </div>
              <button
                onClick={() => navigate('/special-packages')}
                className="text-xs font-semibold text-[#D4AF37] hover:underline hidden sm:inline"
              >
                View all packages
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </section>
        )}

        {/* FAQs Section */}
        {service.faqs.length > 0 && (
          <section className="py-16 bg-[#0E1013] border-t border-b border-white/5">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  Client Information
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-[#141619] border border-white/10 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm font-semibold text-white">{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#D4AF37] transition-transform duration-200 shrink-0 ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-neutral-400 font-light leading-relaxed border-t border-white/5 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Related Services Contextual Links */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Explore More
            </span>
            <h2 className="text-2xl font-serif font-bold text-white mt-1">
              Related Grooming & Beauty Services
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((item) => (
              <a
                key={item.id}
                href={`/${item.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${item.slug}`);
                }}
                className="p-4 bg-[#141619] border border-white/10 hover:border-[#D4AF37]/50 rounded-xl transition-colors block group"
              >
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold block">
                  {item.category}
                </span>
                <h4 className="text-sm font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors mt-1">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{item.shortDescription}</p>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-[#D4AF37]">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
