import React, { useState } from 'react';
import { GALLERY_ITEMS, GOOGLE_MAPS_PHOTO_LINKS, CLINIC_INFO } from '../data/clinicData';
import { GalleryPhoto } from '../types';
import { Camera, ExternalLink, MapPin, X, ZoomIn, Image as ImageIcon } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  return (
    <section id="gallery" className="py-20 relative bg-[#051429] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#00C9D6] mb-2 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5" />
              <span>Authentic Clinic Visuals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Clinic Gallery & Rehabilitation Facilities
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Take a visual tour of our modern physiotherapy centre, active rehabilitation studio, and treatment environment in Kolar Road, Bhopal.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            <span className="text-[#00C9D6] font-semibold">Mandakani Colony</span> · Opp. Khadim, Bhopal
          </div>
        </div>

        {/* Primary Clinic Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#00C9D6]/40 cursor-pointer transition-all duration-300 shadow-xl bg-black/20"
            >
              <div className="h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-[#071B36]/30 to-transparent flex flex-col justify-end p-4 text-left">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-[#00C9D6] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="p-1.5 rounded-lg bg-black/40 text-white/80 group-hover:text-white group-hover:bg-[#258AFF] transition-colors">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white font-heading mt-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Live Google Maps Photo Contributions Strip (Addressing the 11 user-specified Google Maps links) */}
        <div className="mt-14 p-6 rounded-2xl glass-panel border border-white/10 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#00C9D6]" />
                Official Google Maps Photo Links & Verification
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Direct access to authentic storefront, interior, and clinical equipment images contributed to our Google Business Profile:
              </p>
            </div>
            <a
              href={CLINIC_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#00C9D6] hover:text-white flex items-center gap-1 shrink-0"
            >
              <span>View Profile on Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {GOOGLE_MAPS_PHOTO_LINKS.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#00C9D6]/30 text-left transition-all group flex flex-col justify-between"
              >
                <span className="text-[10px] text-slate-400 font-mono">
                  Map View #{idx + 1}
                </span>
                <span className="text-xs font-medium text-slate-200 group-hover:text-[#00C9D6] transition-colors line-clamp-2 mt-1">
                  {link.label}
                </span>
                <div className="mt-2 text-[10px] text-[#258AFF] flex items-center gap-1">
                  <span>Open in Maps</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div className="relative max-w-4xl w-full bg-[#071B36] border border-[#00C9D6]/30 rounded-2xl overflow-hidden shadow-2xl text-left">
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[65vh] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="max-h-[65vh] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6">
                <div className="text-xs font-semibold text-[#00C9D6] uppercase tracking-wider mb-1">
                  {activePhoto.category}
                </div>
                <h3 className="text-xl font-bold text-white font-heading">
                  {activePhoto.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300">
                  {activePhoto.caption}
                </p>

                {activePhoto.mapsUrl && (
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00C9D6]" />
                      BODY REBOOT CLINICS, Kolar Road, Bhopal
                    </span>
                    <a
                      href={activePhoto.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#00C9D6] hover:text-white flex items-center gap-1"
                    >
                      <span>Verify on Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
