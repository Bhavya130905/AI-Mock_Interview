import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { CheckCircle2, Circle, PlayCircle, BookOpen, Video, Code2 } from "lucide-react";
import { generateRoadmap } from "@/lib/career-utils";

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