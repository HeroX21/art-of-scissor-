import React, { useState, useEffect } from 'react';
import { useSalon } from '../context/SalonContext';
import { Scissors, Menu, X, Phone, MessageSquare } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { config, activeRoute, navigate, openAppointmentModal } = useSalon();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: "Men's", href: '/mens-salon' },
    { label: "Women's", href: '/womens-salon' },
    { label: 'Packages', href: '/special-packages' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Announcement Bar */}
      <div className="bg-[#111317] border-b border-[#D4AF37]/20 py-1.5 px-4 text-xs text-neutral-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <p className="truncate font-medium text-neutral-300">
            <span className="text-[#D4AF37] font-semibold">{config.announcement}</span>
            <span className="hidden sm:inline mx-2 text-neutral-600">·</span>
            <span className="hidden sm:inline text-neutral-400">{config.announcementSub}</span>
          </p>
          <div className="flex items-center gap-4 shrink-0 text-neutral-400">
            <a
              href={`tel:${config.primaryPhoneRaw}`}
              className="inline-flex items-center gap-1 hover:text-[#D4AF37] transition-colors whitespace-nowrap"
              title="Call primary line"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              <span className="hidden md:inline font-mono text-[11px]">{config.primaryPhone}</span>
              <span className="md:hidden font-mono text-[11px]">Call</span>
            </a>
            <a
              href={`https://wa.me/${config.primaryPhoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#25D366] transition-colors whitespace-nowrap"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3 h-3 text-[#25D366]" />
              <span className="text-[11px]">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar conforming to Top Bar Contract */}
      <div
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#0c0d0e]/95 backdrop-blur-md shadow-xl border-b border-white/10'
            : 'bg-[#0c0d0e] border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-8">
            {/* Zone 1: Brand Wordmark (Single text element with subtle scissors icon) */}
            <a
              href="/"
              onClick={(e) => handleLinkClick('/', e)}
              className="flex items-center gap-2 group whitespace-nowrap shrink-0"
              aria-label="ART OF SCISSOR Unisex Salon Home"
            >
              <div className="w-9 h-9 rounded-lg bg-[#141619] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] transition-colors">
                <Scissors className="w-4 h-4 transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-serif font-bold tracking-wider text-[#F4F4F0] group-hover:text-[#D4AF37] transition-colors">
                  ART OF SCISSOR
                </span>
                <span className="text-[9px] font-sans tracking-widest text-[#D4AF37] font-semibold uppercase -mt-1">
                  UNISEX SALON
                </span>
              </div>
            </a>

            {/* Zone 2: 4-5 single-line clean text navigation links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-neutral-300">
              {navLinks.map((link) => {
                const isActive = activeRoute === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                      isActive
                        ? 'text-[#D4AF37] font-semibold'
                        : 'hover:text-[#F4F4F0] text-neutral-300'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => openAppointmentModal()}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#dfbe58] rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer active:scale-98"
              >
                Book Appointment
              </button>

              {/* Mobile menu hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#121417] border-b border-white/10 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = activeRoute === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.href, e)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#1b1e24] text-[#D4AF37] font-semibold'
                      : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAppointmentModal();
                }}
                className="w-full py-2.5 text-xs font-semibold text-black bg-[#D4AF37] hover:bg-[#dfbe58] rounded-lg text-center transition-colors shadow"
              >
                Book Appointment
              </button>
              <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 px-1">
                <span>Burari, New Delhi</span>
                <a href={`tel:${config.primaryPhoneRaw}`} className="text-[#D4AF37]">
                  {config.primaryPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
