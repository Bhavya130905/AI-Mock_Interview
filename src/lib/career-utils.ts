// src/lib/career-utils.ts

export type Step = {
  id: string;
  title: string;
  type: "read" | "video" | "code";
  hours: number;
  done?: boolean;
};

export type Phase = {
  title: string;
  weeks: string;
  steps: Step[];
};

// ---------- Mock AI Skill Gap Analysis ----------
export async function fetchSkillGap(goalId: string, userSkills: string[]) {
  // This is a mock – replace with real API call later (Member 7)
  const requiredSkillsMap: Record<string, string[]> = {
    swe: ["JavaScript", "React", "Node.js", "SQL", "Git", "System Design", "DSA"],
    ds: ["Python", "SQL", "Pandas", "ML Algorithms", "Deep Learning", "MLOps"],
    pm: ["Communication", "Excel", "SQL for Analytics", "Product Metrics", "Roadmapping"],
    ux: ["Figma", "User Research", "Prototyping", "Design Systems"],
    cyber: ["Networking", "Pentesting", "Cloud Security"],
    cloud: ["Linux", "Kubernetes", "AWS", "CI/CD"],
  };

  const required = requiredSkillsMap[goalId] || [];
  const strengths = required.filter((skill) =>
    userSkills.some((us) => us.toLowerCase() === skill.toLowerCase()),
  );
  const gaps = required.filter(
    (skill) => !userSkills.some((us) => us.toLowerCase() === skill.toLowerCase()),
  );
  const gapData = gaps.map((name) => ({
    name,
    level: Math.floor(Math.random() * 40) + 20, // mock confidence (20-60%)
  }));
  const recommendations = gaps.map((name) => `Complete a course on "${name}" and build a project.`);

  return { strengths, gaps: gapData, recommendations };
}

// ---------- Roadmap Generator ----------
export function generateRoadmap(goal: string, gapSkills: string[]): Phase[] {
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
    // You can add similar maps for ds, pm, ux, cyber, cloud here.
    // For now, we'll use the SWE roadmap as a fallback for all other goals.
  };

  // Fallback: use SWE roadmap if goal not found
  let base = basePhases[goal] || basePhases.swe;

  // Deep copy to avoid mutating the original
  base = base.map((phase) => ({
    ...phase,
    steps: phase.steps.map((step) => ({ ...step })),
  }));

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
    base = [...base, gapPhase];
  }

  return base;
}