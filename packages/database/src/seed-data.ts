export const HEALTH_AUTHORITIES = [
  {
    name: "Dubai Health Authority",
    acronym: "DHA",
    country: "UAE",
    description: "The health regulatory authority for Dubai, UAE"
  },
  {
    name: "Ministry of Health and Prevention",
    acronym: "MOHAP",
    country: "UAE",
    description: "Federal health authority for the United Arab Emirates"
  },
  {
    name: "Department of Health - Abu Dhabi",
    acronym: "DOH",
    country: "UAE",
    description: "Health regulatory authority for Abu Dhabi, UAE"
  },
  {
    name: "Saudi Commission for Health Specialties",
    acronym: "SCFHS",
    country: "Saudi Arabia",
    description: "SMLE licensing examination authority for Saudi Arabia"
  },
  {
    name: "Qatar Council for Healthcare Practitioners",
    acronym: "QCHP",
    country: "Qatar",
    description: "QCHP exam authority for Qatar healthcare licensing"
  },
  {
    name: "Oman Medical Specialty Board",
    acronym: "OMSB",
    country: "Oman",
    description: "Medical licensing authority for Oman"
  },
  {
    name: "National Health Regulatory Authority",
    acronym: "NHRA",
    country: "Bahrain",
    description: "Health regulatory authority for Bahrain"
  },
  {
    name: "Kuwait Medical Licensing Examination",
    acronym: "KMLE",
    country: "Kuwait",
    description: "Medical licensing examination authority for Kuwait"
  }
];

export const SPECIALTIES = [
  // Physicians
  {
    name: "General Practitioner (GP)",
    description: "Primary care physician providing comprehensive healthcare"
  },
  {
    name: "Internal Medicine",
    description: "Specialists in the diagnosis and treatment of adult diseases"
  },
  {
    name: "Pediatrics",
    description: "Medical care of infants, children, and adolescents"
  },
  {
    name: "General Surgery",
    description: "Surgical treatment of a broad spectrum of diseases"
  },
  {
    name: "Obstetrics & Gynecology",
    description: "Women's reproductive health and childbirth"
  },
  {
    name: "Anesthesiology",
    description: "Perioperative care and pain management"
  },
  {
    name: "Emergency Medicine",
    description: "Acute care for patients with urgent medical conditions"
  },
  {
    name: "Family Medicine",
    description: "Comprehensive healthcare for individuals and families"
  },
  {
    name: "Radiology",
    description: "Medical imaging and diagnostic procedures"
  },
  {
    name: "Dermatology",
    description: "Diagnosis and treatment of skin conditions"
  },
  {
    name: "Psychiatry",
    description: "Mental health and behavioral disorders"
  },
  {
    name: "Ophthalmology",
    description: "Eye and vision care"
  },
  {
    name: "Orthopedics",
    description: "Musculoskeletal system disorders and injuries"
  },

  // Dental
  {
    name: "General Dentist",
    description: "Oral health care and dental procedures"
  },
  {
    name: "Orthodontist",
    description: "Correction of teeth and jaw alignment"
  },
  {
    name: "Endodontist",
    description: "Root canal therapy and dental pulp treatment"
  },

  // Nursing
  {
    name: "Registered Nurse",
    description: "Professional nursing care and patient advocacy"
  },
  {
    name: "Assistant Nurse",
    description: "Support nursing care under supervision"
  },
  {
    name: "Midwife",
    description: "Maternal and newborn care during childbirth"
  },

  // Pharmacy
  {
    name: "Clinical Pharmacist",
    description: "Medication therapy management and patient care"
  },
  {
    name: "Pharmacy Technician",
    description: "Pharmaceutical support and medication dispensing"
  },

  // Allied Health
  {
    name: "Physiotherapist",
    description: "Physical rehabilitation and movement therapy"
  },
  {
    name: "Medical Laboratory Technician",
    description: "Laboratory testing and diagnostic procedures"
  },
  {
    name: "Radiographer",
    description: "Medical imaging and radiation therapy"
  },
  {
    name: "Dietitian",
    description: "Nutrition therapy and dietary counseling"
  },
  {
    name: "Respiratory Therapist",
    description: "Respiratory care and breathing treatments"
  }
];

