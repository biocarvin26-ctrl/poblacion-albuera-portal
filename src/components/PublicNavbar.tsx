import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BarangayLogo from "./BarangayLogo";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/announcements", label: "Announcements" },
  { to: "/officials", label: "Officials" },
  { to: "/emergency-contacts", label: "Emergency" },
  { to: "/contact", label: "Contact" }
];

const PublicNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-navy-600 text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <BarangayLogo className="h-11 w-11" />
          <span className="font-display text-base font-semibold leading-tight sm:text-lg">
            Barangay Poblacion Albuera
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-white/15 text-white" : "text-white/85 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/resident/register"
            className="ml-3 rounded-md bg-white px-4 py-2 text-sm font-semibold text-navy-600 transition-colors hover:bg-navy-50"
          >
            Register
          </Link>
          <Link
            to="/resident/login"
            className="rounded-md border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Login
          </Link>
        </nav>

        <button
          className="rounded p-2 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-navy-600 px-5 pb-4 lg:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded px-3 py-2 text-sm font-medium ${isActive ? "bg-white/15 text-white" : "text-white/85"}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-2 flex gap-2 pt-2">
              <Link
                to="/resident/register"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-navy-600"
              >
                Register
              </Link>
              <Link
                to="/resident/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md border border-white/40 px-3 py-2 text-center text-sm font-semibold text-white"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default PublicNavbar;
