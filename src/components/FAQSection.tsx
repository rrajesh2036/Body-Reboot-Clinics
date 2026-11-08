import React, { useState } from 'react';
import { FREQUENT_QUESTIONS, CLINIC_INFO } from '../data/clinicData';
import { HelpCircle, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 relative bg-[#071B36] border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#00C9D6] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Patient Guidance & FAQs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Common questions regarding physical therapy treatments, appointments, and location in Bhopal.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 text-left">
          {FREQUENT_QUESTIONS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-left font-heading font-bold text-sm sm:text-base text-white hover:text-[#00C9D6] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="p-1 rounded-lg bg-white/5 text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#00C9D6]" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-fadeIn">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
