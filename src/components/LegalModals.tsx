import React from 'react';
import { X, ShieldAlert, FileText, CheckCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'disclaimer' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#071B36] border border-[#00C9D6]/30 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[85vh] text-left">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-lg bg-white/5"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div className="space-y-4">
            <div className="text-xs font-bold text-[#00C9D6] uppercase tracking-wider">
              Legal Compliance
            </div>
            <h3 className="text-2xl font-extrabold font-heading text-white">
              Privacy Policy
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              At <strong>BODY REBOOT CLINICS</strong>, we are committed to upholding the confidentiality and security of our patients' personal and medical data.
            </p>
            <div className="space-y-3 text-xs text-slate-300">
              <h4 className="text-sm font-bold text-white">1. Information We Collect</h4>
              <p>
                When you submit an appointment enquiry, we collect your name, mobile number, optional email address, and clinical description of your musculoskeletal condition.
              </p>
              <h4 className="text-sm font-bold text-white">2. Purpose of Processing</h4>
              <p>
                Your contact details are solely utilized to schedule physical therapy evaluations, provide appointment reminders, and facilitate clinic communication. We never sell, lease, or share patient data with third-party advertisers.
              </p>
              <h4 className="text-sm font-bold text-white">3. Patient Confidentiality</h4>
              <p>
                All clinical records and treatment notes generated during your sessions remain protected under professional medical ethics and Indian data protection guidelines.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4">
            <div className="text-xs font-bold text-[#00C9D6] uppercase tracking-wider">
              Terms of Service
            </div>
            <h3 className="text-2xl font-extrabold font-heading text-white">
              Terms and Conditions
            </h3>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <h4 className="text-sm font-bold text-white">1. Clinical Scope</h4>
              <p>
                BODY REBOOT CLINICS provides licensed physiotherapy, sports injury rehabilitation, pain management, and therapeutic exercise in Bhopal, MP.
              </p>
              <h4 className="text-sm font-bold text-white">2. Appointments & Cancellations</h4>
              <p>
                Appointments submitted through the digital portal are confirmed upon clinic communication. If you need to reschedule, please notify us at least 4 hours in advance via phone or WhatsApp.
              </p>
              <h4 className="text-sm font-bold text-white">3. Diagnostic Medical Reports</h4>
              <p>
                Patients are encouraged to present relevant MRI, X-Ray, or surgical documentation during initial consultation to facilitate targeted clinical evaluation.
              </p>
            </div>
          </div>
        )}

        {type === 'disclaimer' && (
          <div className="space-y-4">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Important Medical Guidance
            </div>
            <h3 className="text-2xl font-extrabold font-heading text-white">
              Medical Responsibility Disclaimer
            </h3>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                The information, 3D anatomical animations, exercise tips, and educational materials presented on this website are designed exclusively for general health education and clinic awareness.
              </p>
              <p>
                The 3D anatomical viewer is an educational tool and <strong>must not be construed as a substitute for professional medical diagnosis</strong> or specialized clinical consultation.
              </p>
              <p>
                Physiotherapy is an active physical rehabilitation process. Recovery trajectories depend upon the precise biological etiology of the condition, individual anatomy, baseline health, and adherence to prescribed therapeutic regimens.
              </p>
              <p>
                If you are experiencing acute trauma, unremitting neurological deficits, severe chest pain, or sudden loss of motor control, please seek immediate emergency medical care.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
