import { useEffect, useState } from "react";
import { Image as ImageIcon, MapPin, Users } from "lucide-react";

export default function TournamentsExplorer() {
  const API = import.meta.env.VITE_BACKEND_URL || "";
  const [tournaments, setTournaments] = useState([]);
  const [images, setImages] = useState([]);

  const load = async () => {
    const [t, i] = await Promise.all([
      fetch(`${API}/tournaments`).then((r) => r.json()),
      fetch(`${API}/venue-images`).then((r) => r.json()),
    ]);
    setTournaments(t);
    setImages(i);
  };

  useEffect(() => {
    load();
  }, []);

  const getImages = (tId) => images.filter((im) => im.tournament_id === tId);

  return (
    <section id="tournaments" className="mx-auto max-w-6xl px-4">
      <div className="mb-6 flex items-center gap-2 text-white">
        <ImageIcon />
        <h2 className="text-xl font-semibold">Tournaments</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tournaments.map((t) => {
          const imgs = getImages(t.id);
          return (
            <article key={t.id} className="overflow-hidden rounded-xl border border-white/10 bg-slate-800/60 text-white">
              {imgs[0] ? (
                <img src={imgs[0].image_url} alt={imgs[0].caption || t.title} className="h-40 w-full object-cover" />
              ) : (
                <div className="h-40 w-full bg-slate-700/40 flex items-center justify-center text-slate-300">
                  No venue image
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-white">{t.title}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-slate-300"><MapPin size={16} /> {t.location || "TBD"}</p>
                <p className="mt-1 text-sm text-slate-400">{t.start_date || "TBD"}{t.end_date ? ` → ${t.end_date}` : ""}</p>
              </div>
            </article>
          );
        })}
        {tournaments.length === 0 && (
          <p className="col-span-full text-slate-400">No tournaments yet.</p>
        )}
      </div>
    </section>
  );
}
