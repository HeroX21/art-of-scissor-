import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';
import { PackageCard } from '../components/PackageCard';
import { Search, Sparkles, MessageSquare } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../config/salonConfig';

export const SpecialPackagesPage: React.FC = () => {
  const { config, mensPackages, womensPackages, openAppointmentModal } = useSalon();
  const [activeTab, setActiveTab] = useState<'all' | 'men' | 'women'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const primaryWaUrl = getGeneralWhatsAppUrl();

  const allPublished = [
    ...mensPackages.filter((p) => !p.isDraft),
    ...womensPackages.filter((p) => !p.isDraft)
  ];

  const filteredPackages = allPublished.filter((pkg) => {
    const matchesTab =
      activeTab === 'all' ? true : activeTab === 'men' ? pkg.target === 'men' : pkg.target === 'women';
    const matchesSearch =
      searchQuery.trim() === '' ||
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.items.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <>
      <SeoHead
        title="Special Salon Packages in Burari | ART OF SCISSOR Unisex Salon"
        description="Explore complete grooming and beauty packages for men and women at ART OF SCISSOR in Burari, Delhi. Haircuts, hair spa, facials, and hair colour bundled for value."
        canonicalPath="/special-packages"
      />

      <div className="bg-[#0C0D0E] min-h-screen">
        <Breadcrumbs items={[{ label: 'Special Packages' }]} />

        {/* Page Hero */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
            <span>Value Bundles</span>
            <span aria-hidden="true">·</span>
            <span>Unisex Packages</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Special Grooming & Beauty Packages
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mt-4 font-light leading-relaxed">
            Choose from comprehensive package combinations designed to bundle haircuts, head
            washes, hair spas, facial therapies, and D-Tan treatments into a single seamless
            visit.
          </p>
        </section>

        {/* Controls Toolbar: Tab buttons + Search */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#141619] border border-white/10 p-3 rounded-2xl">
            {/* Interactive Segmented Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#0C0D0E] rounded-xl w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                All Packages ({allPublished.length})
              </button>
              <button
                onClick={() => setActiveTab('men')}
                className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'men'
                    ? 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Men&apos;s ({mensPackages.filter((p) => !p.isDraft).length})
              </button>
              <button
                onClick={() => setActiveTab('women')}
                className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'women'
                    ? 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Women&apos;s ({womensPackages.filter((p) => !p.isDraft).length})
              </button>
            </div>

            {/* Treatment Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search e.g. Facial, Spa, INOA..."
                className="w-full pl-9 pr-3 py-2 bg-[#0C0D0E] border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#141619] border border-white/10 rounded-2xl max-w-md mx-auto p-8">
              <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h3 className="text-base font-serif font-bold text-white">No matching packages</h3>
              <p className="text-xs text-neutral-400 mt-1 mb-4">
                We couldn&apos;t find any package matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-neutral-800 text-xs font-semibold text-neutral-200 rounded-lg"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
};
