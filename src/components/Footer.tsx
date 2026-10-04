import React from "react";
import { Link } from "react-router-dom";
import BarangayLogo from "./BarangayLogo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-600 text-white">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3 lg:col-span-1">
            <BarangayLogo className="h-14 w-14" />
            <p className="font-display text-lg font-semibold leading-snug">Barangay Poblacion Albuera</p>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold tracking-wide">USEFUL LINKS</p>
            <ul className="space-y-2 text-sm text-white/85">
              <li><Link className="hover:text-white hover:underline" to="/">Home</Link></li>
              <li><Link className="hover:text-white hover:underline" to="/about">About</Link></li>
              <li><Link className="hover:text-white hover:underline" to="/services">Services</Link></li>
              <li><Link className="hover:text-white hover:underline" to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold tracking-wide">OUR SERVICES</p>
            <ul className="space-y-2 text-sm text-white/85">
              <li>Barangay Clearance</li>
              <li>Certificate of Residency</li>
              <li>Certificate of Indigency</li>
              <li>Business Clearance</li>
              <li>Blotter Report</li>
              <li>Vaccination Scheduling</li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold tracking-wide">CONTACT US</p>
            <ul className="space-y-2 text-sm text-white/85">
              <li>Poblacion, Albuera, Leyte</li>
              <li>(+63) 909-491-1735</li>
              <li>barangaypoblacion.albuera@gov.ph</li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-white/15" />

        <div className="text-center text-xs text-white/70">
          <p>© {new Date().getFullYear()} E-Barangay Poblacion Albuera Portal. All Rights Reserved.</p>
          <p className="mt-1">
            <Link to="/admin/login" className="text-white/50 hover:text-white/80">Administrator login</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
