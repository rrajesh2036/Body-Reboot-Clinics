import React from 'react';
import { ShieldCheck, CheckCircle2, UserCheck, ArrowRight, Award, Compass, MapPin } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-[#071B36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#00C9D6] mb-2 flex items-center gap-1.5">
            <span>Specialty Physiotherapy & Sports Medicine</span>
            <span aria-hidden="true">·</span>
            <span>Kolar Road, Bhopal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight [text-wrap:balance]">
            More Than Physiotherapy. A Complete Approach to Movement.
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            BODY REBOOT CLINICS was established to shift rehabilitation away from passive modalities and temporary relief toward kinetic restoration, targeted biomechanics, and active therapeutic exercise.
          </p>
        </div>

        {/* 2-Column Editorial Grid: Visual Proof + Detailed Clinical Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Authentic Photography Grid */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group shadow-xl">
              <img
                src="/src/assets/images/clinic_storefront_kolar_1794160301451.jpg"
                alt="BODY REBOOT CLINICS Storefront in Mandakani Colony Kolar Road Bhopal"
                className="w-full h-72 sm:h-80 object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-[#071B36]/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[11px] font-semibold text-[#00C9D6] uppercase tracking-wider">
                  Storefront Signboard
                </span>
                <h3 className="text-base font-bold text-white font-heading">
                  BODY REBOOT CLINICS by Dr. Varun
                </h3>
                <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00C9D6] shrink-0" />
                  E-1, Mandakani Colony, Opposite to Khadim, Kolar Road
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden border border-white/10 group shadow-md">
                <img
                  src="/src/assets/images/clinic_interior_rehab_1794160302033.jpg"
                  alt="Rehabilitation interior at Body Reboot Clinics Bhopal"
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B36]/90 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[11px] font-medium text-white">Rehab Studio & Posture Grid</span>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-white/10 group shadow-md">
                <img
                  src="/src/assets/images/sports_medicine_session_1794160299516.jpg"
                  alt="Sports medicine biomechanics session"
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B36]/90 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[11px] font-medium text-white">Biomechanical Assessment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Core Philosophy & Doctor Profile */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* The 5 Visible Pillars */}
            <div className="space-y-3.5">
              <h3 className="text-lg font-bold text-white font-heading">
                Our 5 Clinical Pillars
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl glass-panel border border-white/10">
                  <div className="font-semibold text-sm text-[#00C9D6] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00C9D6]" />
                    Sports Medicine & Injury Recovery
                  </div>
                  <p className="text-xs text-slate-300 mt-1 pl-6 leading-relaxed">
                    Biomechanical analysis and structured return-to-sport protocols designed to rebuild athletic performance and reduce recurrence risk.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl glass-panel border border-white/10">
                  <div className="font-semibold text-sm text-[#258AFF] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#258AFF]" />
                    Interventional Pain Management
                  </div>
                  <p className="text-xs text-slate-300 mt-1 pl-6 leading-relaxed">
                    Non-invasive, targeted spinal de-loading, joint mobilizations, and myofascial release for acute and chronic pain.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl glass-panel border border-white/10">
                  <div className="font-semibold text-sm text-[#00C9D6] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00C9D6]" />
                    Fitness Fuel & Therapeutic Exercise
                  </div>
                  <p className="text-xs text-slate-300 mt-1 pl-6 leading-relaxed">
                    Evidence-based exercise prescription focusing on progressive neuromuscular re-education, mobility, and core resilience.
                  </p>
                </div>
              </div>
            </div>

            {/* Doctor Profile Section (Strict adherence to accuracy rules) */}
            <div className="p-5 rounded-2xl glass-panel border border-[#00C9D6]/30 shadow-lg text-left">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-[#00C9D6] uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" />
                    Lead Physiotherapist
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    Dr. Varun (BPTh / BPT)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Physiotherapist & Founder · BODY REBOOT CLINICS
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#145DBA] to-[#00C9D6] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                  Dr. V
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                Heading clinical practice at Body Reboot Clinics, Dr. Varun focuses on musculoskeletal rehabilitation, sports injury recovery, and active movement retraining.
              </p>

              <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[10px] text-slate-400">
                  Confirmed on storefront: "BODY REBOOT CLINICS by Dr. Varun"
                </span>
                <button
                  onClick={onOpenBooking}
                  className="font-semibold text-xs text-[#00C9D6] hover:text-white flex items-center gap-1 transition-colors"
                >
                  Book with Dr. Varun <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
