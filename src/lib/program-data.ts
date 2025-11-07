import type { Program } from './types';

export const courseCategories = {
  "STEM & Engineering": [
    "Aerospace / Aeronautical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical / Electronic Engineering",
    "Mechatronics / Robotics",
    "Computer Science / Software Engineering",
    "Data Science / Artificial Intelligence",
    "Chemical Engineering",
    "Biomedical Engineering",
    "Petroleum / Energy Engineering",
    "Environmental Engineering",
  ],
  "Health & Medical": [
    "Medicine (MD / integrated programmes)",
    "Dentistry / Dental Medicine",
    "Pharmacy / Pharmaceutical Sciences",
    "Nursing (BSc / MSc)",
    "Public Health (BSc / MSc)",
    "Biomedical Science / Laboratory Science",
    "Physiotherapy / Occupational Therapy",
    "Medical Biotechnology",
  ],
  "Business, Economics & Social Sciences": [
    "Business Administration / BBA / MSc Management",
    "Economics",
    "Finance / Banking",
    "Accounting",
    "Marketing / Digital Marketing",
    "International Relations / Political Science",
    "Sociology / Social Work",
    "Psychology (BSc / MSc)",
    "Human Resources",
  ],
  "Math, Natural Sciences & Others": [
    "Mathematics / Applied Mathematics",
    "Physics",
    "Chemistry",
    "Biology / Life Sciences",
    "Geography / Geosciences",
    "Statistics",
  ],
  "Arts, Design & Humanities": [
    "Architecture (BSc / MSc)",
    "Design / Industrial Design",
    "Fine Arts / Visual Arts",
    "Media & Communications",
    "Education / Teaching (BEd / PGCE style)",
    "Languages & Literature",
  ],
  "Professional & Emerging fields": [
    "Law (LLB / LLM)",
    "Cybersecurity / Network Management",
    "Supply Chain / Logistics",
    "Hospitality & Tourism Management",
    "Sports Science",
  ],
};

export const allSubjects = Object.values(courseCategories).flat();

export const programData: Program[] = [
  // STEM & Engineering
  {
    courseId: 'aero_bsc',
    degreeLevel: 'BSc',
    subject: 'Aerospace / Aeronautical Engineering',
    tuitionRangeEUR: { min: 2000, max: 8500 },
    typicalLanguage: 'English',
    notes: 'Many Eastern European programs; check accreditation and lab fees.',
    estTotalCost: {
      easternEurope: { min: 8000, max: 13500 },
      westernEurope: { min: 18000, max: 30000 },
    },
    commonDurationYears: 3,
    lastVerified: '2024-11-07',
  },
  {
    courseId: 'aero_msc',
    degreeLevel: 'MSc',
    subject: 'Aerospace / Aeronautical Engineering',
    tuitionRangeEUR: { min: 2500, max: 9000 },
    typicalLanguage: 'English',
    notes: 'Specialized MSc can be slightly higher. Strong programs in Poland and Czech Republic.',
    estTotalCost: {
      easternEurope: { min: 9000, max: 15000 },
      westernEurope: { min: 20000, max: 32000 },
    },
    commonDurationYears: 2,
    lastVerified: '2024-11-07',
  },
  {
    courseId: 'cs_bsc',
    degreeLevel: 'BSc',
    subject: 'Computer Science / Software Engineering',
    tuitionRangeEUR: { min: 2000, max: 8000 },
    typicalLanguage: 'English',
    notes: 'Very popular program, wide availability in English across Europe.',
    estTotalCost: {
      easternEurope: { min: 7500, max: 14000 },
      westernEurope: { min: 19000, max: 28000 },
    },
    commonDurationYears: 3,
    lastVerified: '2024-11-07',
  },
  {
    courseId: 'cs_msc',
    degreeLevel: 'MSc',
    subject: 'Computer Science / Software Engineering',
    tuitionRangeEUR: { min: 3000, max: 12000 },
    typicalLanguage: 'English',
    notes: 'AI/Data Science specializations may be at the higher end of the tuition range.',
    estTotalCost: {
      easternEurope: { min: 9500, max: 18000 },
      westernEurope: { min: 22000, max: 35000 },
    },
    commonDurationYears: 2,
    lastVerified: '2024-11-07',
  },
  // Health & Medical
  {
    courseId: 'md',
    degreeLevel: 'BSc', // MD is often an integrated Bachelor's/Master's
    subject: 'Medicine (MD / integrated programmes)',
    tuitionRangeEUR: { min: 8000, max: 15000 },
    typicalLanguage: 'English + Local',
    notes: 'Most English MD programs are >€10k. Clinical placements often require local language proficiency.',
    estTotalCost: {
      easternEurope: { min: 17000, max: 26000 },
      westernEurope: { min: 28000, max: 40000 }, // Often much higher
    },
    commonDurationYears: 6,
    lastVerified: '2024-11-07',
  },
  {
    courseId: 'nursing_bsc',
    degreeLevel: 'BSc',
    subject: 'Nursing (BSc / MSc)',
    tuitionRangeEUR: { min: 3000, max: 10500 },
    typicalLanguage: 'English + Local',
    notes: 'Clinical practice is a core component and requires communication with local patients.',
    estTotalCost: {
      easternEurope: { min: 9000, max: 16000 },
      westernEurope: { min: 20000, max: 30000 },
    },
    commonDurationYears: 3,
    lastVerified: '2024-11-07',
  },
  // Business
  {
    courseId: 'bba_bsc',
    degreeLevel: 'BSc',
    subject: 'Business Administration / BBA / MSc Management',
    tuitionRangeEUR: { min: 1500, max: 7500 },
    typicalLanguage: 'English',
    notes: 'Widely available at very affordable rates, especially in the Baltics and Poland.',
    estTotalCost: {
      easternEurope: { min: 7000, max: 13000 },
      westernEurope: { min: 18000, max: 27000 },
    },
    commonDurationYears: 3,
    lastVerified: '2024-11-07',
  },
  {
    courseId: 'mgmt_msc',
    degreeLevel: 'MSc',
    subject: 'Business Administration / BBA / MSc Management',
    tuitionRangeEUR: { min: 2000, max: 12000 },
    typicalLanguage: 'English',
    notes: 'Top business schools in Western Europe will be at the higher end or exceed this range.',
    estTotalCost: {
      easternEurope: { min: 8000, max: 17000 },
      westernEurope: { min: 22000, max: 35000 },
    },
    commonDurationYears: 1,
    lastVerified: '2024-11-07',
  },
];
