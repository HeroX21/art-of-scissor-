import React from 'react';
import { SalonPackage, getPackageWhatsAppUrl } from '../config/salonConfig';
import { useSalon } from '../context/SalonContext';
import { Check, MessageSquare, Calendar, Clock } from 'lucide-react';

interface PackageCardProps {
  pkg: SalonPackage;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const { config, openAppointmentModal } = useSalon();
  const waUrl = getPackageWhatsAppUrl(pkg.name);

  return (
    <div className="bg-[#141619] border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 group hover:-translate-y-0.5 shadow-lg">
      <div>
        {/* Kicker & Draft Tag */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
          <span className="text-[#D4AF37] font-medium tracking-wide uppercase text-[11px]">
            {pkg.tag || 'Special Package'}
          </span>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            <span>{pkg.estimatedDuration}</span>
          </div>
        </div>

        {/* Package Title */}
        <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">
          {pkg.name}
        </h3>

        {/* Optional Price if owner has toggled price visibility */}
        {config.showPricesPublicly && pkg.price && (
          <div className="mt-2 text-xl font-mono font-bold text-[#D4AF37]">
            ₹{pkg.price.toLocaleString('en-IN')}
          </div>
        )}

        {/* Package Description */}
        <p className="text-xs text-neutral-400 mt-2 font-light leading-relaxed">
          {pkg.description}
        </p>

        {/* Included Services Checklist */}
        <div className="mt-5 pt-4 border-t border-white/5 space-y-2.5">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
            Included Services:
          </span>
          <ul className="space-y-2">
            {pkg.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                <div className="w-4 h-4 rounded-full bg-[#1C1F26] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-[#D4AF37]" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
        <button
          onClick={() => openAppointmentModal(pkg.name)}
          className="flex-1 py-2.5 px-3 bg-[#D4AF37] hover:bg-[#dfbe58] text-black font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Inquiry</span>
        </button>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors flex items-center justify-center"
          title={`Inquire about ${pkg.name} on WhatsApp`}
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
        </a>
      </div>
    </div>
  );
};
