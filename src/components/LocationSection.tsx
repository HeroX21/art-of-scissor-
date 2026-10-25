import React from 'react';
import { useSalon } from '../context/SalonContext';
import { MapPin, Navigation, Phone, MessageSquare, Clock } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { config } = useSalon();

  const encodedAddress = encodeURIComponent(config.address.fullFormatted);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const embedMapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="py-16 bg-[#0E1013] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
            <span>Find Our Salon</span>
            <span aria-hidden="true">·</span>
            <span>Burari, New Delhi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
            Location & Directions
          </h2>
          <p className="text-sm text-neutral-400 mt-3 font-light">
            Conveniently located near Rani Public School in West Sant Nagar, Burari. Easily
            accessible from Virendar Nagar and North Delhi localities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Address & Contact Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#141619] border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="space-y-6">
              {/* Full Address Block */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#1C1F26] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Physical Address
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                    Ground Floor, Plot No. 7, Street No. 7,
                    <br />
                    <span className="text-[#D4AF37] font-medium">near Rani Public School</span>,
                    <br />
                    A-2 Block, Virendar Nagar, Block B,
                    <br />
                    West Sant Nagar, Burari,
                    <br />
                    New Delhi, Delhi 110084, India
                  </p>
                </div>
              </div>

              {/* Service Areas */}
              <div className="border-t border-white/5 pt-4">
                <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                  Serving Localities
                </h4>
                <div className="flex flex-wrap gap-2 text-xs text-neutral-300">
                  {config.primaryArea.map((area) => (
                    <span
                      key={area}
                      className="px-2.5 py-1 bg-[#1C1F26] border border-white/10 rounded-md"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Phone Contacts */}
              <div className="border-t border-white/5 pt-4 space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-neutral-400">Primary / WhatsApp:</span>
                  <a
                    href={`tel:${config.primaryPhoneRaw}`}
                    className="font-mono text-[#D4AF37] hover:underline"
                  >
                    {config.primaryPhone}
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-neutral-400">Secondary Line:</span>
                  <a
                    href={`tel:${config.secondaryPhoneRaw}`}
                    className="font-mono text-neutral-300 hover:text-white"
                  >
                    {config.secondaryPhone}
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-neutral-400">Email:</span>
                  <a
                    href={`mailto:${config.email}`}
                    className="text-neutral-300 hover:text-white truncate max-w-[200px]"
                  >
                    {config.email}
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#D4AF37] hover:bg-[#dfbe58] text-black font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 text-center shadow cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions in Google Maps</span>
              </a>

              <a
                href={`https://wa.me/${config.primaryPhoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 text-center"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Map Embed (7 cols) */}
          <div className="lg:col-span-7 bg-[#141619] border border-white/10 rounded-2xl overflow-hidden min-h-[360px] relative shadow-lg">
            <iframe
              title="ART OF SCISSOR Unisex Salon Location Map"
              src={embedMapUrl}
              className="w-full h-full min-h-[380px] border-0 filter grayscale-[25%] contrast-[110%] invert-[90%] hue-rotate-[180deg]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-[#0C0D0E]/90 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-lg text-xs text-neutral-200 shadow">
              <span className="font-semibold text-[#D4AF37]">ART OF SCISSOR</span> · Near Rani
              Public School, Burari
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
