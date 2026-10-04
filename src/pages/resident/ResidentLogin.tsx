import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { AlertBanner } from "../../components/ui";
import { Eye, EyeOff } from "lucide-react";
import BarangayLogo from "../../components/BarangayLogo";

const ResidentLogin: React.FC = () => {
  const { loginResident, currentResident } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (currentResident) return <Navigate to="/resident/request-documents" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginResident(email, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate("/resident/request-documents");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <BarangayLogo className="h-32 w-48" />
          <h1 className="mt-4 font-display text-2xl font-bold text-navy-800">
            Poblacion Albuera Resident Access Portal
          </h1>
          <p className="mt-1 text-navy-400">Login to E-Barangay Portal</p>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-8 shadow-stamp">
          {error && <AlertBanner kind="error">{error}</AlertBanner>}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy-800">Email Address</label>
              <input
                required
                type="email"
                placeholder="Enter Email"
                autoComplete="email"
                className="w-full rounded-md border border-navy-100 bg-navy-50/40 px-4 py-3 text-sm focus:border-navy-600 focus:bg-white focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy-800">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full rounded-md border border-navy-100 bg-navy-50/40 px-4 py-3 pr-16 text-sm focus:border-navy-600 focus:bg-white focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 text-xs font-bold text-navy-600 hover:text-navy-700"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="flex items-center gap-2 text-sm text-navy-400">
                <input type="checkbox" className="h-4 w-4" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember me
              </label>
              <a href="#" className="text-sm font-medium text-navy-600 hover:underline">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full rounded-md bg-navy-600 py-3.5 text-sm font-bold text-white hover:bg-navy-700">
              Login
            </button>
          </form>

         
        </div>

        <p className="mt-5 text-center text-sm text-navy-400">
          New to E-Barangay Portal?{" "}
          <Link to="/resident/register" className="font-semibold text-navy-600 hover:underline">
            Register now
          </Link>
        </p>
        <p className="mt-2 text-center text-xs">
          <Link to="/admin/login" className="text-navy-200 hover:text-navy-400">Administrator login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResidentLogin;