export const SAMPLE_SUBSCRIPTION_PLANS = [
  {
    name: "GP - DHA Pro",
    price: 199.99,
    currency: "AED",
    durationDays: 90,
    specialtyName: "General Practitioner (GP)",
    authorityAcronym: "DHA"
  },
  {
    name: "GP - All GCC Access",
    price: 499.99,
    currency: "AED",
    durationDays: 365,
    specialtyName: "General Practitioner (GP)",
    authorityAcronym: null // All authorities
  },
  {
    name: "Nursing - MOHAP Essential",
    price: 149.99,
    currency: "AED",
    durationDays: 60,
    specialtyName: "Registered Nurse",
    authorityAcronym: "MOHAP"
  },
  {
    name: "Internal Medicine - SCFHS Premium",
    price: 299.99,
    currency: "SAR",
    durationDays: 180,
    specialtyName: "Internal Medicine",
    authorityAcronym: "SCFHS"
  },
  {
    name: "Pharmacy - All Access",
    price: 399.99,
    currency: "USD",
    durationDays: 365,
    specialtyName: "Clinical Pharmacist",
    authorityAcronym: null
  }
];

export const SAMPLE_QUESTIONS = [
  {
    questionText: "A 45-year-old patient presents with chest pain radiating to the left arm and jaw. The ECG shows ST-elevation in leads V1-V4. What is the most likely diagnosis?",
    questionType: "SBA" as const,
    options: [
      { text: "Unstable angina", isCorrect: false },
      { text: "Anterior STEMI", isCorrect: true },
      { text: "Posterior STEMI", isCorrect: false },
      { text: "Pericarditis", isCorrect: false }
    ],
    explanation: "ST-elevation in leads V1-V4 indicates an anterior ST-elevation myocardial infarction (STEMI). This pattern is characteristic of occlusion of the left anterior descending (LAD) coronary artery.",
    references: "ESC Guidelines for STEMI 2017",
    tags: ["Cardiology", "Emergency Medicine", "ECG"],
    authorities: ["DHA", "MOHAP", "SCFHS"],
    specialties: ["General Practitioner (GP)", "Internal Medicine", "Emergency Medicine"]
  },
  {
    questionText: "Which of the following medications are contraindicated in pregnancy? (Select all that apply)",
    questionType: "MCQ" as const,
    options: [
      { text: "ACE inhibitors", isCorrect: true },
      { text: "Warfarin", isCorrect: true },
      { text: "Insulin", isCorrect: false },
      { text: "Isotretinoin", isCorrect: true },
      { text: "Paracetamol", isCorrect: false }
    ],
    explanation: "ACE inhibitors, warfarin, and isotretinoin are contraindicated in pregnancy due to teratogenic effects. Insulin and paracetamol are considered safe when used appropriately.",
    references: "BNF Pregnancy Guidelines",
    tags: ["Obstetrics", "Pharmacology", "Pregnancy"],
    authorities: ["DHA", "MOHAP", "DOH"],
    specialties: ["General Practitioner (GP)", "Obstetrics & Gynecology"]
  },
  {
    questionText: "Handwashing with alcohol-based hand rub is more effective than soap and water for routine hand hygiene.",
    questionType: "TRUE_FALSE" as const,
    options: [
      { text: "True", isCorrect: true },
      { text: "False", isCorrect: false }
    ],
    explanation: "Alcohol-based hand rubs are more effective than soap and water for routine hand hygiene when hands are not visibly soiled. They provide better antimicrobial efficacy and are faster to use.",
    references: "WHO Hand Hygiene Guidelines",
    tags: ["Infection Control", "Public Health"],
    authorities: ["DHA", "MOHAP", "QCHP", "NHRA"],
    specialties: ["Registered Nurse", "General Practitioner (GP)", "Internal Medicine"]
  }
];