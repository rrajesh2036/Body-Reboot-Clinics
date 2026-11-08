export interface AnatomyJoint {
  id: string;
  name: string;
  category: 'spine' | 'upper_limb' | 'lower_limb' | 'core';
  position: [number, number, number]; // [x, y, z] in Three.js coordinates
  color: string;
  description: string;
  commonConditions: string[];
  clinicalApproach: string;
  recommendedTreatments: string[];
}

export interface ClinicService {
  id: string;
  title: string;
  category: 'Sports Medicine' | 'Spine & Back' | 'Joint & Mobility' | 'Therapeutic Rehab';
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  idealFor: string[];
  techniqueHighlights: string[];
  iconName: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  verifiedSource: string;
  tag: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Clinic Exterior' | 'Interior Studio' | 'Equipment & Treatment' | 'Google Maps Contributor';
  src: string;
  caption: string;
  mapsUrl?: string;
  isOfficialStorefront?: boolean;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  treatmentConcern: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}
