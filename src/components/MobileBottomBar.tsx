import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface MobileBottomBarProps {
  onOpenBooking: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#071B36]/95 backdrop-blur-md border-t border-white/10 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto h-12">
        
        {/* Action 1: Call Now */}
        <a
          href={`tel:${CLINIC_INFO.rawPhone}`}
          className="flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-200 active:bg-white/15 transition-colors touch-manipulation"
          aria-label="Call clinic directly"
        >
          <Phone className="w-4 h-4 text-[#00C9D6]" />
          <span className="text-[10px] font-semibold mt-0.5">Call Now</span>
        </a>

        {/* Action 2: WhatsApp */}
        <a
          href={CLINIC_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-white active:bg-[#25D366]/30 transition-colors touch-manipulation"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          <span className="text-[10px] font-semibold mt-0.5">WhatsApp</span>
        </a>

        {/* Action 3: Book Appointment */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-r from-[#145DBA] to-[#00C9D6] text-white active:brightness-110 shadow-md transition-all touch-manipulation"
          aria-label="Book appointment"
        >
          <Calendar className="w-4 h-4 text-white" />
          <span className="text-[10px] font-bold mt-0.5">Book Visit</span>
        </button>

      </div>
    </div>
  );
};
