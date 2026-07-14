import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Upload, FileText, CheckCircle2, AlertTriangle, XCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/resume")({
  component: ResumePage,
  head: () => ({ meta: [{ title: "Resume ATS — CareerPilot AI" }] }),
});

function ResumePage() {
  const [file, setFile] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);

  const analyze = () => {
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setDone(true); }, 1400);
  };

  return (
    <>
      <PageHeader
        title={<>Resume <span className="text-gradient">ATS Analyzer</span></>}
        subtitle="Upload your resume, get an ATS score and AI-powered suggestions."
      />

      {!done && (
        <label className="glass rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors border-2 border-dashed border-white/10">
          <div className="grid h-16 w-16 place-items-center rounded-2xl btn-primary mb-4">
            <Upload className="h-7 w-7" />
          </div>
          <div className="font-semibold text-lg">Drop your resume here</div>
          <div className="text-sm text-muted-foreground mt-1">PDF or DOCX · max 5MB</div>
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0]?.name ?? "resume.pdf")}
          />
          {file && (
            <div className="mt-6 flex items-center gap-2 glass rounded-xl px-4 py-2">
              <FileText className="h-4 w-4 text-primary-glow" />
              <span className="text-sm">{file}</span>
            </div>
          )}
          {file && (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); analyze(); }}
              disabled={analyzing}
              className="mt-6 btn-primary rounded-xl px-6 py-3 font-medium inline-flex items-center gap-2 disabled:opacity-60"
            >
              <Sparkles className="h-4 w-4" />
              {analyzing ? "Analyzing..." : "Analyze with AI"}
            </button>
          )}
        </label>
      )}

      {done && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="42" strokeWidth="10" className="stroke-white/10" fill="none" />
                <circle
                  cx="50" cy="50" r="42" strokeWidth="10" fill="none"
                  stroke="url(#g1)" strokeLinecap="round"
                  strokeDasharray={`${(84 / 100) * 264} 264`}
                />
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.24 295)" />
                    <stop offset="100%" stopColor="oklch(0.75 0.2 300)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div>
                  <div className="text-4xl font-bold text-gradient">84</div>
                  <div className="text-xs text-muted-foreground">ATS Score</div>
                </div>
              </div>
            </div>
            <div className="mt-4 font-semibold">Strong match</div>
            <div className="text-xs text-muted-foreground">for Software Engineer roles</div>
          </div>

          <div className="glass rounded-2xl p-6 lg:col-span-2">
            <h3 className="font-semibold mb-4">Breakdown</h3>
            {[
              { label: "Keyword match", value: 78 },
              { label: "Formatting & parseability", value: 92 },
              { label: "Impact & metrics", value: 65 },
              { label: "Skills coverage", value: 80 },
              { label: "Readability", value: 88 },
            ].map((r) => (
              <div key={r.label} className="mb-3">
                <div className="flex justify-between text-sm mb-1"><span>{r.label}</span><span className="text-muted-foreground">{r.value}%</span></div>
                <div className="h-2 bg-white/5 rounded-full">
                  <div className="h-full rounded-full" style={{ width: `${r.value}%`, background: "var(--gradient-primary)" }} />
                </div>
              </div>
            ))}
          </div>

          <div className="glass rounded-2xl p-6 lg:col-span-3">
            <h3 className="font-semibold mb-4">AI Suggestions</h3>
            <ul className="space-y-3">
              {[
                { icon: CheckCircle2, tone: "text-emerald-400", text: "Great use of action verbs like 'led', 'built', 'shipped'." },
                { icon: AlertTriangle, tone: "text-orange-400", text: "Add measurable impact — e.g. 'reduced load time by 42%'." },
                { icon: XCircle, tone: "text-rose-400", text: "Missing keywords: TypeScript, Docker, CI/CD, REST API." },
                { icon: AlertTriangle, tone: "text-orange-400", text: "Skills section should be near the top for ATS parsers." },
                { icon: CheckCircle2, tone: "text-emerald-400", text: "Contact info is clean and machine-readable." },
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <s.icon className={`h-5 w-5 shrink-0 ${s.tone}`} />
                  <span>{s.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <button onClick={() => { setDone(false); setFile(null); }} className="glass rounded-xl px-4 py-2 text-sm">Analyze another</button>
              <button className="btn-primary rounded-xl px-4 py-2 text-sm font-medium">Download improved resume</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
