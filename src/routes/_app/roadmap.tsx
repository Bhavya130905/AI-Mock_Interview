import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { CheckCircle2, Circle, PlayCircle, BookOpen, Video, Code2 } from "lucide-react";
import { generateRoadmap } from "@/lib/career-utils";

type Step = { id: string; title: string; type: "read" | "video" | "code"; hours: number; done?: boolean };
type Phase = { title: string; weeks: string; steps: Step[] };

// ---- Roadmap generator ----
function generateRoadmap(goal: string, gapSkills: string[]): Phase[] {
  // Base phases per goal – extend as needed
  const basePhases: Record<string, Phase[]> = {
    swe: [
      {
        title: "Foundations",
        weeks: "Weeks 1–2",
        steps: [
          { id: "f1", title: "JavaScript deep dive: closures, async, prototypes", type: "read", hours: 6 },
          { id: "f2", title: "Git & GitHub workflows", type: "video", hours: 2 },
          { id: "f3", title: "HTML/CSS layout patterns", type: "code", hours: 4 },
        ],
      },
      {
        title: "Core CS",
        weeks: "Weeks 3–5",
        steps: [
          { id: "c1", title: "Arrays, strings, hash maps (30 problems)", type: "code", hours: 15 },
          { id: "c2", title: "Trees & Graphs (traversals, BFS/DFS)", type: "code", hours: 12 },
          { id: "c3", title: "Dynamic Programming patterns", type: "video", hours: 8 },
        ],
      },
      {
        title: "System Design",
        weeks: "Weeks 6–8",
        steps: [
          { id: "s1", title: "Scalability, caching, load balancing", type: "read", hours: 6 },
          { id: "s2", title: "Design URL shortener case study", type: "video", hours: 3 },
          { id: "s3", title: "Design chat app — do it yourself", type: "code", hours: 5 },
        ],
      },
      {
        title: "Placement Prep",
        weeks: "Weeks 9–10",
        steps: [
          { id: "p1", title: "Behavioral STAR framework", type: "read", hours: 2 },
          { id: "p2", title: "5 mock interviews", type: "video", hours: 5 },
          { id: "p3", title: "Company-specific prep (top 5 targets)", type: "code", hours: 8 },
        ],
      },
    ],
    // Add similar for ds, pm, ux, cyber, cloud if needed – for now fallback to swe
  };

  const base = basePhases[goal] || basePhases.swe;

  // Add a gap‑filling phase if gaps exist
  if (gapSkills.length > 0) {
    const gapPhase: Phase = {
      title: "Fill Skill Gaps",
      weeks: "Custom",
      steps: gapSkills.map((g, idx) => ({
        id: `gap-${idx}`,
        title: `Learn ${g} (targeted)`,
        type: "code",
        hours: 4,
      })),
    };
    return [...base, gapPhase];
  }

  return base;
}

// ---- Route ----
export const Route = createFileRoute("/_app/roadmap")({
  component: RoadmapPage,
  head: () => ({ meta: [{ title: "Roadmap — CareerPilot AI" }] }),
});

// ---- Component ----
function RoadmapPage() {
  // Read search params
  const search = useSearch({ from: "/_app/roadmap" });
  const goal = (search as any).goal || "swe";
  const gaps = (search as any).gaps ? (search as any).gaps.split(',') : [];
  const skills = (search as any).skills ? (search as any).skills.split(',') : [];

  const [phases, setPhases] = useState(() => generateRoadmap(goal, gaps));

  const toggle = (pi: number, si: number) => {
    setPhases((p) =>
      p.map((ph, i) =>
        i !== pi
          ? ph
          : {
              ...ph,
              steps: ph.steps.map((s, j) =>
                j === si ? { ...s, done: !s.done } : s
              ),
            }
      )
    );
  };

  const totalSteps = phases.reduce((a, p) => a + p.steps.length, 0);
  const doneSteps = phases.reduce((a, p) => a + p.steps.filter((s) => s.done).length, 0);
  const progress = Math.round((doneSteps / totalSteps) * 100);

  const iconFor = { read: BookOpen, video: Video, code: Code2 } as const;

  return (
    <>
      <PageHeader
        title={<>Your personalized <span className="text-gradient">roadmap</span></>}
        subtitle={`Based on your goal: ${goal}${skills.length ? ` · Skills: ${skills.join(', ')}` : ''}`}
      />

      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-semibold">Overall Progress</div>
            <div className="text-xs text-muted-foreground">{doneSteps} of {totalSteps} steps complete</div>
          </div>
          <div className="text-2xl font-bold text-gradient">{progress}%</div>
        </div>
        <div className="h-2 bg-white/5 rounded-full">
          <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "var(--gradient-primary)" }} />
        </div>
      </div>

      <div className="space-y-6">
        {phases.map((phase, pi) => (
          <div key={phase.title} className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{phase.title}</h3>
                <div className="text-xs text-muted-foreground">{phase.weeks}</div>
              </div>
              <PlayCircle className="h-5 w-5 text-primary-glow" />
            </div>
            <ul className="space-y-2">
              {phase.steps.map((step, si) => {
                const Icon = iconFor[step.type];
                return (
                  <li key={step.id}>
                    <button
                      onClick={() => toggle(pi, si)}
                      className={`w-full flex items-center gap-3 rounded-xl p-3 text-left transition-colors ${
                        step.done ? "bg-emerald-500/10" : "hover:bg-white/5"
                      }`}
                    >
                      {step.done ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                      <Icon className="h-4 w-4 text-primary-glow shrink-0" />
                      <span className={`flex-1 text-sm ${step.done ? "line-through text-muted-foreground" : ""}`}>
                        {step.title}
                      </span>
                      <span className="text-xs text-muted-foreground">{step.hours}h</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}