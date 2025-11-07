import Header from "./components/Header";
import AdminDashboard from "./components/AdminDashboard";
import TournamentsExplorer from "./components/TournamentsExplorer";
import { GameForm, OrganizerForm, PlayerForm } from "./components/EntityForms";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-16">
        <section className="rounded-2xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-purple-500/5 to-transparent p-6 ring-1 ring-white/10 text-white">
          <h1 className="text-2xl md:text-3xl font-semibold">Organize tournaments with ease</h1>
          <p className="mt-2 text-slate-300 max-w-2xl">Create games, register organizers and players, set up tournaments, add participants, and showcase venue images — all from one place.</p>
        </section>

        <TournamentsExplorer />

        <section id="players" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4 text-white">
            <h3 className="mb-2 font-semibold">Register a Game</h3>
            <GameForm />
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4 text-white">
            <h3 className="mb-2 font-semibold">Register as Organizer</h3>
            <OrganizerForm />
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4 text-white">
            <h3 className="mb-2 font-semibold">Register as Player</h3>
            <PlayerForm />
          </div>
        </section>

        <AdminDashboard />
      </main>

      <footer className="py-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} TournaHub — Built for organizers and players
      </footer>
    </div>
  );
}

export default App;
