import React, { useState } from 'react';
import { Eye, Scissors } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Interior' | 'Hair' | 'Skin' | 'Craft';
  image: string;
  alt: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Styling Stations & Ambiance',
    category: 'Interior',
    image: '/src/assets/images/salon_interior_luxury_1792936763722.jpg',
    alt: 'ART OF SCISSOR salon interior and styling stations',
    caption: 'Modern illuminated mirrors, comfortable styling chairs, and relaxing salon ambiance.'
  },
  {
    id: 'g-2',
    title: 'Precision Scissor Haircut',
    category: 'Hair',
    image: '/src/assets/images/hair_styling_craft_1792936765485.jpg',
    alt: 'Professional scissor haircutting and texturizing',
    caption: 'Clean sectioning, scissor work, and personalized graduation for everyday manageability.'
  },
  {
    id: 'g-3',
    title: 'Revitalizing Hair Spa Basin',
    category: 'Hair',
    image: '/src/assets/images/hair_spa_treatment_1792936766012.jpg',
    alt: 'Hair spa scalp nourishment and wash basin therapy',
    caption: 'Deep cream scalp nourishment and moisture replenishment to counter urban dust.'
  },
  {
    id: 'g-4',
    title: 'Facial Clean-Up & Skin Radiance',
    category: 'Skin',
    image: '/src/assets/images/facial_skincare_treatment_1792936765139.jpg',
    alt: 'Facial skincare treatment and botanical mask',
    caption: 'Multi-step skin clean-up and botanical packs designed to restore natural glow.'
  }
];

export const GalleryGrid: React.FC<{ limit?: number }> = ({ limit }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Interior' | 'Hair' | 'Skin'>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const displayedItems = GALLERY_ITEMS.filter(
    (item) => activeFilter === 'All' || item.category === activeFilter
  ).slice(0, limit || GALLERY_ITEMS.length);

  return (
    <div className="space-y-6">
      {/* Interactive Filter Tabs (Segmented controls) */}
      <div className="flex items-center justify-center gap-1.5 p-1 bg-[#141619] border border-white/10 rounded-xl w-fit mx-auto">
        {(['All', 'Interior', 'Hair', 'Skin'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeFilter === cat
                ? 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveLightbox(item)}
            className="group relative bg-[#141619] border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:border-[#D4AF37]/50 transition-all duration-200"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-900">
              <img
                src={item.image}
                alt={item.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Overlay Caption on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">
                {item.category}
              </span>
              <h4 className="text-sm font-serif font-bold text-white">{item.title}</h4>
              <p className="text-[11px] text-neutral-300 mt-1 line-clamp-2">{item.caption}</p>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-[#D4AF37]">
                <Eye className="w-3.5 h-3.5" />
                <span>Click to expand</span>
              </div>
            </div>
            {/* Base Label */}
            <div className="p-3 bg-[#111317] border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-200">{item.title}</span>
              <span className="text-[10px] text-neutral-500">{item.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Notice regarding sample photographs */}
      <div className="text-center">
        <p className="text-[11px] text-neutral-500 italic max-w-xl mx-auto">
          Gallery displays representative photographs of salon aesthetic, styling techniques, and
          treatments. Walk in near Rani Public School, Burari to experience our service in person.
        </p>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#141619] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.alt}
                className="w-full h-full max-h-[70vh] object-contain"
              />
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider block">
                  {activeLightbox.category}
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-0.5">
                  {activeLightbox.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">{activeLightbox.caption}</p>
              </div>
              <button
                onClick={() => setActiveLightbox(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
