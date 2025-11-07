import { useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

function SimpleField({ label, ...props }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-slate-300">{label}</span>
      <input {...props} className="w-full rounded-md border border-white/10 bg-slate-900/40 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </label>
  );
}

export function GameForm({ onCreated }) {
  const [form, setForm] = useState({ name: "", genre: "", rules_url: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`${API}/games`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setForm({ name: "", genre: "", rules_url: "" });
    onCreated?.();
  };

  return (
    <form onSubmit={submit} className="grid gap-2">
      <SimpleField label="Game name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Chess" required />
      <SimpleField label="Genre" value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} placeholder="Strategy" />
      <SimpleField label="Rules URL" value={form.rules_url} onChange={(e) => setForm({ ...form, rules_url: e.target.value })} placeholder="https://..." />
      <button disabled={loading} className="mt-1 rounded-md bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-500 disabled:opacity-50">{loading ? "Saving..." : "Add Game"}</button>
    </form>
  );
}

export function OrganizerForm({ onCreated }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`${API}/organizers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setForm({ name: "", email: "", phone: "" });
    onCreated?.();
  };
  return (
    <form onSubmit={submit} className="grid gap-2">
      <SimpleField label="Organizer name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
      <SimpleField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="email@example.com" required />
      <SimpleField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Optional" />
      <button disabled={loading} className="mt-1 rounded-md bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-500 disabled:opacity-50">{loading ? "Saving..." : "Add Organizer"}</button>
    </form>
  );
}

export function PlayerForm({ onCreated }) {
  const [form, setForm] = useState({ name: "", email: "", handle: "" });
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`${API}/players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setForm({ name: "", email: "", handle: "" });
    onCreated?.();
  };
  return (
    <form onSubmit={submit} className="grid gap-2">
      <SimpleField label="Player name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" required />
      <SimpleField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="email@example.com" required />
      <SimpleField label="Handle" value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} placeholder="IGN (optional)" />
      <button disabled={loading} className="mt-1 rounded-md bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-500 disabled:opacity-50">{loading ? "Saving..." : "Add Player"}</button>
    </form>
  );
}
