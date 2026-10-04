import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { PageHeader, StatusBadge, EmptyState, RefTag, inputClass } from "../../components/ui";
import type { RequestStatus } from "../../types";

const statusOptions: RequestStatus[] = ["Pending", "Processing", "Ready for Pickup", "Released", "Rejected"];

const ManageRequests: React.FC = () => {
  const { requests, updateRequestStatus } = useApp();
  const [filter, setFilter] = useState<RequestStatus | "All">("All");

  const filtered = requests.filter((r) => filter === "All" || r.status === filter);

  return (
    <div>
      <PageHeader eyebrow="Processing queue" title="Manage Document Requests" blurb="Update the status of resident document requests as they move through processing." />

      <div className="mb-4">
        <select className={`${inputClass} max-w-xs`} value={filter} onChange={(e) => setFilter(e.target.value as RequestStatus | "All")}>
          <option value="All">All Statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No requests found" blurb="There are no requests matching this filter." />
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="stamp-box rounded-lg p-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-base text-navy">{r.type}</p>
                  <RefTag>{r.referenceNo}</RefTag>
                </div>
                <p className="mt-1 text-sm text-navy-400">
                  {r.residentName} · Purpose: {r.purpose}
                </p>
                <p className="mt-1 text-xs text-navy-200">Filed {r.dateFiled} · Updated {r.lastUpdated}</p>
              </div>
              <div className="mt-3 flex items-center gap-2 sm:mt-0">
                <StatusBadge status={r.status} />
                <select
                  value={r.status}
                  onChange={(e) => updateRequestStatus(r.id, e.target.value as RequestStatus)}
                  className="rounded-md border border-navy-100 bg-white px-2.5 py-1.5 text-xs font-semibold"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageRequests;
