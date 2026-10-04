import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Megaphone } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Card } from "../../components/ui";
import BarangayLogo from "../../components/BarangayLogo";

const Home: React.FC = () => {
  const { announcements } = useApp();
  const pinned = announcements.filter((a) => a.pinned).slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-5 py-16 md:flex-row md:justify-between md:py-24">
          <div className="w-full md:w-1/2">
            <div className="flex flex-wrap gap-4 text-sm font-medium text-harbor">
              <p>• Poblacion Albuera</p>
              <p>• Online Document Request</p>
              <p>• E-Services</p>
            </div>
            <h1 className="mt-5 font-display text-3xl font-bold leading-tight text-navy-800 sm:text-4xl">
              Welcome to E-Barangay
              <br />
              Poblacion Albuera Portal
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-navy-400">
              Request official barangay documents online anytime, track your request status, and
              receive faster, more convenient public services from Barangay Poblacion, Albuera.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/resident/register"
                className="rounded-full bg-navy-600 px-7 py-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-navy-700"
              >
                REGISTER
              </Link>
              <Link
                to="/resident/login"
                className="rounded-full border-2 border-navy-600 px-7 py-4 text-sm font-bold text-navy-600 transition-transform hover:-translate-y-0.5 hover:bg-navy-50"
              >
                LOGIN
              </Link>
            </div>
          </div>

          <div className="flex w-full justify-center md:w-1/2">
            <BarangayLogo className="h-56 w-56 drop-shadow-xl sm:h-72 sm:w-72" />
          </div>
        </div>
      </section>

      {/* Announcements preview */}
      {pinned.length > 0 && (
        <section className="bg-navy-50/60">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-navy-800">Latest Announcements</h2>
              <Link to="/announcements" className="flex items-center gap-1 text-sm font-semibold text-harbor hover:underline">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {pinned.map((a) => (
                <Card key={a.id}>
                  <div className="flex items-center gap-2 text-harbor">
                    <Megaphone size={16} />
                    <span className="eyebrow">{a.category}</span>
                  </div>
                  <p className="mt-2 font-display text-lg font-semibold text-navy-800">{a.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-navy-400">{a.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
