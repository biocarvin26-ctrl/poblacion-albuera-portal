import React, { useState } from "react";
import { PageHeader, Card, EmptyState } from "../../components/ui";
import { useApp } from "../../context/AppContext";
import { Pin, Megaphone } from "lucide-react";
import type { Announcement } from "../../types";

const categories: Array<Announcement["category"] | "All"> = ["All", "Advisory", "Event", "Health", "Peace & Order", "General"];

const categoryColor: Record<Announcement["category"], string> = {
  Advisory: "text-gold-600",
  Event: "text-harbor",
  Health: "text-moss",
  "Peace & Order": "text-brick",
  General: "text-navy-400"
};

const AnnouncementsPage: React.FC = () => {
  const { announcements } = useApp();
  const [filter, setFilter] = useState<Announcement["category"] | "All">("All");

  const filtered = announcements
    .filter((a) => filter === "All" || a.category === filter)
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <PageHeader eyebrow="Community bulletin" title="Announcements" blurb="Official notices, advisories, and event updates from Barangay Poblacion." />

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === c ? "bg-navy text-white" : "bg-white text-navy-400 hover:bg-navy-50"
            } border border-navy-100`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No announcements here" blurb="Nothing has been posted in this category yet. Check back soon." />
      ) : (
        <div className="space-y-4">
          {filtered.map((a) => (
            <Card key={a.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Megaphone size={15} className={categoryColor[a.category]} />
                  <span className={`eyebrow ${categoryColor[a.category]}`}>{a.category}</span>
                </div>
                {a.pinned && <Pin size={14} className="shrink-0 text-gold-600" />}
              </div>
              <p className="mt-2 font-display text-lg text-navy">{a.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-navy-400">{a.body}</p>
              <p className="mt-3 text-xs text-navy-200">
                Posted {new Date(a.datePosted).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
