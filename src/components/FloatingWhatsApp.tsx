import React from 'react';
import { useSalon } from '../context/SalonContext';
import { MessageSquare } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../config/salonConfig';

export const FloatingWhatsApp: React.FC = () => {
  const { config } = useSalon();
  const url = getGeneralWhatsAppUrl();

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-30">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with ART OF SCISSOR Unisex Salon on WhatsApp"
        className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#0C0D0E]"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-xs font-semibold tracking-wide whitespace-nowrap hidden sm:inline">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};
