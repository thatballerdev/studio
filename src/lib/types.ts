
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
  commonDurationYears: number;
  lastVerified: string;
}
