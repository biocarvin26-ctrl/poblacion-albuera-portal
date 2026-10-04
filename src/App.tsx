import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import PublicLayout from "./components/PublicLayout";
import ResidentLayout from "./components/ResidentLayout";
import AdminLayout from "./components/AdminLayout";

import Home from "./pages/public/Home";
import AboutBarangay from "./pages/public/AboutBarangay";
import Services from "./pages/public/Services";
import AnnouncementsPage from "./pages/public/AnnouncementsPage";
import OfficialsPage from "./pages/public/OfficialsPage";
import EmergencyContactsPage from "./pages/public/EmergencyContactsPage";
import ContactPage from "./pages/public/ContactPage";

import ResidentLogin from "./pages/resident/ResidentLogin";
import ResidentRegister from "./pages/resident/ResidentRegister";
import RequestDocuments from "./pages/resident/RequestDocuments";
import ReportIncident from "./pages/resident/ReportIncident";
import TrackRequest from "./pages/resident/TrackRequest";
import RequestHistory from "./pages/resident/RequestHistory";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ManageResidents from "./pages/admin/ManageResidents";
import ManageRequests from "./pages/admin/ManageRequests";
import ManageIncidents from "./pages/admin/ManageIncidents";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import Reports from "./pages/admin/Reports";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutBarangay />} />
        <Route path="/services" element={<Services />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/officials" element={<OfficialsPage />} />
        <Route path="/emergency-contacts" element={<EmergencyContactsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Resident auth (no sidebar) */}
      <Route path="/resident/login" element={<ResidentLogin />} />
      <Route path="/resident/register" element={<ResidentRegister />} />

      {/* Resident portal (protected) */}
      <Route path="/resident" element={<ResidentLayout />}>
        <Route path="request-documents" element={<RequestDocuments />} />
        <Route path="report-incident" element={<ReportIncident />} />
        <Route path="track-request" element={<TrackRequest />} />
        <Route path="history" element={<RequestHistory />} />
      </Route>

      {/* Admin auth (no sidebar) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin console (protected) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="residents" element={<ManageResidents />} />
        <Route path="requests" element={<ManageRequests />} />
        <Route path="incidents" element={<ManageIncidents />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
