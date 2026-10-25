import React, { useState } from 'react';
import { ServiceItem } from '../config/salonConfig';
import { useSalon } from '../context/SalonContext';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { navigate } = useSalon();
  const [imageFailed, setImageFailed] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/${service.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-[#141619] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
    >
      <div>
        {/* Card Image Container */}
        <div className="relative w-full h-48 bg-[#181B20] overflow-hidden">
          {!imageFailed ? (
            <img
              src={service.image}
              alt={`${service.title} at ART OF SCISSOR Unisex Salon Burari`}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#1A1D24] to-[#111317] text-neutral-400">
              <Sparkles className="w-8 h-8 text-[#D4AF37] mb-2" />
              <span className="text-xs text-neutral-300 font-serif">{service.title}</span>
            </div>
          )}
          {/* Subtle Scrim for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141619] via-transparent to-transparent opacity-80" />

          {/* Category Tag */}
          <div className="absolute top-3 left-3 bg-[#0C0D0E]/80 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37]">
            {service.category}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1.5 font-mono">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            <span>{service.approxTime}</span>
          </div>

          <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
            {service.title}
          </h3>

          <p className="text-xs text-neutral-400 mt-2 line-clamp-3 font-light leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </div>

      {/* Card Footer Link */}
      <div className="px-5 pb-5 pt-2 flex items-center text-xs font-semibold text-[#D4AF37] group-hover:text-white transition-colors gap-1.5">
        <span>View Treatment Details</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
