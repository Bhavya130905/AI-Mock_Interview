import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { CheckCircle2, Circle, PlayCircle, BookOpen, Video, Code2 } from "lucide-react";
import {
  CAREER_GOALS,
  generateRoadmap,
  calculateLearningHours,
  calculateRoadmapProgress,
  // Import the types from the same library
  type Phase,
  type Step,
} from "@/lib/career-utils";

// ---- Route ----
export const Route = createFileRoute("/_app/roadmap")({
  component: RoadmapPage,
  head: () => ({ meta: [{ title: "Roadmap — CareerPilot AI" }] }),
});

// ---- Component ----
function RoadmapPage() {
  // Use the route's own useSearch – no argument needed
  const search = Route.useSearch() as any;
  const goal = search.goal || "frontend";
  const gaps = search.gaps ? search.gaps.split(",") : [];
  const skills = search.skills ? search.skills.split(",") : [];

  const [phases, setPhases] = useState<Phase[]>(() => {
    const saved = localStorage.getItem("careerRoadmap");
    if (saved) {
      return JSON.parse(saved);
    }
    return generateRoadmap(goal, gaps);
  });

  const career = useMemo(
    () => CAREER_GOALS.find((c) => c.id === goal),
    [goal]
  );

  const totalHours = useMemo(
    () => calculateLearningHours(phases),
    [phases]
  );

  const roadmapProgress = useMemo(
    () => calculateRoadmapProgress(phases),
    [phases]
  );

  const totalSteps = phases.reduce((acc: number, phase: Phase) => acc + phase.steps.length, 0);
  const doneSteps = phases.reduce(
    (acc: number, phase: Phase) => acc + phase.steps.filter((step: Step) => step.done).length,
    0
  );
  const iconFor = { read: BookOpen, video: Video, code: Code2 } as const;

  const achievements = useMemo(() => [
    {
      title: "Starter",
      icon: "🌱",
      unlocked: roadmapProgress >= 10,
    },
    {
      title: "Fast Learner",
      icon: "📚",
      unlocked: roadmapProgress >= 30,
    },
    {
      title: "Project Builder",
      icon: "💻",
      unlocked: roadmapProgress >= 50,
    },
    {
      title: "Career Ready",
      icon: "🚀",
      unlocked: roadmapProgress >= 80,
    },
    {
      title: "Placement Ready",
      icon: "🏆",
      unlocked: roadmapProgress === 100,
    },
  ], [roadmapProgress]);

  const toggle = (pi: number, si: number) => {
    setPhases((prev: Phase[]) =>
      prev.map((phase: Phase, i: number) =>
        i !== pi
          ? phase
          : {
              ...phase,
              steps: phase.steps.map((step: Step, j: number) =>
                j === si ? { ...step, done: !step.done } : step
              ),
            }
      )
    );
  };

  // Load roadmap from per-goal storage when goal changes
  useEffect(() => {
    const saved = localStorage.getItem(`careerRoadmap-${goal}`);
    if (saved) {
      try {
        setPhases(JSON.parse(saved));
        return;
      } catch {
        /* ignore */
      }
    }
    setPhases(generateRoadmap(goal, gaps));
  }, [goal, gaps]);

  // Save roadmap to per-goal storage on changes
  useEffect(() => {
    localStorage.setItem(`careerRoadmap-${goal}`, JSON.stringify(phases));
  }, [phases, goal]);

  // Save history
  useEffect(() => {
    localStorage.setItem(
      "roadmapHistory",
      JSON.stringify({
        goal,
        progress: roadmapProgress,
        completed: doneSteps,
        total: totalSteps,
        updatedAt: new Date().toISOString(),
      })
    );
  }, [roadmapProgress, doneSteps, totalSteps, goal]);

  // Save dashboard summary
  useEffect(() => {
    localStorage.setItem(
      "dashboard",
      JSON.stringify({
        career: career?.name,
        progress: roadmapProgress,
        hours: totalHours,
        completed: doneSteps,
        remaining: totalSteps - doneSteps,
        badges: achievements.filter((a) => a.unlocked).length,
      })
    );
  }, [career, roadmapProgress, totalHours, doneSteps, totalSteps, achievements]);

  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title={
          <>
            Your personalized <span className="text-gradient">roadmap</span>
          </>
        }
        subtitle={`Based on your goal: ${goal}${skills.length ? ` · Skills: ${skills.join(", ")}` : ""}`}
      />

      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-5xl">{career?.icon}</span>
            <div>
              <h2 className="text-2xl font-bold">{career?.name}</h2>
              <p className="text-muted-foreground">{career?.description}</p>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-sm text-muted-foreground">Expected Salary</p>
            <h2 className="text-primary text-xl font-bold">{career?.averageSalary}</h2>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-5 mb-8">
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm text-muted-foreground">Overall Progress</h3>
          <h2 className="text-3xl font-bold mt-2">{roadmapProgress}%</h2>
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm text-muted-foreground">Learning Hours</h3>
          <h2 className="text-3xl font-bold mt-2">{totalHours}</h2>
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm text-muted-foreground">Completed Steps</h3>
          <h2 className="text-3xl font-bold mt-2">{doneSteps}</h2>
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm text-muted-foreground">Remaining</h3>
          <h2 className="text-3xl font-bold mt-2">{totalSteps - doneSteps}</h2>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold">Achievements</h2>
        <div className="grid md:grid-cols-5 gap-4 mt-6">
          {achievements.map((badge) => (
            <div
              key={badge.title}
              className={`
                rounded-2xl
                border
                p-5
                text-center
                transition-all
                ${badge.unlocked
                  ? "border-green-500/40 bg-green-500/10"
                  : "border-white/10 opacity-50"
                }
              `}
            >
              <div className="text-4xl">{badge.icon}</div>
              <h3 className="mt-3 font-semibold">{badge.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {roadmapProgress === 100 && (
        <div
          className="
            glass
            rounded-2xl
            p-8
            mb-8
            text-center
            bg-green-500/10
            border
            border-green-500/30
          "
        >
          <h2 className="text-3xl font-bold">🎉 Congratulations!</h2>
          <p className="mt-3 text-muted-foreground">
            You completed your entire personalized roadmap.
            You are now placement-ready for this career path.
          </p>
        </div>
      )}

      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-semibold">Overall Progress</div>
            <div className="text-xs text-muted-foreground">
              {doneSteps} of {totalSteps} steps complete
            </div>
          </div>
          <div className="text-2xl font-bold text-gradient">{roadmapProgress}%</div>
        </div>
        <div className="h-2 bg-white/5 rounded-full">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${roadmapProgress}%`, background: "var(--gradient-primary)" }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {phases.map((phase: Phase, pi: number) => {
          const phaseTotal = phase.steps.length;
          const phaseCompleted = phase.steps.filter((step: Step) => step.done).length;
          const phaseProgress = phaseTotal > 0 ? Math.round((phaseCompleted / phaseTotal) * 100) : 0;
          const phaseHours = phase.steps.reduce((sum: number, step: Step) => sum + step.hours, 0);

          return (
            <div key={phase.title} className="glass rounded-2xl p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">{phase.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{phase.weeks}</p>
                </div>
                <PlayCircle className="h-6 w-6 text-primary" />
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="glass rounded-xl p-4">
                  <p className="text-xs text-muted-foreground">Progress</p>
                  <h3 className="text-2xl font-bold">{phaseProgress}%</h3>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <h3 className="text-2xl font-bold">
                    {phaseCompleted}/{phaseTotal}
                  </h3>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-xs text-muted-foreground">Hours</p>
                  <h3 className="text-2xl font-bold">{phaseHours}h</h3>
                </div>
              </div>

              <div className="mb-6">
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-full transition-all"
                    style={{ width: `${phaseProgress}%` }}
                  />
                </div>
              </div>

              <ul className="space-y-2">
                {phase.steps.map((step: Step, si: number) => {
                  const Icon = iconFor[step.type as keyof typeof iconFor] || BookOpen;
                  return (
                    <li key={step.id || si}>
                      <button
                        onClick={() => toggle(pi, si)}
                        className={`w-full flex items-center gap-3 rounded-xl p-3 text-left transition-colors ${
                          step.done
                            ? "bg-emerald-500/10 border border-emerald-500/30"
                            : "hover:bg-white/5 border border-white/10"
                        }`}
                      >
                        {step.done ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                        )}
                        <Icon className="h-4 w-4 text-primary shrink-0" />
                        <span
                          className={`flex-1 text-sm ${
                            step.done ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {step.title}
                        </span>
                        {step.done && (
                          <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                            Completed
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                          {step.hours} hrs
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex justify-between items-center border-t border-white/10 pt-5">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Learning Time</p>
                  <h3 className="font-semibold">{phaseHours} Hours</h3>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completion</p>
                  <h3 className="font-semibold">{phaseProgress}%</h3>
                </div>
              </div>

              <div className="flex justify-end mt-8 gap-4">
                <button
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                  className="glass rounded-xl px-6 py-3"
                >
                  Resume Learning
                </button>

                <button
                  onClick={() => {
                    localStorage.setItem("roadmapCompleted", JSON.stringify(true));
                    navigate({ to: "/dashboard" });
                  }}
                  className="rounded-xl px-6 py-3 bg-primary text-white"
                >
                  Finish Roadmap
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
