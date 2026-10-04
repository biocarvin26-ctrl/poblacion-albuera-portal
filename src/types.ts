export type DocumentType =
  | "Barangay Clearance"
  | "Certificate of Residency"
  | "Certificate of Indigency"
  | "Business Permit Endorsement"
  | "Barangay ID";

export type RequestStatus = "Pending" | "Processing" | "Ready for Pickup" | "Released" | "Rejected";

export type IncidentStatus = "Filed" | "Under Investigation" | "Resolved" | "Dismissed";

export type IncidentCategory =
  | "Noise Complaint"
  | "Public Disturbance"
  | "Property Dispute"
  | "Domestic Issue"
  | "Theft"
  | "Physical Injury"
  | "Others";

export type Gender = "Male" | "Female";
export type CivilStatus = "Single" | "Married" | "Separated" | "Widowed";
export type VoterStatus = "Registered Voter" | "Non-Voter" | "Not Applicable";

export interface Resident {
  id: string;
  // Personal information
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: string;
  age: number;
  gender: Gender;
  religion?: string;
  placeOfBirth: string;
  nationality: string;
  civilStatus: CivilStatus;
  // Residency information
  address: string;
  purok: string;
  yearsOfResidency: number;
  voterStatus: VoterStatus;
  // Contact information
  contactNumber: string;
  email: string;
  // Account information
  username: string;
  password: string; // demo only – never store plaintext in a real system
  dateRegistered: string;
  status: "Active" | "Pending Verification" | "Suspended";
}

export interface DocumentRequest {
  id: string;
  referenceNo: string;
  residentId: string;
  residentName: string;
  type: DocumentType;
  purpose: string;
  status: RequestStatus;
  dateFiled: string;
  lastUpdated: string;
  notes?: string;
}

export interface Incident {
  id: string;
  referenceNo: string;
  residentId: string;
  reporterName: string;
  category: IncidentCategory;
  location: string;
  description: string;
  dateFiled: string;
  incidentDate: string;
  status: IncidentStatus;
  isAnonymous: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  category: "Advisory" | "Event" | "Health" | "Peace & Order" | "General";
  datePosted: string;
  pinned: boolean;
}

export interface Official {
  id: string;
  name: string;
  position: string;
  committee: string;
  photoInitials: string;
  termStart: string;
  termEnd: string;
}

export interface EmergencyContact {
  id: string;
  office: string;
  person: string;
  number: string;
  hours: string;
}

export type AdminUser = {
  username: string;
  role: "Barangay Admin";
};
