import type {
  Resident,
  DocumentRequest,
  Incident,
  Announcement,
  Official,
  EmergencyContact
} from "../types";

export const seedResidents: Resident[] = [
  {
    id: "RES-0001",
    firstName: "Maria",
    middleName: "Reyes",
    lastName: "Santos",
    birthDate: "1990-04-12",
    age: 36,
    gender: "Female",
    religion: "Roman Catholic",
    placeOfBirth: "Albuera, Leyte",
    nationality: "Filipino",
    civilStatus: "Married",
    address: "Purok 3, Poblacion, Albuera, Leyte",
    purok: "Purok 3",
    yearsOfResidency: 15,
    voterStatus: "Registered Voter",
    contactNumber: "0917 123 4567",
    email: "maria.santos@example.com",
    username: "maria.santos",
    password: "password123",
    dateRegistered: "2025-01-14",
    status: "Active"
  },
  {
    id: "RES-0002",
    firstName: "Jerome",
    middleName: "Alonzo",
    lastName: "Dizon",
    birthDate: "1985-09-02",
    age: 40,
    gender: "Male",
    religion: "Roman Catholic",
    placeOfBirth: "Ormoc City, Leyte",
    nationality: "Filipino",
    civilStatus: "Single",
    address: "Purok 6, Poblacion, Albuera, Leyte",
    purok: "Purok 6",
    yearsOfResidency: 10,
    voterStatus: "Registered Voter",
    contactNumber: "0918 555 2210",
    email: "jerome.dizon@example.com",
    username: "jerome.dizon",
    password: "password123",
    dateRegistered: "2025-02-20",
    status: "Active"
  }
];

export const seedRequests: DocumentRequest[] = [
  {
    id: "DR-0001",
    referenceNo: "BA-DR-2026-0142",
    residentId: "RES-0001",
    residentName: "Maria Santos",
    type: "Barangay Clearance",
    purpose: "Employment requirement",
    status: "Processing",
    dateFiled: "2026-08-24",
    lastUpdated: "2026-08-25"
  },
  {
    id: "DR-0002",
    referenceNo: "BA-DR-2026-0139",
    residentId: "RES-0001",
    residentName: "Maria Santos",
    type: "Certificate of Residency",
    purpose: "School enrollment",
    status: "Released",
    dateFiled: "2026-07-30",
    lastUpdated: "2026-08-02"
  },
  {
    id: "DR-0003",
    referenceNo: "BA-DR-2026-0145",
    residentId: "RES-0002",
    residentName: "Jerome Dizon",
    type: "Certificate of Indigency",
    purpose: "Medical assistance application",
    status: "Pending",
    dateFiled: "2026-08-27",
    lastUpdated: "2026-08-27"
  }
];

export const seedIncidents: Incident[] = [
  {
    id: "INC-0001",
    referenceNo: "BA-INC-2026-0031",
    residentId: "RES-0002",
    reporterName: "Jerome Dizon",
    category: "Noise Complaint",
    location: "Purok 6, near the basketball court",
    description: "Continuous loud videoke past 11 PM disturbing nearby households.",
    dateFiled: "2026-08-20",
    incidentDate: "2026-08-19",
    status: "Under Investigation",
    isAnonymous: false
  }
];

export const seedAnnouncements: Announcement[] = [
  {
    id: "ANN-0001",
    title: "Free Anti-Rabies Vaccination for Pets",
    body: "The Barangay Health Center, in partnership with the Municipal Veterinary Office, will conduct a free anti-rabies vaccination drive for dogs and cats. Bring your pet on a leash or in a carrier.",
    category: "Health",
    datePosted: "2026-08-26",
    pinned: true
  },
  {
    id: "ANN-0002",
    title: "Barangay Assembly – Q3 Community Meeting",
    body: "All household representatives are invited to the quarterly barangay assembly to discuss the community budget, ongoing projects, and peace and order updates.",
    category: "General",
    datePosted: "2026-08-22",
    pinned: true
  },
  {
    id: "ANN-0003",
    title: "Advisory: Water Interruption on Purok 2–4",
    body: "A scheduled maintenance activity by the Albuera Water District will cause intermittent water supply interruption. Please store water in advance.",
    category: "Advisory",
    datePosted: "2026-08-19",
    pinned: false
  },
  {
    id: "ANN-0004",
    title: "Nightly Patrol Schedule Update",
    body: "The Barangay Peacekeeping Action Team has updated its nightly patrol routes to cover additional areas following recent reports.",
    category: "Peace & Order",
    datePosted: "2026-08-15",
    pinned: false
  }
];

