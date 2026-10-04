import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { PageHeader, StatusBadge, EmptyState, RefTag, inputClass } from "../../components/ui";
import type { IncidentStatus } from "../../types";

const statusOptions: IncidentStatus[] = ["Filed", "Under Investigation", "Resolved", "Dismissed"];

const ManageIncidents: React.FC = () => {
  const { incidents, updateIncidentStatus } = useApp();
  const [filter, setFilter] = useState<IncidentStatus | "All">("All");

  const filtered = incidents.filter((i) => filter === "All" || i.status === filter);

  return (
    <div>
      <PageHeader eyebrow="Peace & order" title="Manage Incidents" blurb="Review and update the status of reported community incidents." />

      <div className="mb-4">
        <select className={`${inputClass} max-w-xs`} value={filter} onChange={(e) => setFilter(e.target.value as IncidentStatus | "All")}>
          <option value="All">All Statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No incidents found" blurb="There are no incident reports matching this filter." />
      ) : (
        <div className="space-y-3">
          {filtered.map((i) => (
            <div key={i.id} className="stamp-box rounded-lg p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-base text-navy">{i.category}</p>
                    <RefTag>{i.referenceNo}</RefTag>
                  </div>
                  <p className="mt-1 text-sm text-navy-400">
                    {i.isAnonymous ? "Anonymous report" : i.reporterName} · {i.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={i.status} />
                  <select
                    value={i.status}
                    onChange={(e) => updateIncidentStatus(i.id, e.target.value as IncidentStatus)}
                    className="rounded-md border border-navy-100 bg-white px-2.5 py-1.5 text-xs font-semibold"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="mt-3 text-sm text-navy-400">{i.description}</p>
              <p className="mt-2 text-xs text-navy-200">Filed {i.dateFiled} · Incident date {i.incidentDate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageIncidents;
