import React from "react";
import { useApp } from "../../context/AppContext";
import { PageHeader, Card } from "../../components/ui";
import type { DocumentType, IncidentCategory } from "../../types";

function countBy<T extends string>(items: T[]): Record<string, number> {
  return items.reduce((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

const BarRow: React.FC<{ label: string; value: number; max: number; color?: string }> = ({ label, value, max, color = "bg-harbor" }) => (
  <div>
    <div className="mb-1 flex justify-between text-xs text-navy-400">
      <span>{label}</span>
      <span className="font-semibold text-navy">{value}</span>
    </div>
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-navy-50">
      <div className={`h-full rounded-full ${color}`} style={{ width: max ? `${(value / max) * 100}%` : "0%" }} />
    </div>
  </div>
);

const Reports: React.FC = () => {
  const { requests, incidents, residents } = useApp();

  const byDocType = countBy(requests.map((r) => r.type as DocumentType));
  const byIncidentCategory = countBy(incidents.map((i) => i.category as IncidentCategory));
  const byPurok = countBy(residents.map((r) => r.purok));

  const maxDoc = Math.max(1, ...Object.values(byDocType));
  const maxIncident = Math.max(1, ...Object.values(byIncidentCategory));
  const maxPurok = Math.max(1, ...Object.values(byPurok));

  const releasedCount = requests.filter((r) => r.status === "Released").length;
  const resolvedCount = incidents.filter((i) => i.status === "Resolved").length;

  return (
    <div>
      <PageHeader eyebrow="Insights" title="Reports" blurb="Summary statistics drawn from resident activity on the portal." />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="eyebrow">Total Requests Filed</p>
          <p className="mt-2 font-display text-3xl text-navy">{requests.length}</p>
          <p className="mt-1 text-xs text-navy-400">{releasedCount} released to date</p>
        </Card>
        <Card>
          <p className="eyebrow">Total Incidents Reported</p>
          <p className="mt-2 font-display text-3xl text-navy">{incidents.length}</p>
          <p className="mt-1 text-xs text-navy-400">{resolvedCount} resolved to date</p>
        </Card>
        <Card>
          <p className="eyebrow">Registered Residents</p>
          <p className="mt-2 font-display text-3xl text-navy">{residents.length}</p>
          <p className="mt-1 text-xs text-navy-400">across {Object.keys(byPurok).length} puroks</p>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <p className="eyebrow mb-4">Requests by Document Type</p>
          <div className="space-y-3">
            {Object.entries(byDocType).map(([label, value]) => (
              <BarRow key={label} label={label} value={value} max={maxDoc} />
            ))}
            {requests.length === 0 && <p className="text-sm text-navy-400">No data yet.</p>}
          </div>
        </Card>

        <Card>
          <p className="eyebrow mb-4">Incidents by Category</p>
          <div className="space-y-3">
            {Object.entries(byIncidentCategory).map(([label, value]) => (
              <BarRow key={label} label={label} value={value} max={maxIncident} color="bg-brick" />
            ))}
            {incidents.length === 0 && <p className="text-sm text-navy-400">No data yet.</p>}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <p className="eyebrow mb-4">Registered Residents by Purok</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(byPurok).map(([label, value]) => (
              <BarRow key={label} label={label} value={value} max={maxPurok} color="bg-moss" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