export const seedOfficials: Official[] = [
  {
    id: "OFF-01",
    name: "Hon. Ricardo P. Villanueva",
    position: "Punong Barangay",
    committee: "Overall Barangay Governance",
    photoInitials: "RV",
    termStart: "2023",
    termEnd: "2026"
  },
  {
    id: "OFF-02",
    name: "Hon. Corazon M. Ibarra",
    position: "Barangay Kagawad",
    committee: "Health & Sanitation",
    photoInitials: "CI",
    termStart: "2023",
    termEnd: "2026"
  },
  {
    id: "OFF-03",
    name: "Hon. Danilo S. Reyes",
    position: "Barangay Kagawad",
    committee: "Peace & Order",
    photoInitials: "DR",
    termStart: "2023",
    termEnd: "2026"
  },
  {
    id: "OFF-04",
    name: "Hon. Estela T. Bautista",
    position: "Barangay Kagawad",
    committee: "Education & Social Services",
    photoInitials: "EB",
    termStart: "2023",
    termEnd: "2026"
  },
  {
    id: "OFF-05",
    name: "Hon. Marco A. Fernandez",
    position: "Barangay Kagawad",
    committee: "Infrastructure & Environment",
    photoInitials: "MF",
    termStart: "2023",
    termEnd: "2026"
  },
  {
    id: "OFF-06",
    name: "Hon. Liza P. Alvarado",
    position: "SK Chairperson",
    committee: "Youth & Sports Development",
    photoInitials: "LA",
    termStart: "2023",
    termEnd: "2026"
  },
  {
    id: "OFF-07",
    name: "Ms. Teresita G. Ocampo",
    position: "Barangay Secretary",
    committee: "Records & Administration",
    photoInitials: "TO",
    termStart: "2023",
    termEnd: "2026"
  },
  {
    id: "OFF-08",
    name: "Mr. Alfredo N. Cruz",
    position: "Barangay Treasurer",
    committee: "Finance",
    photoInitials: "AC",
    termStart: "2023",
    termEnd: "2026"
  }
];

export const seedEmergencyContacts: EmergencyContact[] = [
  {
    id: "EC-01",
    office: "Barangay Tanod / Peacekeeping Action Team",
    person: "Duty Tanod",
    number: "0917 000 1101",
    hours: "24/7"
  },
  {
    id: "EC-02",
    office: "Barangay Health Station",
    person: "Midwife on Duty",
    number: "0917 000 1102",
    hours: "8:00 AM – 5:00 PM"
  },
  {
    id: "EC-03",
    office: "Albuera Municipal Police Station",
    person: "PNP Albuera",
    number: "(053) 000-1122",
    hours: "24/7"
  },
  {
    id: "EC-04",
    office: "Bureau of Fire Protection – Albuera",
    person: "BFP Albuera",
    number: "(053) 000-1133",
    hours: "24/7"
  },
  {
    id: "EC-05",
    office: "Municipal Disaster Risk Reduction (MDRRMO)",
    person: "MDRRMO Albuera",
    number: "0918 000 1144",
    hours: "24/7"
  },
  {
    id: "EC-06",
    office: "Rural Health Unit – Albuera",
    person: "RHU Albuera",
    number: "(053) 000-1155",
    hours: "8:00 AM – 5:00 PM"
  }
];
