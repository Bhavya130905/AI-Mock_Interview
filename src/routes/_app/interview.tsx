import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Mic, Video, MessageSquare, Play, ChevronRight, Star } from "lucide-react";

export const Route = createFileRoute("/_app/interview")({
  component: InterviewPage,
  head: () => ({ meta: [{ title: "Mock Interview — CareerPilot AI" }] }),
});

const tracks = [
  { id: "tech", title: "Technical", desc: "DSA, coding, systems", icon: MessageSquare },
  { id: "behav", title: "Behavioral", desc: "STAR method, culture fit", icon: Mic },
  { id: "hr", title: "HR Round", desc: "Salary, communication", icon: Video },
];

const questions = [
  "Tell me about yourself in 60 seconds.",
  "Describe a challenging bug you fixed recently.",
  "How would you design a URL shortener?",
  "Why do you want to join this company?",
  "Tell me about a time you disagreed with a teammate.",
];

const past = [
  { title: "Frontend — Technical", score: 8.2, date: "Jul 10", tone: "text-emerald-400" },
  { title: "Behavioral — STAR", score: 7.4, date: "Jul 7", tone: "text-emerald-400" },
  { title: "System Design — Technical", score: 6.1, date: "Jul 3", tone: "text-orange-400" },
];

function InterviewPage() {
  const [started, setStarted] = useState(false);
  const [qi, setQi] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<null | { score: number; strengths: string[]; improvements: string[] }>(null);

  const submit = () => {
    setFeedback({
      score: 8.2,
      strengths: [
        "Clear structure using STAR framework.",
        "Strong ownership language ('I led', 'I shipped').",
        "Concise — under 90 seconds.",
      ],
      improvements: [
        "Add a measurable outcome at the end.",
        "Slow down slightly on the technical detail.",
      ],
    });
  };

  if (!started) {
    return (
      <>
        <PageHeader
          title={<>AI <span className="text-gradient">Mock Interview</span></>}
          subtitle="Practice with an AI interviewer and get instant feedback."
        />

        <div className="grid md:grid-cols-3 gap-4">
          {tracks.map((t) => (
            <button
              key={t.id}
              onClick={() => setStarted(true)}
              className="glass rounded-2xl p-6 text-left hover:bg-white/5 transition-all group"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl btn-primary">
                <t.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-semibold">{t.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{t.desc}</div>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary-glow">
                Start <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="font-semibold mb-4">Past sessions</h2>
          <div className="space-y-3">
            {past.map((p) => (
              <div key={p.title} className="glass rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.date}</div>
                </div>
                <div className={`flex items-center gap-1 font-semibold ${p.tone}`}>
                  <Star className="h-4 w-4 fill-current" />
                  {p.score}/10
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Mock Interview — Technical"
        subtitle={`Question ${qi + 1} of ${questions.length}`}
        actions={
          <button onClick={() => { setStarted(false); setFeedback(null); setAnswer(""); setQi(0); }} className="glass rounded-xl px-4 py-2 text-sm">
            End session
          </button>
        }
      />

      <div className="glass rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-full btn-primary shrink-0">
            <Mic className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-muted-foreground">AI Interviewer</div>
            <p className="mt-1 text-lg">{questions[qi]}</p>
          </div>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={6}
          placeholder="Type or record your answer..."
          className="mt-6 w-full glass rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60 resize-none"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="glass rounded-xl px-4 py-2 text-sm inline-flex items-center gap-2">
            <Mic className="h-4 w-4" /> Record
          </button>
          <button onClick={submit} disabled={!answer} className="btn-primary rounded-xl px-4 py-2 text-sm font-medium disabled:opacity-50 inline-flex items-center gap-2">
            <Play className="h-4 w-4" /> Submit for feedback
          </button>
        </div>
      </div>

      {feedback && (
        <div className="mt-6 glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">AI Feedback</h3>
            <div className="text-2xl font-bold text-gradient">{feedback.score}/10</div>
          </div>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-emerald-400 mb-2">Strengths</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {feedback.strengths.map((s) => <li key={s}>• {s}</li>)}
              </ul>
            </div>
            <div>
              <div className="text-sm font-medium text-orange-400 mb-2">Improvements</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {feedback.improvements.map((s) => <li key={s}>• {s}</li>)}
              </ul>
            </div>
          </div>
          <button
            onClick={() => { setAnswer(""); setFeedback(null); setQi((qi + 1) % questions.length); }}
            className="mt-6 btn-primary rounded-xl px-4 py-2 text-sm font-medium"
          >
            Next question
          </button>
        </div>
      )}
    </>
  );
}
