import React, { useState } from 'react';
import { ThreeAnatomyViewer } from './ThreeAnatomyViewer';
import { ANATOMY_JOINTS } from '../data/clinicData';
import { AnatomyJoint } from '../types';
import { Sparkles, Layers, Activity, ShieldAlert, Check, Calendar, ArrowRight } from 'lucide-react';

interface AnatomySectionProps {
  onOpenBooking: () => void;
  activeJoint: AnatomyJoint | null;
  onSelectJoint: (joint: AnatomyJoint | null) => void;
}

export const AnatomySection: React.FC<AnatomySectionProps> = ({
  onOpenBooking,
  activeJoint,
  onSelectJoint,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'spine' | 'upper_limb' | 'lower_limb'>('all');

  const filteredJoints = activeCategory === 'all'
    ? ANATOMY_JOINTS
    : ANATOMY_JOINTS.filter((j) => j.category === activeCategory);

  const selectedOrFirst = activeJoint || ANATOMY_JOINTS[0];

  return (
    <section id="anatomy" className="py-20 relative overflow-hidden bg-[#051429] border-t border-b border-white/10">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#145DBA]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C9D6]/10 border border-[#00C9D6]/30 text-xs font-semibold text-[#00C9D6] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Biomechanics Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Explore the Human Kinetic Chain in 3D
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Rotate 360°, inspect anatomical load points, and understand how targeted physiotherapy restores pain-free movement.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeCategory === 'all'
                ? 'bg-[#258AFF] text-white shadow-md'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            All Regions
          </button>
          <button
            onClick={() => setActiveCategory('spine')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeCategory === 'spine'
                ? 'bg-[#258AFF] text-white shadow-md'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            Spine & Vertebrae
          </button>
          <button
            onClick={() => setActiveCategory('upper_limb')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeCategory === 'upper_limb'
                ? 'bg-[#258AFF] text-white shadow-md'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            Shoulder & Upper Extremity
          </button>
          <button
            onClick={() => setActiveCategory('lower_limb')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeCategory === 'lower_limb'
                ? 'bg-[#258AFF] text-white shadow-md'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            Hip, Knee & Ankle
          </button>
        </div>

        {/* 2-Column Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 3D Three.js Anatomy Canvas (lg:col-span-7) */}
          <div className="lg:col-span-7 relative h-[520px] sm:h-[580px] rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
            <ThreeAnatomyViewer
              selectedJointId={activeJoint?.id}
              onSelectJoint={onSelectJoint}
              interactive={true}
            />
          </div>

          {/* Right Column: Educational Clinical Inspector & Selector (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Quick Interactive Selector Pills */}
            <div className="p-4 rounded-xl glass-panel border border-white/10">
              <div className="text-xs font-semibold text-slate-300 mb-2.5 flex items-center justify-between">
                <span>Select an Anatomical Joint:</span>
                <span className="text-[10px] text-[#00C9D6]">Click to focus 3D camera</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filteredJoints.map((joint) => {
                  const isCurrent = selectedOrFirst.id === joint.id;
                  return (
                    <button
                      key={joint.id}
                      onClick={() => onSelectJoint(joint)}
                      className={`text-left p-2.5 rounded-lg text-xs transition-all border ${
                        isCurrent
                          ? 'bg-[#258AFF]/20 border-[#00C9D6] text-white font-semibold shadow-sm'
                          : 'bg-white/[0.03] border-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="truncate">{joint.name.split('(')[0]}</div>
                      <div className="text-[10px] text-[#00C9D6] mt-0.5 capitalize">
                        {joint.category.replace('_', ' ')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Anatomical Detail Card */}
            <div className="p-5 rounded-2xl glass-panel border border-[#00C9D6]/30 shadow-xl text-left flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-[#00C9D6] uppercase tracking-wider">
                    {selectedOrFirst.category.replace('_', ' ')} Biomechanics
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Joint Node Active
                  </span>
                </div>

                <h3 className="text-xl font-extrabold font-heading text-white">
                  {selectedOrFirst.name}
                </h3>

                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {selectedOrFirst.description}
                </p>

                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 mb-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      Frequently Diagnosed Conditions:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedOrFirst.commonConditions.map((cond) => (
                        <span
                          key={cond}
                          className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-200 border border-white/10"
                        >
                          {cond}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 mb-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#00C9D6]" />
                      Reboot Clinic Evidence-Based Protocol:
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed bg-white/5 p-2.5 rounded-lg border border-white/10">
                      {selectedOrFirst.clinicalApproach}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="text-[10px] text-slate-400 leading-tight">
                  Educational 3D model. Consultation includes comprehensive physical assessment.
                </div>
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 bg-gradient-to-r from-[#145DBA] to-[#00C9D6] hover:brightness-110 text-white text-xs font-bold rounded-lg transition-all shadow-md flex items-center gap-1.5 shrink-0"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Consult for This Joint</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
