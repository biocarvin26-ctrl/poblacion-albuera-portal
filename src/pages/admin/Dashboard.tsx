import React from "react";
import { useApp } from "../../context/AppContext";
import { PageHeader, Card, StatusBadge, RefTag } from "../../components/ui";
import { Users, ClipboardList, AlertOctagon, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { residents, requests, incidents, announcements } = useApp();

  const pendingRequests = requests.filter((r) => r.status === "Pending" || r.status === "Processing").length;
  const openIncidents = incidents.filter((i) => i.status === "Filed" || i.status === "Under Investigation").length;

  const stats = [
    { label: "Registered Residents", value: residents.length, icon: Users, to: "/admin/residents" },
    { label: "Requests Awaiting Action", value: pendingRequests, icon: ClipboardList, to: "/admin/requests" },
    { label: "Open Incidents", value: openIncidents, icon: AlertOctagon, to: "/admin/incidents" },
    { label: "Active Announcements", value: announcements.length, icon: Megaphone, to: "/admin/announcements" }
  ];

  return (
    <div>
      <PageHeader eyebrow="Overview" title="Admin Dashboard" blurb="A snapshot of resident activity across Barangay Poblacion's e-services portal." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} to={s.to}>
            <Card className="h-full transition-shadow hover:shadow-lg">
              <s.icon className="text-harbor" size={20} />
              <p className="mt-3 font-display text-3xl text-navy">{s.value}</p>
              <p className="mt-1 text-sm text-navy-400">{s.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Card>
          <p className="eyebrow mb-3">Recent Document Requests</p>
          <ul className="space-y-3">
            {requests.slice(0, 5).map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 border-b border-navy-100 pb-3 last:border-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy">{r.residentName}</p>
                  <p className="truncate text-xs text-navy-400">{r.type} · <RefTag>{r.referenceNo}</RefTag></p>
                </div>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <p className="eyebrow mb-3">Recent Incident Reports</p>
          <ul className="space-y-3">
            {incidents.slice(0, 5).map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 border-b border-navy-100 pb-3 last:border-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy">{i.category}</p>
                  <p className="truncate text-xs text-navy-400">{i.location} · <RefTag>{i.referenceNo}</RefTag></p>
                </div>
                <StatusBadge status={i.status} />
              </li>
            ))}
            {incidents.length === 0 && <p className="text-sm text-navy-400">No incidents reported yet.</p>}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
