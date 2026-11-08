import React, { useState } from 'react';
import { CLINIC_SERVICES } from '../data/clinicData';
import { ClinicService } from '../types';
import { Activity, Shield, Layers, Crosshair, Maximize2, Zap, Award, CheckCircle2, ArrowRight, X, Calendar, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface ServicesSectionProps {
  onOpenBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalService, setActiveModalService] = useState<ClinicService | null>(null);

  const categories = ['All', 'Sports Medicine', 'Spine & Back', 'Joint & Mobility', 'Therapeutic Rehab'];

  const filteredServices = selectedCategory === 'All'
    ? CLINIC_SERVICES
    : CLINIC_SERVICES.filter((s) => s.category === selectedCategory);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Activity': return <Activity className="w-5 h-5 text-[#00C9D6]" />;
      case 'Shield': return <Shield className="w-5 h-5 text-[#258AFF]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-[#00C9D6]" />;
      case 'Crosshair': return <Crosshair className="w-5 h-5 text-[#258AFF]" />;
      case 'Maximize2': return <Maximize2 className="w-5 h-5 text-[#00C9D6]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Award': return <Award className="w-5 h-5 text-[#258AFF]" />;
      default: return <CheckCircle2 className="w-5 h-5 text-[#00C9D6]" />;
    }
  };

  return (
    <section id="services" className="py-20 relative bg-[#071B36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#00C9D6] mb-2">
              Clinical Specializations · Bhopal
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Evidence-Based Physiotherapy & Rehabilitation
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Each clinical protocol is customized to your biomechanical assessment, tissue healing stage, and functional movement goals.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#258AFF] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group p-6 rounded-2xl glass-panel border border-white/10 hover:border-[#00C9D6]/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg text-left"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getServiceIcon(service.iconName)}
                </div>

                <div className="text-[11px] font-semibold text-[#00C9D6] uppercase tracking-wider mb-1">
                  {service.category}
                </div>

                <h3 className="text-lg font-bold text-white font-heading group-hover:text-[#00C9D6] transition-colors leading-snug">
                  {service.title}
                </h3>

                <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalService(service)}
                  className="text-xs font-semibold text-[#258AFF] group-hover:text-[#00C9D6] flex items-center gap-1 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-medium text-slate-400 hover:text-white"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Service Detail Modal */}
        {activeModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-[#071B36] border border-[#00C9D6]/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-left">
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-lg bg-white/5"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-bold text-[#00C9D6] uppercase tracking-wider mb-1">
                {activeModalService.category}
              </div>
              <h3 className="text-2xl font-extrabold font-heading text-white">
                {activeModalService.title}
              </h3>

              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                {activeModalService.fullDesc}
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                    Key Clinical Benefits
                  </h4>
                  <ul className="space-y-1.5">
                    {activeModalService.benefits.map((b, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00C9D6] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                    Ideal For
                  </h4>
                  <ul className="space-y-1.5">
                    {activeModalService.idealFor.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#258AFF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                    Techniques & Tools Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalService.techniqueHighlights.map((tech, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-[#00C9D6] border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`tel:${CLINIC_INFO.rawPhone}`}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00C9D6]" />
                  Call Clinic
                </a>
                <button
                  onClick={() => {
                    setActiveModalService(null);
                    onOpenBooking();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#145DBA] via-[#258AFF] to-[#00C9D6] hover:brightness-110 text-xs font-bold text-white shadow-lg flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation for This Treatment</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
