import { useEffect, useMemo, useState } from "react";
import { GameForm, OrganizerForm, PlayerForm } from "./EntityForms";
import TournamentForm from "./TournamentForm";
import { LayoutDashboard, Image as ImageIcon, PlusCircle, Users, Trophy } from "lucide-react";

export default function AdminDashboard() {
  const API = import.meta.env.VITE_BACKEND_URL || "";
  const [games, setGames] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [venueForm, setVenueForm] = useState({ tournament_id: "", image_url: "", caption: "" });

  const loadAll = async () => {
    const [g, o, p, t] = await Promise.all([
      fetch(`${API}/games`).then((r) => r.json()),
      fetch(`${API}/organizers`).then((r) => r.json()),
      fetch(`${API}/players`).then((r) => r.json()),
      fetch(`${API}/tournaments`).then((r) => r.json()),
    ]);
    setGames(g);
    setOrganizers(o);
    setPlayers(p);
    setTournaments(t);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const submitVenue = async (e) => {
    e.preventDefault();
    await fetch(`${API}/venue-images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(venueForm),
    });
    setVenueForm({ tournament_id: "", image_url: "", caption: "" });
  };

  return (
    <section id="admin" className="mx-auto max-w-6xl px-4">
      <div className="mb-6 flex items-center gap-2 text-white">
        <LayoutDashboard />
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card title="Add Game" icon={<Trophy size={18} />}>
          <GameForm onCreated={loadAll} />
        </Card>
        <Card title="Add Organizer" icon={<Users size={18} />}>
          <OrganizerForm onCreated={loadAll} />
        </Card>
        <Card title="Add Player" icon={<PlusCircle size={18} />}>
          <PlayerForm onCreated={loadAll} />
        </Card>
        <Card className="md:col-span-2" title="Create Tournament" icon={<PlusCircle size={18} />}>
          <TournamentForm onCreated={loadAll} />
        </Card>
        <Card title="Add Venue Image" icon={<ImageIcon size={18} />}>
          <form onSubmit={submitVenue} className="grid gap-2">
            <label className="grid gap-1 text-sm">
              <span className="text-slate-300">Tournament</span>
              <select value={venueForm.tournament_id} onChange={(e) => setVenueForm({ ...venueForm, tournament_id: e.target.value })} className="rounded-md border border-white/10 bg-slate-900/40 px-3 py-2 text-white">
                <option value="">Select tournament</option>
                {tournaments.map((t) => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-300">Image URL</span>
              <input value={venueForm.image_url} onChange={(e) => setVenueForm({ ...venueForm, image_url: e.target.value })} placeholder="https://..." className="rounded-md border border-white/10 bg-slate-900/40 px-3 py-2 text-white" />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-300">Caption</span>
              <input value={venueForm.caption} onChange={(e) => setVenueForm({ ...venueForm, caption: e.target.value })} placeholder="Optional" className="rounded-md border border-white/10 bg-slate-900/40 px-3 py-2 text-white" />
            </label>
            <button className="mt-1 rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500">Add Image</button>
          </form>
        </Card>
      </div>

      <div className="mt-10 grid gap-6">
        <List title="Games" items={games} render={(g) => `${g.name}${g.genre ? ` · ${g.genre}` : ""}`} />
        <List title="Organizers" items={organizers} render={(o) => `${o.name} · ${o.email}`} />
        <List title="Players" items={players} render={(p) => `${p.name}${p.handle ? ` (${p.handle})` : ""}`} />
        <List title="Tournaments" items={tournaments} render={(t) => `${t.title} · ${t.location || "TBD"}`} />
      </div>
    </section>
  );
}

function Card({ title, icon, className = "", children }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-slate-800/60 p-4 text-white shadow-lg shadow-black/20 ${className}`}>
      <div className="mb-3 flex items-center gap-2 text-slate-200">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function List({ title, items, render }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
      <h4 className="mb-3 text-sm font-semibold text-slate-300">{title}</h4>
      <ul className="divide-y divide-white/5">
        {items.length === 0 && (
          <li className="py-3 text-slate-400 text-sm">No items yet</li>
        )}
        {items.map((item) => (
          <li key={item.id} className="py-3 text-white/90">{render(item)}</li>
        ))}
      </ul>
    </div>
  );
}
