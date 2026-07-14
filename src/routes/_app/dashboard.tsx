import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import {
  TrendingUp,
  Target,
  FileText,
  Mic,
  Award,
  Flame,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
  head: () => ({ meta: [{ title: "Dashboard — CareerPilot AI" }] }),
});

const stats = [
  { label: "Readiness Score", value: "72%", icon: TrendingUp, tone: "from-fuchsia-500 to-purple-500" },
  { label: "Skills Mastered", value: "18/32", icon: Target, tone: "from-purple-500 to-indigo-500" },
  { label: "ATS Score", value: "84", icon: FileText, tone: "from-indigo-500 to-blue-500" },
  { label: "Mock Interviews", value: "12", icon: Mic, tone: "from-pink-500 to-fuchsia-500" },
];

const activities = [
  { icon: CheckCircle2, text: "Completed DSA module: Trees & Graphs", time: "2h ago" },
  { icon: Mic, text: "Mock interview — Frontend (Score 8.2/10)", time: "Yesterday" },
  { icon: FileText, text: "Resume ATS scan improved to 84", time: "2d ago" },
  { icon: Award, text: "Earned badge: SQL Rockstar", time: "3d ago" },
];

const nextSteps = [
  { title: "System Design Basics", meta: "Roadmap · 45 min", href: "/roadmap" },
  { title: "Behavioral Interview Practice", meta: "Mock Interview", href: "/interview" },
  { title: "Optimize Resume for Product Roles", meta: "ATS", href: "/resume" },
];

function DashboardPage() {
  return (
    <>
      <PageHeader
        title={<>Welcome back, <span className="text-gradient">Aditya</span></>}
        subtitle="Here's your placement readiness at a glance."
        actions={
          <div className="glass rounded-xl px-4 py-2 flex items-center gap-2 text-sm">
            <Flame className="h-4 w-4 text-orange-400" />
            <span>7-day streak</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5">
            <div className={`inline-grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.tone}`}>
              <s.icon className="h-5 w-5 text-white" />
            </div>
            <div className="mt-4 text-3xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Placement Readiness</h3>
            <span className="text-xs text-muted-foreground">Updated today</span>
          </div>
          <div className="mt-6 space-y-4">
            {[
              { name: "Technical Skills", value: 78 },
              { name: "Communication", value: 65 },
              { name: "Problem Solving", value: 82 },
              { name: "Resume Quality", value: 84 },
              { name: "Interview Confidence", value: 60 },
            ].map((r) => (
              <div key={r.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{r.name}</span>
                  <span className="text-muted-foreground">{r.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${r.value}%`,
                      background: "var(--gradient-primary)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold">Recommended Next</h3>
          <div className="mt-4 space-y-3">
            {nextSteps.map((n) => (
              <Link
                key={n.title}
                to={n.href}
                className="flex items-center justify-between rounded-xl p-3 hover:bg-white/5 transition-colors"
              >
                <div>
                  <div className="text-sm font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.meta}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 glass rounded-2xl p-6">
        <h3 className="font-semibold">Recent Activity</h3>
        <ul className="mt-4 space-y-3">
          {activities.map((a, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/5">
                <a.icon className="h-4 w-4 text-primary-glow" />
              </div>
              <span className="flex-1">{a.text}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {a.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
