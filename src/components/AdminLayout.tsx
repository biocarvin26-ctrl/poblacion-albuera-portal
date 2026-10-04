import React, { useState } from "react";
import { NavLink, Outlet, Navigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  AlertOctagon,
  Megaphone,
  BarChart3,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useApp } from "../context/AppContext";
import BarangayLogo from "./BarangayLogo";

const items = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/residents", label: "Manage Residents", icon: Users },
  { to: "/admin/requests", label: "Manage Requests", icon: ClipboardList },
  { to: "/admin/incidents", label: "Manage Incidents", icon: AlertOctagon },
  { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { to: "/admin/reports", label: "Reports", icon: BarChart3 }
];

const AdminLayout: React.FC = () => {
  const { isAdmin, logoutAdmin } = useApp();
  const [open, setOpen] = useState(false);

  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-navy-50/40">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-navy-100 bg-navy-800 px-5 py-3 text-white">
        <div className="flex items-center gap-3">
          <button className="rounded p-1 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <BarangayLogo className="h-8 w-8" />
            <span className="font-display text-base font-semibold">Barangay Admin Console</span>
          </Link>
        </div>
        <button
          onClick={logoutAdmin}
          className="flex items-center gap-1 rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold hover:bg-white/10"
        >
          <LogOut size={14} /> Log Out
        </button>
      </header>

      <div className="mx-auto flex max-w-7xl">
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

export default AdminLayout;
