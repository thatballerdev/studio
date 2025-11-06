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
