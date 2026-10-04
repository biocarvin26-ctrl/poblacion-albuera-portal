import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { PageHeader, Field, inputClass, PrimaryButton, AlertBanner, RefTag } from "../../components/ui";
import type { DocumentType } from "../../types";
import { FileText } from "lucide-react";

const documentTypes: DocumentType[] = [
  "Barangay Clearance",
  "Certificate of Residency",
  "Certificate of Indigency",
  "Business Permit Endorsement",
  "Barangay ID"
];

const RequestDocuments: React.FC = () => {
  const { fileDocumentRequest } = useApp();
  const [type, setType] = useState<DocumentType>(documentTypes[0]);
  const [purpose, setPurpose] = useState("");
  const [result, setResult] = useState<{ ok: boolean; message: string; referenceNo?: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = fileDocumentRequest({ type, purpose });
    setResult(res);
    if (res.ok) setPurpose("");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Resident Portal" title="Request a Document" blurb="Submit your document request online. You'll receive a reference number to track its progress." />

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
          <Field label="Document Type">
            <select className={inputClass} value={type} onChange={(e) => setType(e.target.value as DocumentType)}>
              {documentTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Purpose of Request" hint="Example: employment requirement, school enrollment, medical assistance.">
            <textarea required rows={3} className={inputClass} value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="State the purpose of this document..." />
          </Field>
          <PrimaryButton type="submit" className="w-full sm:w-auto">
            <FileText size={16} /> Submit Request
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default RequestDocuments;
