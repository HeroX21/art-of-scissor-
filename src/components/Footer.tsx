import React from 'react';
import { useSalon } from '../context/SalonContext';
import { Scissors, Phone, MessageSquare, Mail, MapPin, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, navigate, openOwnerModal, openAppointmentModal } = useSalon();
  const currentYear = new Date().getFullYear();

  const handleNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer className="bg-[#08090A] border-t border-white/10 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Address (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => handleNav('/', e)}
              className="inline-flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#141619] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Scissors className="w-4 h-4 transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  ART OF SCISSOR
                </span>
                <span className="text-[9px] font-sans tracking-widest text-[#D4AF37] font-semibold uppercase -mt-1">
                  UNISEX SALON
                </span>
              </div>
            </a>

            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              Premium unisex salon providing precision haircuts, hair spa therapy, ammonia-free
              hair colouring, facials, and curated grooming packages in Burari, New Delhi.
            </p>

            {/* Address */}
            <div className="flex items-start gap-2.5 pt-2 text-neutral-300">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                Ground Floor, Plot No. 7, Street No. 7, near Rani Public School, A-2 Block,
                Virendar Nagar, Block B, West Sant Nagar, Burari, New Delhi 110084, India.
              </p>
            </div>

            {/* Contact quick links */}
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Primary: </span>
                <a
                  href={`tel:${config.primaryPhoneRaw}`}
                  className="font-mono text-neutral-200 hover:text-[#D4AF37]"
                >
                  {config.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>Secondary: </span>
                <a
                  href={`tel:${config.secondaryPhoneRaw}`}
                  className="font-mono text-neutral-300 hover:text-white"
                >
                  {config.secondaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Email: </span>
                <a
                  href={`mailto:${config.email}`}
                  className="text-neutral-300 hover:text-white"
                >
                  {config.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" onClick={(e) => handleNav('/', e)} className="hover:text-[#D4AF37] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleNav('/about', e)} className="hover:text-[#D4AF37] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/mens-salon" onClick={(e) => handleNav('/mens-salon', e)} className="hover:text-[#D4AF37] transition-colors">
                  Men&apos;s Salon
                </a>
              </li>
              <li>
                <a href="/womens-salon" onClick={(e) => handleNav('/womens-salon', e)} className="hover:text-[#D4AF37] transition-colors">
                  Women&apos;s Salon
                </a>
              </li>
              <li>
                <a href="/special-packages" onClick={(e) => handleNav('/special-packages', e)} className="hover:text-[#D4AF37] transition-colors">
                  Special Packages
                </a>
              </li>
              <li>
                <a href="/gallery" onClick={(e) => handleNav('/gallery', e)} className="hover:text-[#D4AF37] transition-colors">
                  Salon Gallery
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleNav('/contact', e)} className="hover:text-[#D4AF37] transition-colors">
                  Contact & Location
                </a>
              </li>
              <li>
                <button
                  onClick={() => openAppointmentModal()}
                  className="text-[#D4AF37] hover:underline cursor-pointer"
                >
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Services Menu */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Popular Services
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/haircut-and-styling"
                  onClick={(e) => handleNav('/haircut-and-styling', e)}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Haircuts & Styling
                </a>
              </li>
              <li>
                <a
                  href="/hair-spa"
                  onClick={(e) => handleNav('/hair-spa', e)}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Hair Spa (Matrix & L&apos;Oréal)
                </a>
              </li>
              <li>
                <a
                  href="/hair-colour"
                  onClick={(e) => handleNav('/hair-colour', e)}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Hair Colour Services
                </a>
              </li>
              <li>
                <a
                  href="/facial-and-skincare"
                  onClick={(e) => handleNav('/facial-and-skincare', e)}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Facials (VLCC, Lotus, Cheryl&apos;s, O3+)
                </a>
              </li>
              <li>
                <a
                  href="/fruit-clean-up"
                  onClick={(e) => handleNav('/fruit-clean-up', e)}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Fruit Clean-Up
                </a>
              </li>
              <li>
                <a
                  href="/d-tan-treatments"
                  onClick={(e) => handleNav('/d-tan-treatments', e)}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  D-Tan Pack & Treatments
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Local SEO & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Local Service Areas
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Proudly welcoming clients across Burari, West Sant Nagar, Virendar Nagar, A-2 Block,
              and surrounding North Delhi neighbourhoods.
            </p>
            <div className="pt-2 space-y-1">
              <a
                href="/privacy-policy"
                onClick={(e) => handleNav('/privacy-policy', e)}
                className="block hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-and-conditions"
                onClick={(e) => handleNav('/terms-and-conditions', e)}
                className="block hover:text-white transition-colors"
              >
                Terms and Conditions
              </a>
            </div>

            {/* Owner Portal Trigger */}
            <div className="pt-3 border-t border-white/5">
              <button
                onClick={openOwnerModal}
                className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500 hover:text-[#D4AF37] transition-colors cursor-pointer"
                title="Salon Owner Login"
              >
                <Lock className="w-3 h-3" />
                <span>Owner Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} ART OF SCISSOR Unisex Salon. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Ground Floor, Plot No. 7, St. No. 7, Burari, Delhi</span>
            <span aria-hidden="true">·</span>
            <a
              href={`https://wa.me/${config.primaryPhoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline inline-flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
