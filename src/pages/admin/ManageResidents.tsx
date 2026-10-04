import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { PageHeader, StatusBadge, EmptyState, inputClass } from "../../components/ui";
import type { Resident } from "../../types";
import { Trash2, Search } from "lucide-react";

const statusOptions: Resident["status"][] = ["Active", "Pending Verification", "Suspended"];

const ManageResidents: React.FC = () => {
  const { residents, updateResidentStatus, removeResident } = useApp();
  const [query, setQuery] = useState("");

  const filtered = residents.filter((r) =>
    `${r.firstName} ${r.lastName} ${r.email} ${r.purok}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <PageHeader eyebrow="Records" title="Manage Residents" blurb="Verify new registrations, update account status, or remove records." />

      <div className="mb-4 flex items-center gap-2">
        <Search size={16} className="text-navy-400" />
        <input className={`${inputClass} max-w-sm`} placeholder="Search by name, email, or purok" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No residents found" blurb="Try a different search term." />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-navy-100 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-navy-100 bg-navy-50/60 text-xs uppercase tracking-wide text-navy-400">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Purok</th>
                <th className="px-4 py-3">Registered</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-navy-100 last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy">{r.firstName} {r.lastName}</p>
                    <p className="text-xs text-navy-400">{r.email}</p>
                  </td>
                  <td className="px-4 py-3 text-navy-400">{r.contactNumber}</td>
                  <td className="px-4 py-3 text-navy-400">{r.purok}</td>
                  <td className="px-4 py-3 text-navy-400">{r.dateRegistered}</td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status}
                      onChange={(e) => updateResidentStatus(r.id, e.target.value as Resident["status"])}
                      className="rounded-md border border-navy-100 bg-white px-2 py-1 text-xs"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <span className="ml-2 hidden lg:inline"><StatusBadge status={r.status} /></span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        if (confirm(`Remove ${r.firstName} ${r.lastName}'s record?`)) removeResident(r.id);
                      }}
                      className="rounded p-1.5 text-navy-200 hover:bg-brick-100 hover:text-brick"
                      aria-label="Remove resident"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageResidents;
