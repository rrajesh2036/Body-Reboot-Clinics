import React from 'react';
import { MapPin, Phone, MessageSquare, Navigation, Clock, Shield, ExternalLink } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 relative bg-[#051429] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#00C9D6] mb-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Clinic Location & Accessibility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Visit BODY REBOOT CLINICS in Bhopal
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Conveniently situated on J K Hospital Main Road in Mandakani Colony, Kolar Road, directly opposite Khadim with easy parking and wheelchair accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Official Business Info & Navigation (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00C9D6]/10 border border-[#00C9D6]/20 flex items-center justify-center text-[#00C9D6] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-heading">
                    Clinic Address
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {CLINIC_INFO.address}
                  </p>
                  <p className="text-[11px] text-[#00C9D6] mt-1 font-semibold">
                    Landmark: Directly Opposite to Khadim Footwear
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#258AFF]/10 border border-[#258AFF]/20 flex items-center justify-center text-[#258AFF] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-heading">
                    Telephone & WhatsApp
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    <a href={`tel:${CLINIC_INFO.rawPhone}`} className="hover:text-[#00C9D6] transition-colors">
                      {CLINIC_INFO.phone}
                    </a>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Consultation & emergency injury helpline
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-heading">
                    Weekly Hours
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Tue – Sun: 10:30 AM – 8:30 PM
                  </p>
                  <p className="text-[11px] text-amber-400 mt-0.5">
                    Monday: Closed (Weekly Maintenance & Private Sessions)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-gradient-to-r from-[#145DBA] to-[#258AFF] hover:brightness-110 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
              </a>

              <a
                href={CLINIC_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Clinic</span>
              </a>
            </div>

            {/* Local Transit & Access Note */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Transit & Parking: </strong>
              Directly accessible from Kolar Road artery. Dedicated street frontage and ample parking space for cars and two-wheelers.
            </div>

          </div>

          {/* Right Column: Interactive Google Map Embed (lg:col-span-7) */}
          <div className="lg:col-span-7 h-[420px] sm:h-[480px] rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl relative">
            <iframe
              title="BODY REBOOT CLINICS Location on Google Maps Bhopal"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.498421839257!2d77.4184!3d23.1678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43003058a5c3%3A0xb30d322ef562d294!2sBODY%20REBOOT%20CLINICS!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) brightness(0.95)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />

            {/* Floating Map Card */}
            <div className="absolute top-4 left-4 max-w-xs p-3 rounded-xl bg-[#071B36]/90 backdrop-blur-md border border-white/10 text-left shadow-lg pointer-events-none sm:pointer-events-auto">
              <div className="text-[10px] font-bold text-[#00C9D6] uppercase tracking-wider">
                Google Business Verified Pin
              </div>
              <div className="text-xs font-bold text-white mt-0.5">
                BODY REBOOT CLINICS
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">
                Mandakani Colony, Opp. Khadim, Kolar Road Bhopal
              </div>
              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-[10px] text-[#258AFF] hover:text-[#00C9D6] font-semibold flex items-center gap-1 pointer-events-auto"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
