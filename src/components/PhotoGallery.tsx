import React, { useState } from 'react';
import { GAZA_PHOTOS } from '../data/photos';
import { GazaPhoto, PhotoCategory } from '../types';
import { PhotoModal } from './PhotoModal';
import { Eye, Heart, MapPin, Layers } from 'lucide-react';

interface PhotoGalleryProps {
  onDonateForPhoto: (photo: GazaPhoto) => void;
}

const CATEGORIES: { id: PhotoCategory; label: string }[] = [
  { id: 'all', label: 'All Documentaries' },
  { id: 'rubble', label: 'Among the Rubble' },
  { id: 'food_water', label: 'Food & Water Crisis' },
  { id: 'medical', label: 'Trauma & Medical Care' },
  { id: 'shelter', label: 'Tents & Displacement' },
  { id: 'education', label: 'Hope & Education' },
];

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onDonateForPhoto }) => {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GazaPhoto | null>(null);

  const filteredPhotos = activeCategory === 'all'
    ? GAZA_PHOTOS
    : GAZA_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <section id="gaza-photo-gallery" className="py-16 bg-stone-950 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-xs font-semibold text-rose-400 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Gaza Field Documentation</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
              Children Amid the Rubble & Scarcity
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl">
              Authentic photojournalistic records capturing the daily survival of children enduring displacement, severe dehydration, and trauma. Click any report to view required supplies and allocate targeted USDT aid.
            </p>
          </div>

          <div className="text-right text-xs text-stone-400 font-mono">
            <span>Archive: {filteredPhotos.length} Documented Field Reports</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
                    : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-850 border border-stone-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              id={`photo-card-${photo.id}`}
              className="group rounded-2xl bg-stone-900/90 border border-stone-800/90 overflow-hidden hover:border-stone-700 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-lg"
            >
              {/* Image with overlay badge */}
              <div 
                className="relative aspect-[4/3] bg-stone-950 overflow-hidden cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Category badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-sm text-[11px] font-medium text-stone-200 border border-stone-800">
                  {photo.categoryLabel}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-stone-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold backdrop-blur-[2px]">
                  <Eye className="w-4 h-4 text-rose-400" />
                  <span>View Full Report & Needs</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>

                  <h3 
                    onClick={() => setSelectedPhoto(photo)}
                    className="font-bold text-stone-100 text-sm sm:text-base line-clamp-2 hover:text-rose-400 cursor-pointer transition-colors"
                  >
                    {photo.title}
                  </h3>

                  <p className="text-stone-400 text-xs line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>
                </div>

                {/* Needs Preview & CTA */}
                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-emerald-400 font-mono font-semibold">
                    Target: ~${photo.suggestedBudgetUSD} USDT
                  </div>

                  <button
                    id={`photo-card-donate-${photo.id}`}
                    onClick={() => onDonateForPhoto(photo)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Support</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onDonateForPhoto={onDonateForPhoto}
        />

      </div>
    </section>
  );
};
