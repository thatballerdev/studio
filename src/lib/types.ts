import type { FieldValue } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  name?: string;
  onboardingComplete: boolean;

  // Old onboarding fields
  profession?: string;
  studyInterest?: string;
  budget?: number;
  preferredCountries?: string[];

  // New detailed onboarding fields
  fullName?: string;
  phoneNumber?: string;
  contactMethod?: 'Email' | 'Phone';
  currentEducation?: string;
  targetDegree?: string;
  fieldInterest?: string[];
  budgetRangeUSD?: string;
  englishOnly?: boolean;
  regionPreference?: string;
  desiredStartDate?: string;
  careerGoal?: string;
  scholarshipInterest?: boolean;
  studyMode?: string;
  priorityFactors?: string[];
  profileUpdatedAt?: FieldValue;
}


export interface University {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  annualCost: number;
  highlights: string[];
  imageId: string;
  motto: string;
  featured: boolean;
}

export interface Program {
  courseId: string;
  degreeLevel: 'BSc' | 'MSc';
  subject: string;
  tuitionRangeEUR: { min: number; max: number };
  typicalLanguage: 'English' | 'English + Local' | 'Local Language';
  notes: string;
  estTotalCost: {
    easternEurope: { min: number; max: number };
    westernEurope: { min: number; max: number };
  };
}

export interface FeaturedUniversity {
  id: string;
  displayName: string;
  institution: string;
  country: string;
  city: string;
  region: string;
  flag: string;
  tuition_estimate_usd_per_year: string;
  tuition_estimate_native_currency_per_year: string;
  tuition_estimate_note: string;
  language: string;
  premium: boolean;
  featured: boolean;
  highlights: string[];
  quote: string;
  verified_sources: string[];
  last_verified: string;
  unsplash_queries: string[];
  image_url: string;
  thumbnail_url: string;
  image_source: string;
  placeholder_design_note: string;
  alt_text: string;
}