import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Sparkles, CheckCircle2, XCircle, TrendingUp, ArrowRight } from "lucide-react";
import { fetchSkillGap } from "@/lib/career-utils";

// ---- Route ----
export const Route = createFileRoute("/_app/career-goal")({
  component: CareerGoalPage,
  head: () => ({ meta: [{ title: "Career Goal — CareerPilot AI" }] }),
});

// ---- Component ----
const goals = [
  { id: "swe", title: "Software Engineer", desc: "Full-stack / Backend / Frontend" },
  { id: "ds", title: "Data Scientist", desc: "ML, analytics, statistics" },
  { id: "pm", title: "Product Manager", desc: "Strategy, execution, analytics" },
  { id: "ux", title: "UX Designer", desc: "Research, prototyping, design systems" },
  { id: "cyber", title: "Cybersecurity", desc: "SOC, pentesting, cloud sec" },
  { id: "cloud", title: "Cloud / DevOps", desc: "AWS, K8s, CI/CD" },
];

function CareerGoalPage() {
  const [selected, setSelected] = useState("swe");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    strengths: string[];
    gaps: { name: string; level: number }[];
    recommendations: string[];
  }>(null);

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const runAnalysis = async () => {
    if (!selected) {
      alert("Please select a career goal first.");
      return;
    }
    if (skills.length === 0) {
      alert("Please add at least one skill.");
      return;
    }
    setAnalyzing(true);
    const result = await fetchSkillGap(selected, skills);
    setAnalysisResult(result);
    setAnalyzing(false);
  };

  return (
    <>
      <PageHeader
        title={<>Pick your <span className="text-gradient">career goal</span></>}
        subtitle="Our AI analyzes your skills and identifies exactly what's missing."
      />

      {/* Goal selection */}
      <div className="grid md:grid-cols-3 gap-4">
        {goals.map((g) => (
          <button
            key={g.id}
            onClick={() => { setSelected(g.id); setAnalysisResult(null); }}
            className={`glass rounded-2xl p-5 text-left transition-all ${
              selected === g.id ? "ring-2 ring-primary shadow-elegant" : "hover:bg-white/5"
            }`}
          >
            <div className="font-semibold">{g.title}</div>
            <div className="text-xs text-muted-foreground mt-1">{g.desc}</div>
          </button>
        ))}
      </div>

      {/* Skill input */}
      <div className="mt-6">
        <label className="text-sm font-medium">Your current skills</label>
        <div className="flex gap-2 mt-2">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
            placeholder="e.g., JavaScript"
            className="flex-1 glass rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary/60"
          />
          <button
            onClick={addSkill}
            className="btn-primary rounded-xl px-4 py-2 font-medium"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full text-sm bg-primary/20 border border-primary/30 flex items-center gap-2"
            >
              {s}
              <button
                onClick={() => setSkills(skills.filter((x) => x !== s))}
                className="text-xs hover:text-red-400"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Run analysis button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={runAnalysis}
          disabled={analyzing}
          className="btn-primary rounded-xl px-6 py-3 font-medium inline-flex items-center gap-2 disabled:opacity-60"
        >
          <Sparkles className="h-4 w-4" />
          {analyzing ? "Analyzing..." : "Run AI Skill Gap Analysis"}
        </button>
      </div>

      {/* Results */}
      {analysisResult && (
        <>
          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold">Your Strengths</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {analysisResult.strengths.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-full text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-orange-400" />
                <h3 className="font-semibold">Skill Gaps</h3>
              </div>
              <div className="mt-4 space-y-3">
                {analysisResult.gaps.map((g) => (
                  <div key={g.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{g.name}</span>
                      <span className="text-muted-foreground">{g.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${g.level}%`, background: "var(--gradient-primary)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6 lg:col-span-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary-glow" />
                <h3 className="font-semibold">AI Recommendations</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {analysisResult.recommendations.map((rec, idx) => (
                  <li key={idx}>• {rec}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigate to roadmap */}
          <div className="mt-6 flex justify-end">
            <Link
              to="/roadmap"
              search={{
                goal: selected,
                gaps: analysisResult.gaps.map(g => g.name).join(','),
                skills: skills.join(','),
              }}
              className="btn-primary rounded-xl px-6 py-3 font-medium inline-flex items-center gap-2"
            >
              View your personalized roadmap <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </>
      )}
    </>
  );
}