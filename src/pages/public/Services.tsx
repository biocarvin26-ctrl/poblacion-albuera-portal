import React from "react";
import { Link } from "react-router-dom";
import { FileCheck, IdCard, HeartHandshake, Briefcase, Flag, Syringe } from "lucide-react";

const services = [
  { icon: FileCheck, title: "Barangay Clearance", blurb: "Proof of no barangay record of reported offenses locally." },
  { icon: IdCard, title: "Barangay Residency", blurb: "Confirms that a person is a resident of the barangay." },
  { icon: HeartHandshake, title: "Barangay Indigency", blurb: "Issued to low-income individuals for aid, scholarships, or medical help." },
  { icon: Briefcase, title: "Barangay Business Clearance", blurb: "Permission for a business to operate within the barangay." },
  { icon: Flag, title: "Blotter Report", blurb: "Record of complaints or incidents filed at the barangay." },
  { icon: Syringe, title: "Vaccination", blurb: "Schedule a vaccination for your child. Fast and easy appointment request." }
];

const Services: React.FC = () => {
  return (
    <div>
      <div className="bg-white text-center">
        <div className="mx-auto max-w-2xl px-5 py-14">
          <h1 className="font-display text-3xl font-bold text-navy-800">Services</h1>
          <p className="mt-3 text-navy-400">
            Efficient document processing: quick and reliable issuance of barangay documents and
            certifications.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="flex flex-col items-center gap-3 rounded-3xl border-2 border-navy-100 bg-white p-8 text-center shadow-stamp"
            >
              <s.icon className="text-navy-600" size={56} strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold text-navy-800">{s.title}</h3>
              <p className="text-sm text-navy-400">{s.blurb}</p>
              <Link
                to="/resident/login"
                className="mt-2 rounded-full bg-navy-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-700"
              >
                Request now →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
