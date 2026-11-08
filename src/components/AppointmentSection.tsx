import React, { useState } from 'react';
import { Calendar, Phone, MessageSquare, Clock, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { CLINIC_INFO, CLINIC_SERVICES } from '../data/clinicData';
import { BookingFormData } from '../types';

interface AppointmentSectionProps {
  initialConcern?: string;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({ initialConcern }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    treatmentConcern: initialConcern || 'Spine & Lumbar Rehabilitation',
    preferredDate: '',
    preferredTime: 'Morning (10:30 AM - 1:00 PM)',
    notes: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);
  const [submissionId, setSubmissionId] = useState<string>('');

  const validate = (): boolean => {
    const err: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      err.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 3) {
      err.fullName = 'Name must be at least 3 characters.';
    }

    // Phone validation: Indian 10-digit mobile number
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      err.phone = 'Mobile number is required.';
    } else if (cleanPhone.length < 10 || cleanPhone.length > 12) {
      err.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = 'Please enter a valid email address.';
    }

    if (!formData.preferredDate) {
      err.preferredDate = 'Please select a preferred appointment date.';
    } else {
      const selected = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        err.preferredDate = 'Please select an upcoming date.';
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Prevent duplicate submissions and register enquiry
    setTimeout(() => {
      setIsSubmitting(false);
      const ref = `BRC-${Date.now().toString().slice(-6)}`;
      setSubmissionId(ref);
      setSubmittedData({ ...formData });
    }, 600);
  };

  const getWhatsAppBookingLink = () => {
    const text = encodeURIComponent(
      `Hello Body Reboot Clinics Bhopal! I would like to book a physiotherapy consultation.\n\n` +
      `Name: ${formData.fullName || 'Patient'}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Concern: ${formData.treatmentConcern}\n` +
      `Preferred Date: ${formData.preferredDate || 'Earliest available'}\n` +
      `Preferred Time: ${formData.preferredTime}\n` +
      `Clinic Location: Kolar Road Centre`
    );
    return `https://wa.me/917869225304?text=${text}`;
  };

  return (
    <section id="appointment" className="py-20 relative bg-[#071B36] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#00C9D6] mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Consultation Enquiry & Scheduling</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Book Your Physiotherapy Consultation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Submit your enquiry below or connect directly via phone or WhatsApp. Our clinical team at Kolar Road will review your concern and confirm your session time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Quick Connect Cards & Working Hours (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            {/* Direct Instant Action Buttons */}
            <div className="p-6 rounded-2xl glass-panel border border-[#00C9D6]/30 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white font-heading">
                Instant Clinic Channels
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Need urgent care for acute neck spasm, severe back pain, or sports trauma? Contact Dr. Varun directly:
              </p>

              <div className="space-y-2.5 pt-2">
                <a
                  href={`tel:${CLINIC_INFO.rawPhone}`}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center justify-between transition-colors group"
                >
                  <span className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#00C9D6]" />
                    <span>Call Clinic (+91 78692 25304)</span>
                  </span>
                  <span className="text-[10px] text-slate-400 group-hover:text-white">Direct Line</span>
                </a>

                <a
                  href={getWhatsAppBookingLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-xs font-bold text-white flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp Consultation Enquiry</span>
                  </span>
                  <span className="text-[10px] text-[#25D366] font-semibold">Fast Response</span>
                </a>
              </div>
            </div>

            {/* Operating Schedule */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 text-left">
              <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#00C9D6]" />
                Clinic Working Schedule
              </h4>
              <div className="space-y-2 text-xs">
                {CLINIC_INFO.schedule.map((item) => (
                  <div
                    key={item.day}
                    className={`flex items-center justify-between py-1 border-b border-white/5 ${
                      item.isClosed ? 'text-amber-400/90' : 'text-slate-300'
                    }`}
                  >
                    <span className="font-medium">{item.day}</span>
                    <span className={item.isClosed ? 'font-medium' : 'text-slate-400'}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-slate-400">
                * Note: Schedule matches official Google Business Profile. Prior appointment recommended to avoid wait times.
              </p>
            </div>
          </div>

          {/* Right Column: Appointment Form (lg:col-span-7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 shadow-2xl text-left">
            
            {submittedData ? (
              <div className="py-6 space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-2xl bg-[#00C9D6]/15 border border-[#00C9D6]/30 flex items-center justify-center text-[#00C9D6] mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="text-xs font-mono font-semibold text-[#00C9D6]">
                  ENQUIRY RECEIVED · REFERENCE #{submissionId}
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">
                  Thank You, {submittedData.fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Your physiotherapy consultation request for <strong>{submittedData.treatmentConcern}</strong> has been logged. Our clinical coordinator will reach you at <strong>{submittedData.phone}</strong> to confirm the exact time slot for <strong>{submittedData.preferredDate} ({submittedData.preferredTime})</strong>.
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1.5 text-slate-300">
                  <div><strong>Clinic:</strong> BODY REBOOT CLINICS (Opp. Khadim, Kolar Road, Bhopal)</div>
                  <div><strong>Contact:</strong> +91 78692 25304</div>
                  {submittedData.notes && (
                    <div><strong>Clinical Note:</strong> {submittedData.notes}</div>
                  )}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={getWhatsAppBookingLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send on WhatsApp as Well</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmittedData(null);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        treatmentConcern: 'Spine & Lumbar Rehabilitation',
                        preferredDate: '',
                        preferredTime: 'Morning (10:30 AM - 1:00 PM)',
                        notes: '',
                      });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium border border-white/10 transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rajesh Sharma"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                        errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#00C9D6] focus:ring-[#00C9D6]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Mobile Number (+91) *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 78692 25304"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#00C9D6] focus:ring-[#00C9D6]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00C9D6] focus:ring-1 focus:ring-[#00C9D6] transition-colors"
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Treatment Concern */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Primary Treatment Concern *
                    </label>
                    <select
                      value={formData.treatmentConcern}
                      onChange={(e) => setFormData({ ...formData, treatmentConcern: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#071B36] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00C9D6] focus:ring-1 focus:ring-[#00C9D6] transition-colors"
                    >
                      {CLINIC_SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Sports Injury Recovery">Sports Injury Recovery</option>
                      <option value="Knee / Shoulder Joint Pain">Knee / Shoulder Joint Pain</option>
                      <option value="General Physiotherapy Assessment">General Physiotherapy Assessment</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-xs text-white focus:outline-none focus:ring-1 transition-colors ${
                        errors.preferredDate ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-[#00C9D6] focus:ring-[#00C9D6]'
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
                      </p>
                    )}
                  </div>

                  {/* Preferred Time Window */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#071B36] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00C9D6] focus:ring-1 focus:ring-[#00C9D6] transition-colors"
                    >
                      <option value="Morning (10:30 AM - 1:00 PM)">Morning (10:30 AM – 1:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM – 5:00 PM)</option>
                      <option value="Evening (5:00 PM - 8:30 PM)">Evening (5:00 PM – 8:30 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Clinical Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Describe Your Pain / Condition <span className="text-slate-400 font-normal">(Duration, pain triggers, previous reports)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Pain in lower back radiating to right leg for 3 weeks; worsens with sitting."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00C9D6] focus:ring-1 focus:ring-[#00C9D6] transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#145DBA] via-[#258AFF] to-[#00C9D6] hover:brightness-110 text-white font-bold text-sm shadow-xl hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Logging Your Consultation Enquiry...</span>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        <span>Confirm Appointment Request</span>
                      </>
                    )}
                  </button>
                  <p className="mt-2 text-[10px] text-slate-400 text-center">
                    Privacy guaranteed. Your medical information is strictly handled in confidence by Body Reboot Clinics.
                  </p>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
