import React from "react";
import { PageHeader, Card } from "../../components/ui";
import { seedOfficials } from "../../data/mockData";

const OfficialsPage: React.FC = () => {
  const [chair, ...rest] = seedOfficials;

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <PageHeader eyebrow="2023 – 2026 Term" title="Barangay Officials" blurb="The elected and appointed officials of Barangay Poblacion, Albuera." />

      <Card className="mb-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <span className="seal flex h-16 w-16 shrink-0 items-center justify-center font-display text-lg text-white">
          {chair.photoInitials}
        </span>
        <div>
          <p className="eyebrow">{chair.position}</p>
          <p className="mt-0.5 font-display text-xl text-navy">{chair.name}</p>
          <p className="mt-1 text-sm text-navy-400">{chair.committee} · Term {chair.termStart}–{chair.termEnd}</p>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((o) => (
          <Card key={o.id} className="flex items-center gap-4">
            <span className="seal flex h-12 w-12 shrink-0 items-center justify-center font-display text-sm text-white">
              {o.photoInitials}
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-base text-navy">{o.name}</p>
              <p className="text-xs font-semibold text-harbor">{o.position}</p>
              <p className="text-xs text-navy-400">{o.committee}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OfficialsPage;
