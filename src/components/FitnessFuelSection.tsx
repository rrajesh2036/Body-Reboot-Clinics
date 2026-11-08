import React from 'react';
import { Dumbbell, Flame, HeartPulse, RefreshCw, Compass, ArrowRight } from 'lucide-react';

interface FitnessFuelSectionProps {
  onOpenBooking: () => void;
}

export const FitnessFuelSection: React.FC<FitnessFuelSectionProps> = ({ onOpenBooking }) => {
  const pillars = [
    {
      icon: <Dumbbell className="w-5 h-5 text-[#00C9D6]" />,
      title: 'Progressive Strength Development',
      desc: 'Muscle is protective armor for your joints. We calibrate load, tempo, and joint angles to build tendon resilience without irritating existing injuries.'
    },
    {
      icon: <Flame className="w-5 h-5 text-amber-400" />,
      title: 'Active Mobility & Joint Lubrication',
      desc: 'Controlled articular rotations (CARs) and multi-planar movements that stimulate synovial fluid production and restore natural range of motion.'
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-[#258AFF]" />,
      title: 'Sustainable Physical Activity Habits',
      desc: 'Guidance on incorporating realistic daily movement quotas, reducing sedentary spine compression, and maintaining baseline cardiovascular vitality.'
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-[#00C9D6]" />,
      title: 'Evidence-Based Recovery Protocols',
      desc: 'Sleep hygiene principles, restorative hydration, myofascial foam rolling, and active deloading strategies to accelerate biological tissue repair.'
    }
  ];

  return (
    <section id="fitness-fuel" className="py-20 relative bg-[#051429] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#00C9D6] mb-2 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" />
            <span>Storefront Pillar · Active Rehabilitation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Fitness Fuel & Therapeutic Exercise
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Movement is medicine when dosed accurately. Our therapeutic exercise regimens empower patients in Bhopal with sustainable habits for lifelong joint vitality and functional independence.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-[#00C9D6]/40 transition-all text-left flex flex-col justify-between hover:-translate-y-1 shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white font-heading leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-slate-400">
                Exercise Prescription Focus
              </div>
            </div>
          ))}
        </div>

        {/* Educational Notice Banner */}
        <div className="mt-10 p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="text-xs text-slate-300">
            <strong className="text-white">Note on Nutritional Guidance: </strong>
            In accordance with medical advertising standards, clinical nutrition plans or specialized diet advice are strictly provided on a personalized basis during in-clinic consultation. No unverified generic supplements are sold or endorsed.
          </div>
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 rounded-lg bg-[#258AFF] hover:bg-[#145DBA] text-white text-xs font-semibold whitespace-nowrap shrink-0 transition-colors"
          >
            Enquire About Exercise Therapy
          </button>
        </div>

      </div>
    </section>
  );
};
