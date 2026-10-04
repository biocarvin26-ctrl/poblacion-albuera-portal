import React from "react";
import { ListChecks } from "lucide-react";
import BarangayLogo from "../../components/BarangayLogo";

const steps = [
  'Click the "Register" button at the top-right corner of the homepage.',
  "Fill out the required information in the registration form.",
  "Submit the form and wait for verification.",
  "Once verified, you will receive a confirmation of your account status.",
  "Use your credentials to log in and access the E-Barangay services."
];

const AboutBarangay: React.FC = () => {
  return (
    <div>
      <div className="bg-white text-center">
        <div className="mx-auto max-w-3xl px-5 py-14">
          <h1 className="font-display text-3xl font-bold text-navy-800">About Us</h1>
          <p className="mt-3 text-navy-400">
            Welcome to E-Barangay Poblacion Albuera Portal. We are committed to providing
            efficient and convenient online services to our constituents.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-display text-xl font-semibold leading-snug text-navy-800">
            Our mission is to empower our community by delivering fast and reliable barangay
            services through digital innovation.
          </h2>
          <div className="mt-6 flex h-48 items-center justify-center rounded-xl bg-navy-50">
            <BarangayLogo className="h-32 w-32" />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-navy-400">
            Our commitment is to continuously enhance public service while promoting
            transparency, accessibility, and innovation in local governance. Together, we are
            building a smarter, more connected, and service-oriented Barangay Poblacion, Albuera.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-harbor">
            <ListChecks size={20} />
            <h2 className="font-display text-xl font-semibold text-navy-800">
              E-Barangay Resident Registration Guide
            </h2>
          </div>
          <ol className="mt-5 space-y-4">
            {steps.map((step, idx) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-600 text-xs font-bold text-white">
                  {idx + 1}
                </span>
                <p className="text-sm leading-relaxed text-navy-400">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AboutBarangay;
