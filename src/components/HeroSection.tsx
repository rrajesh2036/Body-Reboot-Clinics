import React from 'react';
import { Phone, Calendar, ArrowRight, Star, ShieldCheck, MapPin, Activity, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { ThreeAnatomyViewer } from './ThreeAnatomyViewer';
import { AnatomyJoint } from '../types';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onSelectJoint: (joint: AnatomyJoint | null) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onSelectJoint }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-6 pb-12">
      {/* Background radial gradient glow for futuristic sports medicine aesthetic */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#145DBA]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#00C9D6]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main 2-column Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Trust Proof, CTAs (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left z-10">
            
            {/* Trust Kicker: Unboxed Clean Text */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="font-semibold text-[#00C9D6] uppercase tracking-wider">
                Specialty Clinic · Kolar Road, Bhopal
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#00C9D6]" />
                Opposite to Khadim
              </span>
            </div>

            {/* Main Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold font-heading text-white tracking-tight leading-[1.12] [text-wrap:balance]">
              REBUILD YOUR BODY.{' '}
              <span className="bg-gradient-to-r from-[#258AFF] via-[#00C9D6] to-white bg-clip-text text-transparent">
                RECLAIM YOUR MOVEMENT.
              </span>
            </h1>

            {/* Supporting Headline */}
            <p className="text-lg sm:text-xl font-semibold text-[#00C9D6] [text-wrap:balance]">
              Advanced Physiotherapy, Sports Medicine & Rehabilitation in Bhopal.
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Move beyond pain with a personalized approach to physiotherapy, movement, rehabilitation and physical performance at Bhopal’s dedicated sports and musculoskeletal recovery centre.
            </p>

            {/* CTAs: 3 clear actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#145DBA] via-[#258AFF] to-[#00C9D6] hover:brightness-110 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>

              <a
                href={`tel:${CLINIC_INFO.rawPhone}`}
                className="px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#00C9D6]" />
                <span>Call Now</span>
              </a>

              <a
                href="#services"
                className="px-4 py-3.5 text-sm font-semibold text-slate-300 hover:text-[#00C9D6] transition-colors flex items-center gap-1.5"
              >
                <span>Explore Treatments</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Authentic Trust Strip */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <div className="text-base font-bold text-white font-mono tabular-nums leading-none">
                    4.6 / 5.0
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    54 Google Reviews
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#258AFF]/10 border border-[#258AFF]/20 flex items-center justify-center text-[#258AFF]">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-none">
                    Sports Medicine
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Kinetic & Agility
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-9 h-9 rounded-lg bg-[#00C9D6]/10 border border-[#00C9D6]/20 flex items-center justify-center text-[#00C9D6]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-none">
                    Pain Management
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Spine & Joint Care
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Human Anatomy Canvas (lg:col-span-6) */}
          <div className="lg:col-span-6 relative w-full h-[460px] sm:h-[540px] lg:h-[620px] rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex items-center justify-center">
            {/* 3D Anatomy Visualizer */}
            <ThreeAnatomyViewer onSelectJoint={onSelectJoint} />
          </div>

        </div>

        {/* 5 Publicly Visible Clinic Branding Pillars Row */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
          {CLINIC_INFO.storefrontPillars.map((pillar, i) => (
            <div
              key={pillar}
              className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#00C9D6]/40 transition-colors"
            >
              <div className="text-xs font-bold text-slate-200 tracking-wide">
                {pillar}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Verified Clinical Focus
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
