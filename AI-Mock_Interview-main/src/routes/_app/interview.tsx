import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import InterviewSetup, { InterviewConfig } from "@/components/interview/setup/InterviewSetup";
import { Mic, Play } from "lucide-react";

export const Route = createFileRoute("/_app/interview")({
  component: InterviewPage,
  head: () => ({ meta: [{ title: "Mock Interview — CareerPilot AI" }] }),
});

const subjectLabels: Record<string, string> = {
  dsa: "Data Structures & Algorithms",
  oops: "Object Oriented Programming",
  os: "Operating Systems",
  dbms: "Database Management System",
  cn: "Computer Networks",
};

const difficultyLabels: Record<string, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const questionBank = [
  "Tell me about yourself in 60 seconds.",
  "Describe a challenging bug you fixed recently.",
  "How would you design a URL shortener?",
  "Why do you want to join this company?",
  "Tell me about a time you disagreed with a teammate.",
  "What's the time complexity of your favorite sorting algorithm, and why?",
  "Walk me through how you'd debug a memory leak in production.",
  "Explain a system you built end-to-end.",
];

function buildQuestions(count: number) {
  return Array.from({ length: count }, (_, i) => questionBank[i % questionBank.length]);
}

function InterviewPage() {
  const [config, setConfig] = useState<InterviewConfig | null>(null);
  const [qi, setQi] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<null | { score: number; strengths: string[]; improvements: string[] }>(null);
  const [finished, setFinished] = useState(false);

  const questions = config ? buildQuestions(config.questionCount) : [];

  const endSession = () => {
    setConfig(null);
    setFeedback(null);
    setAnswer("");
    setQi(0);
    setFinished(false);
  };

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

  const nextQuestion = () => {
    if (qi + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setAnswer("");
    setFeedback(null);
    setQi(qi + 1);
  };

  if (!config) {
    return (
      <>
        <PageHeader
          title={
            <>
              AI <span className="text-gradient">Mock Interview</span>
            </>
          }
          subtitle="Choose your interview preferences."
        />

        <InterviewSetup onStart={(cfg) => setConfig(cfg)} />
      </>
    );
  }

  if (finished) {
    return (
      <>
        <PageHeader
          title="Session complete"
          subtitle={`${subjectLabels[config.subject] ?? config.subject} · ${difficultyLabels[config.difficulty] ?? config.difficulty}`}
          actions={
            <button onClick={endSession} className="glass rounded-xl px-4 py-2 text-sm">
              Back to setup
            </button>
          }
        />
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-lg">
            You completed all {questions.length} questions. Nice work!
          </p>
          <button onClick={endSession} className="btn-primary rounded-xl px-4 py-2 text-sm font-medium mt-6">
            Start another interview
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={`Mock Interview — ${subjectLabels[config.subject] ?? config.subject}`}
        subtitle={`Question ${qi + 1} of ${questions.length} · ${difficultyLabels[config.difficulty] ?? config.difficulty}`}
        actions={
          <button onClick={endSession} className="glass rounded-xl px-4 py-2 text-sm">
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
            onClick={nextQuestion}
            className="mt-6 btn-primary rounded-xl px-4 py-2 text-sm font-medium"
          >
            {qi + 1 >= questions.length ? "Finish session" : "Next question"}
          </button>
        </div>
      )}
    </>
  );
}
