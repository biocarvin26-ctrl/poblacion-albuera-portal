import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { AlertBanner } from "../../components/ui";
import type { Gender, CivilStatus, VoterStatus } from "../../types";

const puroks = ["Purok 1", "Purok 2", "Purok 3", "Purok 4", "Purok 5", "Purok 6", "Purok 7", "Purok 8"];

const inputCls =
  "w-full rounded-md border border-navy-200 bg-white px-3.5 py-3 text-sm text-ink placeholder:text-navy-200 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/15";
const labelCls = "mb-1.5 block text-sm font-bold text-navy-800";

function calcAge(birthDate: string): number {
  if (!birthDate) return 0;
  const b = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - b.getFullYear();
  const m = today.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < b.getDate())) age--;
  return Math.max(age, 0);
}

const SectionCard: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => (
  <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-stamp sm:p-8">
    <h2 className="mb-5 text-center font-display text-xl font-bold text-navy-600">{title}</h2>
    {children}
  </div>
);

const Field: React.FC<{ label: string; children: React.ReactNode; span?: boolean }> = ({ label, children, span }) => (
  <div className={span ? "sm:col-span-2" : ""}>
    <label className={labelCls}>{label}</label>
    {children}
  </div>
);

const ResidentRegister: React.FC = () => {
  const { registerResident } = useApp();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [religion, setReligion] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [nationality, setNationality] = useState("Filipino");
  const [civilStatus, setCivilStatus] = useState<CivilStatus | "">("");

  const [address, setAddress] = useState("");
  const [purok, setPurok] = useState("");
  const [yearsOfResidency, setYearsOfResidency] = useState("");
  const [voterStatus, setVoterStatus] = useState<VoterStatus | "">("");

  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const age = useMemo(() => calcAge(birthDate), [birthDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!gender || !civilStatus || !voterStatus || !purok) {
      setError("Please complete all required fields.");
      return;
    }

    const result = registerResident({
      firstName,
      middleName: middleName || undefined,
      lastName,
      birthDate,
      age,
      gender,
      religion: religion || undefined,
      placeOfBirth,
      nationality,
      civilStatus,
      address,
      purok,
      yearsOfResidency: Number(yearsOfResidency) || 0,
      voterStatus,
      contactNumber,
      email,
      username,
      password
    });

    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate("/resident/login");
  };

  return (
    <div className="bg-paper px-5 py-12">
      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-center font-display text-2xl font-bold text-navy-800 sm:text-3xl">
          Poblacion Albuera Portal Registration Form
        </h1>

        {error && <AlertBanner kind="error">{error}</AlertBanner>}

        <SectionCard title="Personal Information">
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="First Name *">
              <input required className={inputCls} placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Field>
            <Field label="Middle Name">
              <input className={inputCls} placeholder="Enter middle name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
            </Field>
            <Field label="Last Name *">
              <input required className={inputCls} placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Field>

            <Field label="Birthdate *">
              <input required type="date" className={inputCls} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
            </Field>
            <Field label="Age *">
              <input readOnly className={`${inputCls} bg-navy-50/60`} value={age || ""} placeholder="Age" />
            </Field>
            <Field label="Place of Birth *">
              <input required className={inputCls} placeholder="Enter place of birth" value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)} />
            </Field>

            <Field label="Gender *">
              <select required className={inputCls} value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </Field>
            <Field label="Civil Status *">
              <select required className={inputCls} value={civilStatus} onChange={(e) => setCivilStatus(e.target.value as CivilStatus)}>
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Separated">Separated</option>
                <option value="Widowed">Widowed</option>
              </select>
            </Field>
            <Field label="Nationality *">
              <input required className={inputCls} value={nationality} onChange={(e) => setNationality(e.target.value)} />
            </Field>

            <Field label="Religion" span>
              <input className={inputCls} placeholder="Enter religion" value={religion} onChange={(e) => setReligion(e.target.value)} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Residency Information">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Complete Address *" span>
              <input required className={inputCls} placeholder="House No., Street, Barangay, Municipality" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Field>
            <Field label="Purok *">
              <select required className={inputCls} value={purok} onChange={(e) => setPurok(e.target.value)}>
                <option value="">Select Purok</option>
                {puroks.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>
            <Field label="Years of Residency *">
              <input required type="number" min={0} className={inputCls} placeholder="Number of years" value={yearsOfResidency} onChange={(e) => setYearsOfResidency(e.target.value)} />
            </Field>
            <Field label="Voter Status *" span>
              <select required className={inputCls} value={voterStatus} onChange={(e) => setVoterStatus(e.target.value as VoterStatus)}>
                <option value="">Select Voter Status</option>
                <option value="Registered Voter">Registered Voter</option>
                <option value="Non-Voter">Non-Voter</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Contact Information">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Contact Number *">
              <input required type="tel" pattern="[0-9]{11}" maxLength={11} className={inputCls} placeholder="09XXXXXXXXX" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
            </Field>
            <Field label="Email Address *">
              <input required type="email" className={inputCls} placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Account Information">
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Username *">
              <input required minLength={5} className={inputCls} placeholder="Create username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Field>
            <Field label="Password *">
              <input required minLength={8} type="password" className={inputCls} placeholder="Create password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field>
            <Field label="Confirm Password *">
              <input required minLength={8} type="password" className={inputCls} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              {confirmPassword && password !== confirmPassword && (
                <span className="mt-1 block text-xs text-brick">Passwords do not match.</span>
              )}
            </Field>
          </div>
        </SectionCard>

        <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-stamp">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-navy-400">
            <input required type="checkbox" className="mt-1 h-4 w-4" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            I confirm that the information I provided is true and correct. I agree to the terms
            and conditions of the E-Barangay Poblacion Albuera Portal and allow my information to
            be used for barangay service processing.
          </label>
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button type="submit" className="rounded-md bg-navy-600 px-9 py-3.5 text-sm font-bold text-white hover:bg-navy-700">
            REGISTER
          </button>
          <Link
            to="/resident/login"
            className="rounded-md bg-navy-50 px-9 py-3.5 text-center text-sm font-bold text-navy-600 hover:bg-navy-100"
          >
            BACK TO LOGIN
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResidentRegister;
