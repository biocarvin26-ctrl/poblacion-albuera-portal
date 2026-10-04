import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type {
  Resident,
  DocumentRequest,
  Incident,
  Announcement,
  RequestStatus,
  IncidentStatus,
  DocumentType,
  IncidentCategory
} from "../types";
import {
  seedResidents,
  seedRequests,
  seedIncidents,
  seedAnnouncements
} from "../data/mockData";

const STORAGE_KEY = "poblacion-albuera-portal-v1";

interface StoredState {
  residents: Resident[];
  requests: DocumentRequest[];
  incidents: Incident[];
  announcements: Announcement[];
}

function loadState(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoredState;
  } catch {
    // fall through to seed
  }
  return {
    residents: seedResidents,
    requests: seedRequests,
    incidents: seedIncidents,
    announcements: seedAnnouncements
  };
}

interface AppContextValue {
  residents: Resident[];
  requests: DocumentRequest[];
  incidents: Incident[];
  announcements: Announcement[];

  currentResident: Resident | null;
  isAdmin: boolean;

  registerResident: (r: Omit<Resident, "id" | "dateRegistered" | "status">) => { ok: boolean; message: string };
  loginResident: (email: string, password: string) => { ok: boolean; message: string };
  logoutResident: () => void;

  loginAdmin: (username: string, password: string) => { ok: boolean; message: string };
  logoutAdmin: () => void;

  fileDocumentRequest: (input: {
    type: DocumentType;
    purpose: string;
  }) => { ok: boolean; message: string; referenceNo?: string };

  fileIncident: (input: {
    category: IncidentCategory;
    location: string;
    description: string;
    incidentDate: string;
    isAnonymous: boolean;
  }) => { ok: boolean; message: string; referenceNo?: string };

  updateRequestStatus: (id: string, status: RequestStatus, notes?: string) => void;
  updateIncidentStatus: (id: string, status: IncidentStatus) => void;
  updateResidentStatus: (id: string, status: Resident["status"]) => void;
  removeResident: (id: string) => void;

