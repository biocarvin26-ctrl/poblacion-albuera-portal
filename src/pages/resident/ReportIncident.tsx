import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { PageHeader, Field, inputClass, PrimaryButton, AlertBanner, RefTag } from "../../components/ui";
import type { IncidentCategory } from "../../types";
import { AlertTriangle } from "lucide-react";

const categories: IncidentCategory[] = [
  "Noise Complaint",
  "Public Disturbance",
  "Property Dispute",
  "Domestic Issue",
  "Theft",
  "Physical Injury",
  "Others"
];

const ReportIncident: React.FC = () => {
  const { fileIncident } = useApp();
  const [category, setCategory] = useState<IncidentCategory>(categories[0]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string; referenceNo?: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = fileIncident({ category, location, description, incidentDate, isAnonymous });
    setResult(res);
    if (res.ok) {
      setLocation("");
      setDescription("");
      setIncidentDate("");
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Resident Portal" title="Report an Incident" blurb="For emergencies, call the numbers on the Emergency Contacts page instead of filing a report here." />

      {result && (
        <AlertBanner kind={result.ok ? "success" : "error"}>
          {result.message}
          {result.ok && result.referenceNo && (
            <>
              {" "}Your reference number is <RefTag>{result.referenceNo}</RefTag>.
            </>
          )}
        </AlertBanner>
      )}

      <div className="stamp-box rounded-lg p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field label="Incident Category">
            <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value as IncidentCategory)}>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Location">
              <input required className={inputClass} placeholder="e.g. Purok 4, near the chapel" value={location} onChange={(e) => setLocation(e.target.value)} />
            </Field>
            <Field label="Date of Incident">
              <input required type="date" className={inputClass} value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} />
            </Field>
          </div>
          <Field label="Description">
            <textarea required rows={4} className={inputClass} placeholder="Describe what happened..." value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>
          <label className="flex items-center gap-2 text-sm text-navy-400">
            <input type="checkbox" className="h-4 w-4 rounded border-navy-200" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
            File this report anonymously
          </label>
          <PrimaryButton type="submit" variant="brick" className="w-full sm:w-auto">
            <AlertTriangle size={16} /> Submit Report
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
