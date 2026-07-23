import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { SkillGapResult } from "@/lib/career-utils";

import {
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Loader2
} from "lucide-react";

import { PageHeader } from "@/components/app/PageHeader";

import {
  CAREER_GOALS,
  SKILL_CATEGORIES,
  fetchSkillGap,
} from "@/lib/career-utils";

// ---- Route ----
export const Route = createFileRoute("/_app/career-goal")({
  component: CareerGoalPage,
  head: () => ({ meta: [{ title: "Career Goal — CareerPilot AI" }] }),
});

function CareerGoalPage() {
  const [selectedCareer, setSelectedCareer] = useState("frontend");

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [searchCareer, setSearchCareer] = useState("");

  const [searchSkill, setSearchSkill] = useState("");

  const [analyzing, setAnalyzing] = useState(false);

  const [analysisResult, setAnalysisResult] = useState<SkillGapResult | null>(null);

  const filteredCareers = useMemo(() => {

    return CAREER_GOALS.filter((career) =>

      career.name
        .toLowerCase()
        .includes(searchCareer.toLowerCase())

    );

  }, [searchCareer]);


  const toggleSkill = (skill: string) => {

    if (selectedSkills.includes(skill)) {

      setSelectedSkills((prev) =>
        prev.filter((s) => s !== skill)
      );

    } else {

      setSelectedSkills((prev) => [...prev, skill]);

    }

  };
  return (
    <>
      <PageHeader
        title={<>Pick your <span className="text-gradient">career goal</span></>}
        subtitle="Our AI analyzes your skills and identifies exactly what's missing."
      />

      {/* Goal selection */}
      <div className="space-y-5">

        <div className="relative">

          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <input

            value={searchCareer}

            onChange={(e) =>
              setSearchCareer(e.target.value)
            }

            placeholder="Search career..."

            className="glass rounded-xl w-full pl-10 pr-4 py-3"

          />

        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {filteredCareers.length === 0 && (
            <div className="col-span-2 glass rounded-xl p-6 text-center text-muted-foreground">
              No career found.
            </div>
          )}
          {filteredCareers.map((career) => (

            <button

              key={career.id}

              onClick={() => {

                setSelectedCareer(career.id);
                setSelectedSkills([])
                setAnalysisResult(null);

              }}

              className={`glass rounded-2xl p-5 text-left transition-all border

                ${selectedCareer === career.id

                  ? "border-primary ring-2 ring-primary"

                  : "border-white/10"

                }`}

            >

              <div className="flex items-center justify-between">

                <span className="text-3xl">

                  {career.icon}

                </span>

                <span className="text-xs px-2 py-1 rounded-full bg-primary/20">

                  {career.averageSalary}

                </span>

              </div>

              <h3 className="mt-4 font-semibold text-lg">

                {career.name}

              </h3>

              <p className="mt-2 text-sm text-muted-foreground">

                {career.description}

              </p>

            </button>

          ))}

        </div>
        <hr className="my-10 border-white/10" />

        {/* ================= Skill Selection ================= */}

        <div className="mt-10">

          <h2 className="text-xl font-semibold">
            Select Your Current Skills
          </h2>

          <p className="text-sm text-muted-foreground mt-1">
            Choose all the skills you already know.
          </p>

          {/* Search */}

          <div className="relative mt-5">

            <Search
              className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
            />

            <input

              value={searchSkill}

              onChange={(e) =>
                setSearchSkill(e.target.value)
              }

              placeholder="Search skill..."

              className="glass rounded-xl pl-10 pr-4 py-3 w-full"

            />

          </div>

          {/* Categories */}

          <div className="space-y-7 mt-8">

            {SKILL_CATEGORIES.map((category) => (

              <div key={category.title}>

                <h3 className="font-semibold mb-3">

                  {category.title}

                </h3>

                <div className="flex flex-wrap gap-3">

                  {category.skills

                    .filter((skill) =>
                      skill
                        .toLowerCase()
                        .includes(
                          searchSkill.toLowerCase()
                        )
                    )

                    .map((skill) => {

                      const active =
                        selectedSkills.includes(skill);

                      return (

                        <button
                          type="button"
                          key={skill}

                          onClick={() =>
                            toggleSkill(skill)
                          }

                          className={` px-4 py-2 rounded-full transition-all border text-sm ${active ? "bg-primary text-white border-primary" : "glass border-white/10 hover:border-primary"} `} >

                          {skill}

                        </button>

                      );

                    })}

                </div>

              </div>

            ))}

          </div>

        </div>

        <div className="glass rounded-2xl p-6 mt-8">

          <h3 className="font-semibold">

            Selected Skills

          </h3>

          <p className="text-sm text-muted-foreground">

            {selectedSkills.length} skills selected

          </p>

          <div className="flex flex-wrap gap-2 mt-5">

            {selectedSkills.length === 0 && (

              <p className="text-muted-foreground">

                No skills selected.

              </p>

            )}

            {selectedSkills.map((skill) => (

              <button
                type="button"
                key={skill}

                onClick={() => toggleSkill(skill)}

                className="

                    bg-primary/20

                    border

                    border-primary/30

                    rounded-full

                    px-3

                    py-1

                    text-sm

                "

              >

                {skill} ✕

              </button>

            ))}

          </div>

        </div>

        <div className="mt-8 flex justify-center">
          <button
            disabled={analyzing || selectedSkills.length === 0}
            onClick={async () => {
              setAnalyzing(true);

              try {
                const result = await fetchSkillGap(
                  selectedCareer,
                  selectedSkills
                );

                setAnalysisResult(result);
              } finally {
                setAnalyzing(false);
              }
            }}
            className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />

            {analyzing
              ? "Analyzing..."
              : "Analyze Skill Gap"}
          </button>
        </div>

        <hr className="my-10 border-white/10" />
        {/* ================= Analysis Result ================= */}

        {analyzing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Analyze Skill Gap
          </>
        )}

        {analysisResult && (

          <>

            <div className="mt-10 grid lg:grid-cols-3 gap-6">

              {/* Overall Progress */}

              <div className="glass rounded-2xl p-6">

                <p className="text-sm text-muted-foreground">

                  Skill Progress

                </p>

                <h2 className="text-5xl font-bold mt-3 text-primary">

                  {analysisResult.skillProgress}%

                </h2>

                <div className="w-full h-3 rounded-full bg-white/10 mt-6">

                  <div

                    className="h-full rounded-full bg-primary transition-all"

                    style={{

                      width: `${analysisResult.skillProgress}%`

                    }}

                  />

                </div>

                <p className="mt-4 text-sm text-muted-foreground">

                  {analysisResult.completedSkills}

                  {" / "}

                  {analysisResult.totalSkills}

                  {" Required Skills"}

                </p>

              </div>

              <div className="glass rounded-2xl p-6">

                <div className="flex items-center gap-2">

                  <CheckCircle2
                    className="text-green-500 h-5 w-5"
                  />

                  <h2 className="font-semibold">

                    Your Strengths

                  </h2>

                </div>

                <div className="flex flex-wrap gap-2 mt-5">

                  {analysisResult.strengths.map(

                    (skill: string) => (

                      <span

                        key={skill}

                        className="

                    px-3

                    py-2

                    rounded-full

                    bg-green-500/20

                    border

                    border-green-500/30

                "

                      >

                        {skill}

                      </span>

                    )

                  )}

                </div>

              </div>

              <div className="glass rounded-2xl p-6">

                <div className="flex items-center gap-2">

                  <XCircle

                    className="text-orange-500 h-5 w-5"

                  />

                  <h2 className="font-semibold">

                    Missing Skills

                  </h2>

                </div>

                <div className="space-y-5 mt-5">

                  {analysisResult.gaps.map((gap) => (

                    <div key={gap.name}>

                      <div className="flex justify-between">

                        <span>

                          {gap.name}

                        </span>

                        <span>

                          {gap.level}%

                        </span>

                      </div>

                      <div className="bg-white/10 rounded-full h-2 mt-2">

                        <div

                          className="

                        bg-orange-500

                        rounded-full

                        h-full

                    "

                          style={{

                            width: `${gap.level}%`

                          }}

                        />

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            <div className="glass rounded-2xl p-6 mt-6">

              <div className="flex items-center gap-2">

                <TrendingUp

                  className="h-5 w-5 text-primary"

                />

                <h2 className="font-semibold">

                  AI Recommendations

                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-5">

                {analysisResult.recommendations.map(

                  (recommendation: string, index: number) => (

                    <div

                      key={index}

                      className="

                        rounded-xl

                        border

                        border-primary/20

                        bg-primary/5

                        p-4

                    "

                    >

                      {recommendation}

                    </div>

                  )

                )}

              </div>

            </div>

            <div className="mt-8 flex gap-4">

              <button

                className="btn-primary rounded-xl px-6 py-3"

                onClick={() => {

                  localStorage.setItem(

                    "careerGoal",

                    selectedCareer

                  );

                  localStorage.setItem(

                    "userSkills",

                    JSON.stringify(selectedSkills)

                  );

                  alert("Career Goal Saved!");

                }}

              >

                Save Career Goal

              </button>

              <Link

                to="/roadmap"

                search={{

                  goal: selectedCareer,

                  gaps: analysisResult.gaps

                    .map((g: any) => g.name)

                    .join(","),

                  skills: selectedSkills.join(","),
                }}
                disabled={!analysisResult}

                className="btn-primary rounded-xl px-6 py-3 flex items-center gap-2"

              >

                Generate Personalized Roadmap

                <ArrowRight className="h-4 w-4" />

              </Link>

            </div>

          </>

        )}

      </div>

    </>
  );
}
