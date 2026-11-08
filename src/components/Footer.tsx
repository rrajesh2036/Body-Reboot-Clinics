import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { MapPin, Phone, Star, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms' | 'disclaimer') => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const localKeywords = [
    'Physiotherapy Clinic in Bhopal',
    'Best Physiotherapist in Bhopal',
    'Sports Physiotherapy in Bhopal',
    'Sports Medicine Clinic Bhopal',
    'Body Reboot Clinics Bhopal',
    'Physiotherapy Clinic Kolar Road',
    'Back Pain Treatment Bhopal',
    'Neck Pain Physiotherapy Bhopal',
    'Spine Rehabilitation Bhopal',
    'Knee Pain Physiotherapy Bhopal',
    'Shoulder Rehabilitation Bhopal',
    'Musculoskeletal Physiotherapy Bhopal',
    'Therapeutic Exercise Bhopal',
    'Physiotherapist Near Khadim Bhopal',
    'Physiotherapy Near Mandakani Colony'
  ];

  return (
    <footer className="bg-[#040E1D] border-t border-white/10 pt-16 pb-24 md:pb-12 text-slate-400 text-xs text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand & Address Column (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#145DBA] to-[#00C9D6] p-0.5 flex items-center justify-center text-white font-heading font-extrabold text-sm">
                BR
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg text-white tracking-tight">
                  BODY REBOOT CLINICS
                </span>
                <div className="text-[10px] text-[#00C9D6] font-medium">
                  by Dr. Varun · Specialty Physiotherapy
                </div>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              Advanced sports medicine, orthopedic physiotherapy, and kinetic movement rehabilitation in Kolar Road, Bhopal. Rebuild your body. Reclaim your movement.
            </p>

            <div className="space-y-1.5 pt-1 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00C9D6] shrink-0 mt-0.5" />
                <span>
                  {CLINIC_INFO.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00C9D6] shrink-0" />
                <a href={`tel:${CLINIC_INFO.rawPhone}`} className="hover:text-white font-semibold">
                  {CLINIC_INFO.phone}
                </a>
              </div>
            </div>

            {/* Google Rating Verification */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold font-mono">4.6 / 5.0</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-300 text-[11px]">54 Google Reviews</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm">
              Clinical Hub
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-[#00C9D6] transition-colors">
                  About Dr. Varun
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00C9D6] transition-colors">
                  All Treatments
                </a>
              </li>
              <li>
                <a href="#anatomy" className="hover:text-[#00C9D6] transition-colors">
                  3D Anatomy Viewer
                </a>
              </li>
              <li>
                <a href="#sports-medicine" className="hover:text-[#00C9D6] transition-colors">
                  Sports Injury Care
                </a>
              </li>
              <li>
                <a href="#pain-management" className="hover:text-[#00C9D6] transition-colors">
                  Pain Management
                </a>
              </li>
              <li>
                <a href="#fitness-fuel" className="hover:text-[#00C9D6] transition-colors">
                  Fitness Fuel
                </a>
              </li>
            </ul>
          </div>

          {/* Specialized Treatments */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm">
              Care Programs
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-[#00C9D6] transition-colors">
                  Spine & Disc Recovery
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00C9D6] transition-colors">
                  Knee & ACL Protocols
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00C9D6] transition-colors">
                  Cervical & Tech Neck
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00C9D6] transition-colors">
                  Rotator Cuff Therapy
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00C9D6] transition-colors">
                  Post-Surgical Care
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00C9D6] transition-colors">
                  Therapeutic Exercise
                </a>
              </li>
            </ul>
          </div>

          {/* Patient Actions & Timings */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm">
              Patient Care
            </h4>
            <div className="text-slate-300 space-y-1">
              <div>Tue – Sun: 10:30 AM – 8:30 PM</div>
              <div className="text-amber-400">Monday: Closed</div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#145DBA] to-[#00C9D6] text-white font-bold text-xs shadow-md transition-all text-center block"
              >
                Book Appointment
              </button>
            </div>

            <div className="pt-2 space-y-1 text-[11px]">
              <button
                onClick={() => onOpenLegal('privacy')}
                className="block hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onOpenLegal('terms')}
                className="block hover:text-white transition-colors"
              >
                Terms and Conditions
              </button>
              <button
                onClick={() => onOpenLegal('disclaimer')}
                className="block text-amber-400/90 hover:text-amber-300 transition-colors"
              >
                Medical Responsibility Notice
              </button>
            </div>
          </div>

        </div>

        {/* Local SEO Keyword Tag Index (Natural & Medically responsible) */}
        <div className="pt-8 border-t border-white/10 mb-8">
          <div className="text-[11px] font-semibold text-slate-300 mb-2">
            Local Health Services & Practice Areas in Bhopal:
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-400">
            {localKeywords.map((kw, i) => (
              <span key={kw} className="hover:text-[#00C9D6] transition-colors">
                {kw} {i < localKeywords.length - 1 && <span className="text-slate-600 ml-2">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} BODY REBOOT CLINICS. All rights reserved. Mandakani Colony, Kolar Road, Bhopal, MP 462042.
          </div>

          <div className="flex items-center gap-4">
            <span>Specialty Physiotherapy & Sports Medicine</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
