import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, ArrowUpRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#071B36]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element Brand mark (No clutter, compliant with Top Bar Contract) */}
        <a href="#top" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#145DBA] to-[#00C9D6] p-0.5 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center">
            <span className="font-heading font-extrabold text-white text-lg tracking-wider">BR</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white whitespace-nowrap">
              BODY REBOOT CLINICS
            </span>
            <span className="text-[10px] text-[#00C9D6] font-medium tracking-wide">
              Sports Medicine & Physiotherapy · Bhopal
            </span>
          </div>
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a
            href="#about"
            className="hover:text-[#00C9D6] transition-colors whitespace-nowrap shrink-0"
          >
            About
          </a>
          <a
            href="#services"
            className="hover:text-[#00C9D6] transition-colors whitespace-nowrap shrink-0"
          >
            Treatments
          </a>
          <a
            href="#anatomy"
            className="hover:text-[#00C9D6] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <span>3D Anatomy</span>
            <span className="text-[10px] text-[#00C9D6] bg-[#00C9D6]/10 px-1.5 py-0.5 rounded">Interactive</span>
          </a>
          <a
            href="#sports-medicine"
            className="hover:text-[#00C9D6] transition-colors whitespace-nowrap shrink-0"
          >
            Sports Rehab
          </a>
          <a
            href="#reviews"
            className="hover:text-[#00C9D6] transition-colors whitespace-nowrap shrink-0"
          >
            Reviews
          </a>
          <a
            href="#gallery"
            className="hover:text-[#00C9D6] transition-colors whitespace-nowrap shrink-0"
          >
            Gallery
          </a>
          <a
            href="#contact"
            className="hover:text-[#00C9D6] transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action button + Quick Call for patients */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <a
            href={`tel:${CLINIC_INFO.rawPhone}`}
            className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-[#00C9D6]" />
            <span>+91 78692 25304</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#145DBA] via-[#258AFF] to-[#00C9D6] hover:brightness-110 rounded-lg shadow-md hover:shadow-cyan-500/20 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 text-xs font-bold text-white bg-[#258AFF] rounded-lg"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg bg-white/5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071B36] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-200">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-white/5"
            >
              About Clinic
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-white/5"
            >
              Our Treatments
            </a>
            <a
              href="#anatomy"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-white/5 text-[#00C9D6]"
            >
              3D Anatomy Explorer
            </a>
            <a
              href="#sports-medicine"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-white/5"
            >
              Sports Medicine & Performance
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-white/5"
            >
              Google Reviews (4.6★)
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-white/5"
            >
              Clinic Gallery
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-white/5"
            >
              Location & Hours
            </a>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href={`tel:${CLINIC_INFO.rawPhone}`}
              className="w-full text-center py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#00C9D6]" />
              Call +91 78692 25304
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-[#145DBA] to-[#00C9D6] text-xs font-bold text-white shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Consultation Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
