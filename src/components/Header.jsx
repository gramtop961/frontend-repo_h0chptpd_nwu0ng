import { Trophy, Users, LayoutDashboard } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-gradient-to-r from-slate-900 to-slate-800/90 backdrop-blur text-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600/20 p-2 ring-1 ring-indigo-400/30">
            <Trophy className="text-indigo-300" size={22} />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">TournaHub</p>
            <p className="text-xs text-slate-300/80">Organize. Compete. Win.</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#tournaments" className="hover:text-indigo-300 transition-colors flex items-center gap-1">
            <Trophy size={16} /> Tournaments
          </a>
          <a href="#players" className="hover:text-indigo-300 transition-colors flex items-center gap-1">
            <Users size={16} /> Players
          </a>
          <a href="#admin" className="hover:text-indigo-300 transition-colors flex items-center gap-1">
            <LayoutDashboard size={16} /> Admin
          </a>
        </nav>
      </div>
    </header>
  );
}
