import React from 'react';
import { Star, ExternalLink, CheckCircle, MessageSquare } from 'lucide-react';
import { CLINIC_INFO, AUTHENTIC_REVIEWS } from '../data/clinicData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 relative bg-[#071B36] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Rating Metric Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#00C9D6] mb-2 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-[#00C9D6]" />
              <span>Verified Google Business Profile</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Patient Experiences & Google Reviews
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Read authentic feedback from patients who visited BODY REBOOT CLINICS for spine care, sports rehabilitation, and pain management in Kolar Road, Bhopal.
            </p>
          </div>

          {/* Google Score Banner */}
          <div className="p-4 rounded-2xl glass-panel border border-[#00C9D6]/30 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="text-center pr-4 border-r border-white/10">
              <div className="text-3xl font-extrabold text-white font-mono tabular-nums leading-none">
                4.6
              </div>
              <div className="flex items-center gap-0.5 mt-1 justify-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-amber-400' : 'fill-amber-400/50'}`} />
                ))}
              </div>
            </div>
            <div className="text-left text-xs">
              <div className="font-bold text-white">Google Rating</div>
              <div className="text-slate-400">54 Verified Reviews</div>
              <div className="text-[10px] text-[#00C9D6] mt-0.5">Kolar Road, Bhopal</div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUTHENTIC_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-[#00C9D6]/40 transition-all text-left flex flex-col justify-between shadow-md"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(rev.rating) ? 'fill-amber-400' : 'fill-amber-400/40'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-[#00C9D6] flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {rev.verifiedSource}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">
                    {rev.author}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {rev.tag}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews CTA Button (Direct Google Maps profile link as specified) */}
        <div className="mt-12 text-center">
          <a
            href={CLINIC_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-sm font-bold text-white hover:text-[#00C9D6] transition-all shadow-md group"
          >
            <span>Read All Google Reviews on Google Maps</span>
            <ExternalLink className="w-4 h-4 text-[#00C9D6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <p className="mt-2 text-xs text-slate-400">
            Reviews sourced directly from official Google Business Profile. Rating count subject to real-time verification.
          </p>
        </div>

      </div>
    </section>
  );
};
