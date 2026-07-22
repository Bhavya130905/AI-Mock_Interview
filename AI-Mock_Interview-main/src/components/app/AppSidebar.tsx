import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Target,
  Map,
  FileText,
  Mic,
  Users,
  Briefcase,
  User,
  Rocket,
  LogOut,
} from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/career-goal", label: "Career Goal", icon: Target },
  { to: "/roadmap", label: "Roadmap", icon: Map },
  { to: "/resume", label: "Resume ATS", icon: FileText },
  { to: "/interview", label: "Mock Interview", icon: Mic },
  { to: "/community", label: "Community", icon: Users },
  { to: "/placements", label: "Placements", icon: Briefcase },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col p-4 z-40">
      <div className="glass rounded-3xl h-full p-4 flex flex-col">
        <Link to="/" className="flex items-center gap-2 px-2 py-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl btn-primary">
            <Rocket className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-tight">
            CareerPilot <span className="text-gradient">AI</span>
          </span>
        </Link>
        <nav className="mt-6 flex-1 space-y-1">
          {nav.map((n) => {
            const active = pathname === n.to;
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "btn-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <Link
          to="/login"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Link>
      </div>
    </aside>
  );
}

export function AppTopbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = nav.find((n) => n.to === pathname);
  return (
    <div className="lg:hidden sticky top-0 z-30 glass mx-4 mt-4 rounded-2xl px-4 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg btn-primary">
          <Rocket className="h-4 w-4" />
        </div>
        <span className="font-semibold text-sm">CareerPilot AI</span>
      </Link>
      <span className="text-xs text-muted-foreground">{current?.label}</span>
    </div>
  );
}
