import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Is CareerPilot AI free for students?", a: "Yes, core features including skill analysis, roadmap and mock interviews are free for students." },
  { q: "Which AI powers the analysis?", a: "We use Google's Gemini API for resume analysis, interview feedback and personalized roadmaps." },
  { q: "Does the ATS score match real ATS systems?", a: "Our scoring emulates common ATS parsers and provides actionable keyword and formatting suggestions." },
  { q: "Can I use it for internship prep too?", a: "Absolutely. Select internship as your goal and get a tailored roadmap and question set." },
  { q: "Is my resume data secure?", a: "Yes. Resumes are encrypted at rest and never shared with third parties." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
