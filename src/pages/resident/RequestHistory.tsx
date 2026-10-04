import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { PageHeader, StatusBadge, RefTag, EmptyState } from "../../components/ui";

const tabs = ["Document Requests", "Incident Reports"] as const;

const RequestHistory: React.FC = () => {
  const { requests, incidents, currentResident } = useApp();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Document Requests");

  const myRequests = requests.filter((r) => r.residentId === currentResident?.id);
  const myIncidents = incidents.filter((i) => i.residentId === currentResident?.id);

  return (
    <div>
      <PageHeader eyebrow="Resident Portal" title="Request History" blurb="All document requests and incident reports you've filed." />

      <div className="mb-5 flex gap-2 border-b border-navy-100">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${
              tab === t ? "border-navy text-navy" : "border-transparent text-navy-200 hover:text-navy-400"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Document Requests" ? (
        myRequests.length === 0 ? (
          <EmptyState title="No document requests yet" blurb="Requests you file will appear here with their status." />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-navy-100 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-navy-100 bg-navy-50/60 text-xs uppercase tracking-wide text-navy-400">
                <tr>
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Filed</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {myRequests.map((r) => (
                  <tr key={r.id} className="border-b border-navy-100 last:border-0">
                    <td className="px-4 py-3"><RefTag>{r.referenceNo}</RefTag></td>
                    <td className="px-4 py-3 text-navy">{r.type}</td>
                    <td className="px-4 py-3 text-navy-400">{r.dateFiled}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : myIncidents.length === 0 ? (
        <EmptyState title="No incident reports yet" blurb="Reports you file will appear here with their status." />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-navy-100 bg-white">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-navy-100 bg-navy-50/60 text-xs uppercase tracking-wide text-navy-400">
              <tr>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Filed</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {myIncidents.map((i) => (
                <tr key={i.id} className="border-b border-navy-100 last:border-0">
                  <td className="px-4 py-3"><RefTag>{i.referenceNo}</RefTag></td>
                  <td className="px-4 py-3 text-navy">{i.category}</td>
                  <td className="px-4 py-3 text-navy-400">{i.dateFiled}</td>
                  <td className="px-4 py-3"><StatusBadge status={i.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestHistory;
