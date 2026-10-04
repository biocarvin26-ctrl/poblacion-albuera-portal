import React from "react";

export const PageHeader: React.FC<{ eyebrow?: string; title: string; blurb?: string }> = ({ eyebrow, title, blurb }) => (
  <div className="mb-6">
    {eyebrow && <p className="eyebrow mb-1">{eyebrow}</p>}
    <h1 className="font-display text-2xl font-semibold text-navy sm:text-3xl">{title}</h1>
    {blurb && <p className="mt-2 max-w-2xl text-sm text-navy-400">{blurb}</p>}
  </div>
);

const statusColors: Record<string, string> = {
  Pending: "bg-gold-100 text-gold-600",
  Processing: "bg-harbor/10 text-harbor",
  "Ready for Pickup": "bg-moss-100 text-moss",
  Released: "bg-moss text-white",
  Rejected: "bg-brick-100 text-brick-600",
  Filed: "bg-gold-100 text-gold-600",
  "Under Investigation": "bg-harbor/10 text-harbor",
  Resolved: "bg-moss text-white",
  Dismissed: "bg-navy-100 text-navy-400",
  Active: "bg-moss-100 text-moss",
  "Pending Verification": "bg-gold-100 text-gold-600",
  Suspended: "bg-brick-100 text-brick-600"
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[status] ?? "bg-navy-100 text-navy-400"}`}>
    {status}
  </span>
);

export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <div className={`stamp-box rounded-xl p-5 ${className}`}>{children}</div>
);

export const RefTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="ref-tag rounded border border-navy-200 bg-navy-50 px-2 py-1 text-navy">{children}</span>
);

export const EmptyState: React.FC<{ title: string; blurb: string }> = ({ title, blurb }) => (
  <div className="stamp-box rounded-lg px-6 py-12 text-center">
    <p className="font-display text-lg text-navy">{title}</p>
    <p className="mx-auto mt-1 max-w-sm text-sm text-navy-400">{blurb}</p>
  </div>
);

export const Field: React.FC<{ label: string; children: React.ReactNode; hint?: string }> = ({ label, children, hint }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-semibold text-navy">{label}</span>
    {children}
    {hint && <span className="mt-1 block text-xs text-navy-400">{hint}</span>}
  </label>
);

export const inputClass =
  "w-full rounded-md border border-navy-200 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-navy-200 focus:border-harbor";

export const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "navy" | "brick" }
> = ({ className = "", children, variant = "navy", ...rest }) => {
  const variantClass = variant === "brick" ? "bg-brick hover:bg-brick-600" : "bg-navy hover:bg-navy-600";
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md ${variantClass} px-5 py-2.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const AlertBanner: React.FC<{ kind: "success" | "error"; children: React.ReactNode }> = ({ kind, children }) => (
  <div
    className={`mb-4 rounded-md border px-4 py-3 text-sm ${
      kind === "success" ? "border-moss/30 bg-moss-100 text-moss" : "border-brick/30 bg-brick-100 text-brick-600"
    }`}
  >
    {children}
  </div>
);
