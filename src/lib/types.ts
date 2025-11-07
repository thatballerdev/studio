export interface UserProfile {
  uid: string;
  email: string;
  name?: string;
  profession?: string;
  studyInterest?: string;
  budget?: number;
  preferredCountries?: string[];
  onboardingComplete: boolean;
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
