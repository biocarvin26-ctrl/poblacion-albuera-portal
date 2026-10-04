import React, { useMemo, useState } from "react";
import { useApp } from "../../context/AppContext";
import { PageHeader, Field, inputClass, PrimaryButton, StatusBadge, Card, RefTag } from "../../components/ui";
import { Search } from "lucide-react";

const statusSteps = ["Pending", "Processing", "Ready for Pickup", "Released"];
const incidentSteps = ["Filed", "Under Investigation", "Resolved"];

const TrackRequest: React.FC = () => {
  const { requests, incidents } = useApp();
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const requestMatch = useMemo(
    () => requests.find((r) => r.referenceNo.toLowerCase() === query.trim().toLowerCase()),
    [query, requests]
  );
  const incidentMatch = useMemo(
    () => incidents.find((i) => i.referenceNo.toLowerCase() === query.trim().toLowerCase()),
    [query, incidents]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Resident Portal" title="Track a Request" blurb="Enter the reference number given when you filed a document request or incident report." />

      <form onSubmit={handleSearch} className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Field label="Reference Number">
            <input className={`${inputClass} font-mono`} placeholder="e.g. BA-DR-2026-0142" value={query} onChange={(e) => setQuery(e.target.value)} />
          </Field>
        </div>
        <PrimaryButton type="submit"><Search size={16} /> Track</PrimaryButton>
      </form>

      {searched && !requestMatch && !incidentMatch && (
        <Card className="text-center">
          <p className="text-sm text-navy-400">No request or report found with that reference number. Please check and try again.</p>
        </Card>
      )}

      {requestMatch && (
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="eyebrow">Document Request</p>
              <p className="mt-1 font-display text-lg text-navy">{requestMatch.type}</p>
              <p className="mt-0.5 text-sm text-navy-400">Purpose: {requestMatch.purpose}</p>
            </div>
            <StatusBadge status={requestMatch.status} />
          </div>
          <RefTag>{requestMatch.referenceNo}</RefTag>
          <ol className="mt-5 flex flex-wrap items-center gap-2">
            {statusSteps.map((step, idx) => {
              const reached = statusSteps.indexOf(requestMatch.status) >= idx && requestMatch.status !== "Rejected";
              return (
                <li key={step} className={`rounded-full border px-3 py-1 text-xs font-semibold ${reached ? "border-navy bg-navy text-white" : "border-navy-100 text-navy-200"}`}>
                  {idx + 1}. {step}
                </li>
              );
            })}
          </ol>
          {requestMatch.notes && <p className="mt-4 rounded-md bg-navy-50 p-3 text-sm text-navy-400">Note: {requestMatch.notes}</p>}
          <p className="mt-4 text-xs text-navy-200">Filed {requestMatch.dateFiled} · Last updated {requestMatch.lastUpdated}</p>
        </Card>
      )}

      {incidentMatch && (
        <Card className="mt-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="eyebrow">Incident Report</p>
              <p className="mt-1 font-display text-lg text-navy">{incidentMatch.category}</p>
              <p className="mt-0.5 text-sm text-navy-400">{incidentMatch.location}</p>
            </div>
            <StatusBadge status={incidentMatch.status} />
          </div>
          <RefTag>{incidentMatch.referenceNo}</RefTag>
          <ol className="mt-5 flex flex-wrap items-center gap-2">
            {incidentSteps.map((step, idx) => {
              const reached = incidentSteps.indexOf(incidentMatch.status) >= idx && incidentMatch.status !== "Dismissed";
              return (
                <li key={step} className={`rounded-full border px-3 py-1 text-xs font-semibold ${reached ? "border-navy bg-navy text-white" : "border-navy-100 text-navy-200"}`}>
                  {idx + 1}. {step}
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-xs text-navy-200">Filed {incidentMatch.dateFiled} · Incident date {incidentMatch.incidentDate}</p>
        </Card>
      )}
    </div>
  );
};

export default TrackRequest;
