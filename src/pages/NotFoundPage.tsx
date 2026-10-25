import React from 'react';
import { useSalon } from '../context/SalonContext';
import { SeoHead } from '../components/SeoHead';
import { Scissors, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useSalon();

  return (
    <>
      <SeoHead
        title="Page Not Found | ART OF SCISSOR Unisex Salon"
        description="The requested page could not be found on ART OF SCISSOR Unisex Salon."
      />

      <div className="bg-[#0C0D0E] min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#141619] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto">
            <Scissors className="w-8 h-8 transform -rotate-45" />
          </div>

          <div>
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
              404 — PAGE NOT FOUND
            </span>
            <h1 className="text-3xl font-serif font-bold text-white mt-2">
              Looking for a Fresh Cut?
            </h1>
            <p className="text-xs text-neutral-400 mt-2 font-light leading-relaxed">
              The page you requested might have been moved or does not exist. Please return to our
              salon homepage or browse our service menu.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#dfbe58] text-black font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </button>
            <button
              onClick={() => navigate('/special-packages')}
              className="px-5 py-2.5 bg-neutral-900 border border-white/10 hover:border-white/30 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Browse Packages
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
