import React, { useState } from "react";
import { NavLink, Outlet, Navigate, Link } from "react-router-dom";
import { FileText, AlertTriangle, ListChecks, History, LogOut, Menu, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import BarangayLogo from "./BarangayLogo";

const items = [
  { to: "/resident/request-documents", label: "Request Documents", icon: FileText },
  { to: "/resident/report-incident", label: "Report Incident", icon: AlertTriangle },
  { to: "/resident/track-request", label: "Track Request", icon: ListChecks },
  { to: "/resident/history", label: "Request History", icon: History }
];

const ResidentLayout: React.FC = () => {
  const { currentResident, logoutResident } = useApp();
  const [open, setOpen] = useState(false);

  if (!currentResident) return <Navigate to="/resident/login" replace />;

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-navy-100 bg-navy px-5 py-3 text-white">
        <div className="flex items-center gap-3">
          <button className="rounded p-1 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <BarangayLogo className="h-8 w-8" />
            <span className="font-display text-base font-semibold">Resident Portal</span>
          </Link>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="hidden sm:inline text-navy-100">
            {currentResident.firstName} {currentResident.lastName}
          </span>
          <button
            onClick={logoutResident}
            className="flex items-center gap-1 rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold hover:bg-white/10"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl">
        <aside
          className={`${
            open ? "block" : "hidden"
          } w-full shrink-0 border-b border-navy-100 bg-white px-4 py-4 lg:block lg:w-64 lg:border-b-0 lg:border-r lg:px-3 lg:py-6`}
        >
          <nav className="space-y-1">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-navy-50 text-navy" : "text-navy-400 hover:bg-navy-50/60"
                  }`
                }
              >
                <it.icon size={17} />
                {it.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 flex-1 px-5 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ResidentLayout;
