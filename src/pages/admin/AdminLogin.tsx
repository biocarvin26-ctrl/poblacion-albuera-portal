import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Field, inputClass, PrimaryButton, AlertBanner } from "../../components/ui";
import BarangayLogo from "../../components/BarangayLogo";

const AdminLogin: React.FC = () => {
  const { loginAdmin, isAdmin } = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (isAdmin) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginAdmin(username, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-800 px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center text-white">
          <BarangayLogo className="h-16 w-16" />
          <p className="mt-3 eyebrow text-white/70">Administrator</p>
          <h1 className="font-display text-2xl font-semibold">Barangay Admin Console</h1>
        </div>

        <div className="stamp-box rounded-lg bg-white p-6">
          {error && <AlertBanner kind="error">{error}</AlertBanner>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Field label="Username">
              <input required className={inputClass} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" />
            </Field>
            <Field label="Password">
              <input required type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </Field>
            <PrimaryButton type="submit" className="w-full">Log In</PrimaryButton>
          </form>
          <p className="mt-4 text-center text-xs text-navy-400">
            Demo credentials: <span className="font-mono">admin</span> / <span className="font-mono">albuera2026</span>
          </p>
        </div>

        <p className="mt-5 text-center text-sm text-navy-200">
          <Link to="/" className="hover:text-white">← Back to the public site</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
