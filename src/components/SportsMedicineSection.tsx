import React from 'react';
import { Activity, Gauge, TrendingUp, ShieldCheck, ArrowRight, Calendar } from 'lucide-react';
import { CLINIC_IMAGES } from '../assets/clinicImages';

interface SportsMedicineSectionProps {
  onOpenBooking: () => void;
}

export const SportsMedicineSection: React.FC<SportsMedicineSectionProps> = ({ onOpenBooking }) => {
  const protocols = [
    {
      title: 'Biomechanical Movement Screening',
      metric: 'Phase 1',
      description: 'High-speed video assessment evaluating joint angles, valgus knee collapse, asymmetric weight shift, and kinetic chain energy leaks.',
      focus: 'ACL, Meniscus & Ankle stability',
    },
    {
      title: 'Targeted Sports Rehabilitation',
      metric: 'Phase 2',
      description: 'Controlled progressive eccentric loading for tendinopathies, muscle tears, and ligament sprains with continuous symptom monitoring.',
      focus: 'Rotator cuff, Hamstrings & Achilles',
    },
    {
      title: 'Return-to-Play Benchmarking',
      metric: 'Phase 3',
      description: 'Objective limb symmetry index (LSI) testing, triple hop testing, and sport-specific change-of-direction readiness evaluations.',
      focus: 'Athletic agility & deceleration control',
    },
    {
      title: 'Kinetic Conditioning & Prehab',
      metric: 'Phase 4',
      description: 'Movement efficiency training and sports-specific functional conditioning to build joint resilience against repeat mechanical overload.',
      focus: 'Long-term joint health & performance readiness',
    },
  ];

  return (
    <section id="sports-medicine" className="py-20 relative bg-[#051429] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#00C9D6] mb-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Sports Medicine & Athletic Rehabilitation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Move Stronger. Perform Better.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            From recreational runners and gym athletes to competitive sports players in Bhopal, our sports medicine protocols bridge the gap between acute injury recovery and athletic confidence.
          </p>
        </div>

        {/* Feature Spotlight with Generated Sports Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
            <img
              src={CLINIC_IMAGES.sports}
              alt="Sports Medicine & Biomechanical Assessment Session at Body Reboot Clinics"
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#051429] via-[#051429]/40 to-transparent flex flex-col justify-end p-5 text-left">
              <span className="text-[11px] font-semibold text-[#00C9D6] uppercase tracking-wider">
                Clinical Movement Science
              </span>
              <h3 className="text-lg font-bold text-white font-heading">
                Objective Functional Movement Screening
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Precision tracking of joint symmetry, torque, and deceleration mechanics.
              </p>
            </div>
          </div>

          {/* 4 Phased Pathway Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {protocols.map((proto, idx) => (
              <div
                key={proto.title}
                className="p-5 rounded-xl glass-panel border border-white/10 hover:border-[#00C9D6]/40 transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#00C9D6]">
                      {proto.metric}
                    </span>
                    <span className="text-[10px] text-slate-400">Sports Protocol</span>
                  </div>
                  <h4 className="text-base font-bold text-white font-heading">
                    {proto.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {proto.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400">
                  <span className="text-slate-300 font-medium">Focus: </span>
                  {proto.focus}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsible Medical Disclaimer & Consultation Trigger */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#145DBA]/30 via-white/5 to-[#00C9D6]/20 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00C9D6]" />
              Individualized Athletic Evaluation
            </h4>
            <p className="text-xs text-slate-300 max-w-2xl">
              Recovery timelines vary based on individual tissue pathology and baseline fitness. Our physiotherapist provides realistic benchmarks and evidence-based return-to-sport protocols.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-xl bg-[#258AFF] hover:bg-[#145DBA] text-white text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Athletic Assessment</span>
          </button>
        </div>

      </div>
    </section>
  );
};
