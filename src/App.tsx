/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { AnatomySection } from './components/AnatomySection';
import { ServicesSection } from './components/ServicesSection';
import { SportsMedicineSection } from './components/SportsMedicineSection';
import { PainManagementSection } from './components/PainManagementSection';
import { FitnessFuelSection } from './components/FitnessFuelSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { FAQSection } from './components/FAQSection';
import { AppointmentSection } from './components/AppointmentSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { LegalModal } from './components/LegalModals';
import { AnatomyJoint } from './types';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error Caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#071B36] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#145DBA] to-[#00C9D6] flex items-center justify-center font-bold text-lg mb-4">BR</div>
          <h1 className="text-2xl font-bold font-heading mb-2">BODY REBOOT CLINICS</h1>
          <p className="text-sm text-slate-300 max-w-md mb-6">A temporary script issue occurred. Click below to reload the clinic portal.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-xl bg-[#258AFF] hover:bg-[#145DBA] text-white font-bold text-xs"
          >
            Reload Website
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [selectedJoint, setSelectedJoint] = useState<AnatomyJoint | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  const handleOpenBooking = () => {
    const el = document.getElementById('appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectJoint = (joint: AnatomyJoint | null) => {
    setSelectedJoint(joint);
  };

  return (
    <ErrorBoundary>
      <div id="top" className="min-h-screen bg-[#071B36] text-slate-100 flex flex-col font-sans selection:bg-[#00C9D6] selection:text-[#071B36]">
      {/* Sticky Navigation Header */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Cinematic 3D Hero Section */}
        <HeroSection
          onOpenBooking={handleOpenBooking}
          onSelectJoint={handleSelectJoint}
        />

        {/* 2. About Body Reboot Clinics */}
        <AboutSection onOpenBooking={handleOpenBooking} />

        {/* 3. Interactive 3D Human Anatomy Biomechanics Studio */}
        <AnatomySection
          onOpenBooking={handleOpenBooking}
          activeJoint={selectedJoint}
          onSelectJoint={handleSelectJoint}
        />

        {/* 4. Our Treatments & Clinical Specializations */}
        <ServicesSection onOpenBooking={handleOpenBooking} />

        {/* 5. Sports Medicine & Performance Section */}
        <SportsMedicineSection onOpenBooking={handleOpenBooking} />

        {/* 6. Pain Management & Spine Rehabilitation */}
        <PainManagementSection onOpenBooking={handleOpenBooking} />

        {/* 7. Fitness Fuel & Therapeutic Exercise */}
        <FitnessFuelSection onOpenBooking={handleOpenBooking} />

        {/* 8. Google Reviews & Authentic Social Proof */}
        <ReviewsSection />

        {/* 9. Clinic Photographs & Gallery */}
        <GallerySection />

        {/* 10. Frequently Asked Questions */}
        <FAQSection />

        {/* 11. Appointment Booking & Enquiry System */}
        <AppointmentSection initialConcern={selectedJoint ? `${selectedJoint.name} Treatment` : undefined} />

        {/* 12. Google Maps Location & Working Hours */}
        <ContactSection />
      </main>

      {/* Footer with Local SEO & Practice Areas */}
      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={handleOpenBooking}
      />

      {/* Fixed Mobile Bottom Action Bar (≤15% viewport height cap) */}
      <MobileBottomBar onOpenBooking={handleOpenBooking} />

      {/* Legal & Medical Responsibility Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
      </div>
    </ErrorBoundary>
  );
}
