import React from "react";
import { PageHeader, Card } from "../../components/ui";
import { seedEmergencyContacts } from "../../data/mockData";
import { PhoneCall, Clock } from "lucide-react";

const EmergencyContactsPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <PageHeader
        eyebrow="Save these numbers"
        title="Emergency Contacts"
        blurb="For life-threatening emergencies, call these lines directly rather than filing a report through the portal."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {seedEmergencyContacts.map((c) => (
          <Card key={c.id} className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-base text-navy">{c.office}</p>
              <p className="text-xs text-navy-400">{c.person}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-navy-400">
                <Clock size={12} /> {c.hours}
              </p>
            </div>
            <a
              href={`tel:${c.number.replace(/\s/g, "")}`}
              className="flex shrink-0 items-center gap-1.5 rounded-md bg-navy-50 px-3 py-2 font-mono text-xs font-semibold text-navy hover:bg-navy-100"
            >
              <PhoneCall size={13} /> {c.number}
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContactsPage;
