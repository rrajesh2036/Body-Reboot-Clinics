import React from 'react';
import { Stethoscope, FileText, BookOpen, Dumbbell, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';

interface PainManagementSectionProps {
  onOpenBooking: () => void;
}

export const PainManagementSection: React.FC<PainManagementSectionProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: 'Detailed Biomechanical Assessment',
      desc: 'We conduct orthopedic joint tests, postural alignment analysis, nerve tension testing, and palpation to identify the true pain generator.',
      icon: <Stethoscope className="w-5 h-5 text-[#00C9D6]" />
    },
    {
      num: '02',
      title: 'Individualized Treatment Plan',
      desc: 'No cookie-cutter routines. Your protocol combines targeted manual therapy, directional preference exercises, and joint de-loading.',
      icon: <FileText className="w-5 h-5 text-[#258AFF]" />
    },
    {
      num: '03',
      title: 'Movement & Ergonomic Education',
      desc: 'Understanding pain triggers is half the cure. We re-train your sitting posture, spinal hip hinge, lifting mechanics, and sleep ergonomics.',
      icon: <BookOpen className="w-5 h-5 text-[#00C9D6]" />
    },
    {
      num: '04',
      title: 'Therapeutic Exercise Progression',
      desc: 'Transition from passive symptom relief to active tissue remodeling using progressive resistance bands, core stability, and mobility drills.',
      icon: <Dumbbell className="w-5 h-5 text-amber-400" />
    },
    {
      num: '05',
      title: 'Long-Term Functional Resilience',
      desc: 'Equipping you with a realistic home exercise program to maintain restored range of motion and prevent recurring flare-ups.',
      icon: <ShieldCheck className="w-5 h-5 text-[#258AFF]" />
    }
  ];

  return (
    <section id="pain-management" className="py-20 relative bg-[#071B36] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#00C9D6] mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Targeted Clinical Pathway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Comprehensive Pain Management & Rehabilitation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Pain is your nervous system’s alarm signal. Rather than merely masking discomfort with temporary measures, we evaluate and address mechanical load imbalances across your kinetic chain.
          </p>
        </div>

        {/* 5-Step Clinical Progression Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-[#00C9D6]/40 transition-all text-left flex flex-col justify-between group hover:-translate-y-1 shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {step.icon}
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-400">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white font-heading leading-snug">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center text-[10px] text-[#00C9D6] font-medium">
                Verified Rehabilitation Step
              </div>
            </div>
          ))}
        </div>

        {/* Common Anatomical Pain Zones */}
        <div className="mt-12 p-6 rounded-2xl glass-panel border border-white/10 text-left">
          <h3 className="text-base font-bold text-white font-heading mb-4">
            Common Musculoskeletal Regions Treated at Body Reboot Clinics:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
            {['Cervical Neck', 'Lumbar Spine', 'Rotator Cuff', 'Knee Joint', 'Sciatic Nerve', 'Ankle & Foot'].map((area) => (
              <div key={area} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
                {area}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
            <span>
              <strong>Medical Responsibility Notice:</strong> Physiotherapy is an active conservative healthcare modality. While most musculoskeletal conditions improve significantly with individualized rehabilitation, outcomes depend on medical etiology and adherence to prescribed exercise.
            </span>
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 bg-[#258AFF] hover:bg-[#145DBA] text-white font-semibold rounded-lg shrink-0 transition-colors"
            >
              Schedule Pain Assessment
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
