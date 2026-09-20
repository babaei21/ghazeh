import React from 'react';
import { X, MapPin, Calendar, Heart, AlertCircle } from 'lucide-react';
import { GazaPhoto } from '../types';

interface PhotoModalProps {
  photo: GazaPhoto | null;
  onClose: () => void;
  onDonateForPhoto: (photo: GazaPhoto) => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  photo,
  onClose,
  onDonateForPhoto
}) => {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="photo-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-950/70 hover:bg-stone-950 text-stone-300 hover:text-white border border-stone-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-stone-950 flex items-center justify-center overflow-hidden rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl min-h-[280px] sm:min-h-[380px]">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover max-h-[500px]"
            />
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-sm text-xs text-rose-300 border border-stone-850">
              {photo.categoryLabel}
            </div>
          </div>

          {/* Details */}
          <div className="p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-stone-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  {photo.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  Field Report {photo.date}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-stone-100 leading-snug">
                {photo.title}
              </h2>

              <p className="text-stone-300 text-sm leading-relaxed">
                {photo.description}
              </p>

              {/* Urgent Needs List */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-stone-300 flex items-center gap-1.5 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  Urgent Priority Supplies Required:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {photo.urgentNeeds.map((need, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-200 border border-stone-700 text-xs"
                    >
                      {need}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Donation Action for this photo */}
            <div className="pt-4 border-t border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>Estimated Target Relief Budget:</span>
                <span className="font-mono text-emerald-400 font-bold text-sm">
                  ${photo.suggestedBudgetUSD} USDT
                </span>
              </div>

              <button
                id="modal-donate-photo-btn"
                onClick={() => {
                  onDonateForPhoto(photo);
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Allocate USDT to Support This Need (${photo.suggestedBudgetUSD} USDT)</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
