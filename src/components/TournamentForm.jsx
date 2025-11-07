import { useEffect, useState } from "react";

export default function TournamentForm({ onCreated }) {
  const [games, setGames] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    game_id: "",
    organizer_id: "",
    start_date: "",
    end_date: "",
    location: "",
    max_players: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_BACKEND_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [g, o] = await Promise.all([
          fetch(`${API}/games`).then((r) => r.json()),
          fetch(`${API}/organizers`).then((r) => r.json()),
        ]);
        setGames(g);
        setOrganizers(o);
      } catch (e) {
        // ignore for now
      }
    };
    fetchData();
  }, [API]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/tournaments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          max_players: form.max_players ? Number(form.max_players) : undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed to create");
      const data = await res.json();
      onCreated?.(data.id);
      setForm({
        title: "",
        game_id: "",
        organizer_id: "",
        start_date: "",
        end_date: "",
        location: "",
        max_players: "",
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Tournament title" className="w-full rounded-md border border-white/10 bg-slate-900/40 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
        <select name="game_id" value={form.game_id} onChange={handleChange} className="w-full rounded-md border border-white/10 bg-slate-900/40 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
          <option value="">Select game</option>
          {games.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <select name="organizer_id" value={form.organizer_id} onChange={handleChange} className="w-full rounded-md border border-white/10 bg-slate-900/40 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" required>
          <option value="">Select organizer</option>
          {organizers.map((o) => (
            <option key={o.id} value={o.id}>{o.name}</option>
          ))}
        </select>
        <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="w-full rounded-md border border-white/10 bg-slate-900/40 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className="w-full rounded-md border border-white/10 bg-slate-900/40 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location / venue" className="w-full rounded-md border border-white/10 bg-slate-900/40 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <input type="number" name="max_players" value={form.max_players} onChange={handleChange} placeholder="Max players" className="w-full rounded-md border border-white/10 bg-slate-900/40 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button disabled={loading} className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:opacity-50">
        {loading ? "Creating..." : "Create Tournament"}
      </button>
    </form>
  );
}
