import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { PageHeader, Card, Field, inputClass, PrimaryButton, EmptyState } from "../../components/ui";
import type { Announcement } from "../../types";
import { Pin, PinOff, Trash2 } from "lucide-react";

const categories: Announcement["category"][] = ["Advisory", "Event", "Health", "Peace & Order", "General"];

const AdminAnnouncements: React.FC = () => {
  const { announcements, addAnnouncement, removeAnnouncement, togglePinAnnouncement } = useApp();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<Announcement["category"]>("General");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({ title, body, category, pinned: false });
    setTitle("");
    setBody("");
  };

  return (
    <div>
      <PageHeader eyebrow="Community bulletin" title="Manage Announcements" blurb="Post updates for residents and pin the most important ones to the homepage." />

      <Card className="mb-6">
        <p className="eyebrow mb-3">New Announcement</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
            <Field label="Title">
              <input required className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} />
            </Field>
            <Field label="Category">
              <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value as Announcement["category"])}>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Details">
            <textarea required rows={3} className={inputClass} value={body} onChange={(e) => setBody(e.target.value)} />
          </Field>
          <PrimaryButton type="submit">Post Announcement</PrimaryButton>
        </form>
      </Card>

      {announcements.length === 0 ? (
        <EmptyState title="No announcements yet" blurb="Posted announcements will appear here." />
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => (
            <Card key={a.id} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="eyebrow">{a.category}</span>
                <p className="mt-1 font-display text-base text-navy">{a.title}</p>
                <p className="mt-1 text-sm text-navy-400">{a.body}</p>
                <p className="mt-2 text-xs text-navy-200">Posted {a.datePosted}</p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button
                  onClick={() => togglePinAnnouncement(a.id)}
                  className={`rounded p-1.5 ${a.pinned ? "bg-gold-100 text-gold-600" : "text-navy-200 hover:bg-navy-50"}`}
                  aria-label={a.pinned ? "Unpin" : "Pin"}
                  title={a.pinned ? "Unpin" : "Pin to homepage"}
                >
                  {a.pinned ? <Pin size={15} /> : <PinOff size={15} />}
                </button>
                <button
                  onClick={() => removeAnnouncement(a.id)}
                  className="rounded p-1.5 text-navy-200 hover:bg-brick-100 hover:text-brick"
                  aria-label="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;
