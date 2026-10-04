import React from "react";

const BarangayLogo: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => (
  <img src="/src/assets/logo.png" alt="Barangay Poblacion Albuera seal" className={`shrink-0 object-contain ${className}`} />
);

export default BarangayLogo;