  addAnnouncement: (a: Omit<Announcement, "id" | "datePosted">) => void;
  removeAnnouncement: (id: string) => void;
  togglePinAnnouncement: (id: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

function genRef(prefix: string) {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `BA-${prefix}-${year}-${rand}`;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<StoredState>(loadState);
  const [currentResident, setCurrentResident] = useState<Resident | null>(() => {
    const savedId = sessionStorage.getItem("current-resident-id");
    if (!savedId) return null;
    const s = loadState();
    return s.residents.find((r) => r.id === savedId) ?? null;
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(() => sessionStorage.getItem("is-admin") === "true");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const registerResident: AppContextValue["registerResident"] = (r) => {
    if (state.residents.some((res) => res.email.toLowerCase() === r.email.toLowerCase())) {
      return { ok: false, message: "An account with this email already exists." };
    }
    if (state.residents.some((res) => res.username.toLowerCase() === r.username.toLowerCase())) {
      return { ok: false, message: "This username is already taken." };
    }
    const newResident: Resident = {
      ...r,
      id: `RES-${String(state.residents.length + 1).padStart(4, "0")}`,
      dateRegistered: new Date().toISOString().slice(0, 10),
      status: "Pending Verification"
    };
    setState((s) => ({ ...s, residents: [...s.residents, newResident] }));
    return { ok: true, message: "Registration submitted. You may now log in; verification is pending at the barangay office." };
  };

  const loginResident: AppContextValue["loginResident"] = (email, password) => {
    const found = state.residents.find(
      (r) => r.email.toLowerCase() === email.toLowerCase() && r.password === password
    );
    if (!found) return { ok: false, message: "Incorrect email or password." };
    if (found.status === "Suspended") return { ok: false, message: "This account has been suspended. Visit the barangay office for assistance." };
    setCurrentResident(found);
    sessionStorage.setItem("current-resident-id", found.id);
    return { ok: true, message: "Logged in successfully." };
  };

  const logoutResident = () => {
    setCurrentResident(null);
    sessionStorage.removeItem("current-resident-id");
  };

  const loginAdmin: AppContextValue["loginAdmin"] = (username, password) => {
    if (username === "admin" && password === "albuera2026") {
      setIsAdmin(true);
      sessionStorage.setItem("is-admin", "true");
      return { ok: true, message: "Welcome back, Admin." };
    }
    return { ok: false, message: "Invalid administrator credentials." };
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("is-admin");
  };

  const fileDocumentRequest: AppContextValue["fileDocumentRequest"] = ({ type, purpose }) => {
    if (!currentResident) return { ok: false, message: "You must be logged in to request a document." };
    const referenceNo = genRef("DR");
    const today = new Date().toISOString().slice(0, 10);
    const newRequest: DocumentRequest = {
      id: `DR-${Date.now()}`,
      referenceNo,
      residentId: currentResident.id,
      residentName: `${currentResident.firstName} ${currentResident.lastName}`,
      type,
      purpose,
      status: "Pending",
      dateFiled: today,
      lastUpdated: today
    };
    setState((s) => ({ ...s, requests: [newRequest, ...s.requests] }));
    return { ok: true, message: "Request filed successfully.", referenceNo };
  };

  const fileIncident: AppContextValue["fileIncident"] = ({ category, location, description, incidentDate, isAnonymous }) => {
    if (!currentResident) return { ok: false, message: "You must be logged in to report an incident." };
    const referenceNo = genRef("INC");
    const today = new Date().toISOString().slice(0, 10);
    const newIncident: Incident = {
      id: `INC-${Date.now()}`,
      referenceNo,
      residentId: currentResident.id,
      reporterName: isAnonymous ? "Anonymous" : `${currentResident.firstName} ${currentResident.lastName}`,
      category,
      location,
      description,
      dateFiled: today,
      incidentDate,
      status: "Filed",
      isAnonymous
    };
    setState((s) => ({ ...s, incidents: [newIncident, ...s.incidents] }));
    return { ok: true, message: "Incident report submitted.", referenceNo };
  };

  const updateRequestStatus: AppContextValue["updateRequestStatus"] = (id, status, notes) => {
    setState((s) => ({
      ...s,
      requests: s.requests.map((r) =>
        r.id === id ? { ...r, status, notes: notes ?? r.notes, lastUpdated: new Date().toISOString().slice(0, 10) } : r
      )
    }));
  };

  const updateIncidentStatus: AppContextValue["updateIncidentStatus"] = (id, status) => {
    setState((s) => ({
      ...s,
      incidents: s.incidents.map((i) => (i.id === id ? { ...i, status } : i))
    }));
  };

  const updateResidentStatus: AppContextValue["updateResidentStatus"] = (id, status) => {
    setState((s) => ({
      ...s,
      residents: s.residents.map((r) => (r.id === id ? { ...r, status } : r))
    }));
  };

  const removeResident: AppContextValue["removeResident"] = (id) => {
    setState((s) => ({ ...s, residents: s.residents.filter((r) => r.id !== id) }));
  };

  const addAnnouncement: AppContextValue["addAnnouncement"] = (a) => {
    const newAnnouncement: Announcement = {
      ...a,
      id: `ANN-${Date.now()}`,
      datePosted: new Date().toISOString().slice(0, 10)
    };
    setState((s) => ({ ...s, announcements: [newAnnouncement, ...s.announcements] }));
  };

  const removeAnnouncement: AppContextValue["removeAnnouncement"] = (id) => {
    setState((s) => ({ ...s, announcements: s.announcements.filter((a) => a.id !== id) }));
  };

  const togglePinAnnouncement: AppContextValue["togglePinAnnouncement"] = (id) => {
    setState((s) => ({
      ...s,
      announcements: s.announcements.map((a) => (a.id === id ? { ...a, pinned: !a.pinned } : a))
    }));
  };

  const value = useMemo<AppContextValue>(
    () => ({
      residents: state.residents,
      requests: state.requests,
      incidents: state.incidents,
      announcements: state.announcements,
      currentResident,
      isAdmin,
      registerResident,
      loginResident,
      logoutResident,
      loginAdmin,
      logoutAdmin,
      fileDocumentRequest,
      fileIncident,
      updateRequestStatus,
      updateIncidentStatus,
      updateResidentStatus,
      removeResident,
      addAnnouncement,
      removeAnnouncement,
      togglePinAnnouncement
    }),
    [state, currentResident, isAdmin]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
