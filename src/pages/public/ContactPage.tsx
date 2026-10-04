import React, { useState } from "react";
import { AlertBanner } from "../../components/ui";
import { MapPin, Phone, Mail, Clock, Siren } from "lucide-react";

const info = [
  { icon: MapPin, label: "Barangay Hall", value: "Poblacion, Albuera, Leyte" },
  { icon: Phone, label: "Contact Number", value: "(+63) 909-491-1735" },
  { icon: Mail, label: "Email", value: "barangaypoblacion.albuera@gov.ph" },
  { icon: Clock, label: "Office Hours", value: "Monday to Friday, 8:00 AM to 5:00 PM" },
  { icon: Siren, label: "Emergency", value: "Contact authorities immediately" }
];

const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-navy-50/40">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <h1 className="text-center font-display text-3xl font-bold text-navy-800">Contact</h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-8 rounded-2xl border border-navy-100 bg-white p-8">
            {info.map((i) => (
              <div key={i.label} className="flex items-start gap-4">
                <i.icon className="mt-0.5 shrink-0 text-navy-600" size={22} />
                <div>
                  <p className="font-display text-base font-semibold text-navy-800">{i.label}</p>
                  <p className="text-sm text-navy-400">{i.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-navy-100 bg-white p-8">
            <h2 className="text-center font-display text-xl font-bold text-navy-800">Send Us a Message</h2>
            {sent && (
              <div className="mt-4">
                <AlertBanner kind="success">Your message has been sent. Thank you for reaching out.</AlertBanner>
              </div>
            )}
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-navy-800">Full Name</label>
                <input required placeholder="Full Name" className="w-full rounded-md border-2 border-navy-600/70 px-4 py-3 text-sm focus:border-navy-600 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-navy-800">Email Address</label>
                <input required type="email" placeholder="Email" className="w-full rounded-md border-2 border-navy-600/70 px-4 py-3 text-sm focus:border-navy-600 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-navy-800">Message</label>
                <input required placeholder="Message" className="w-full rounded-md border-2 border-navy-600/70 px-4 py-3 text-sm focus:border-navy-600 focus:outline-none" />
              </div>
              <button type="submit" className="w-full rounded-md bg-navy-600 py-3.5 text-sm font-bold text-white hover:bg-navy-700">
                SEND MESSAGE
              </button>
            </form>
            <p className="mt-5 text-center text-sm text-navy-400">Together for Our Community</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
