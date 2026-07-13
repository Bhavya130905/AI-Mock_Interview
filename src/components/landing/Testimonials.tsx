import { Star } from "lucide-react";

const items = [
  { name: "Aarav Sharma", role: "SDE @ Microsoft", quote: "The roadmap and mock interviews got me interview-ready in 4 months. Landed my dream role!" },
  { name: "Priya Nair", role: "Data Scientist @ Flipkart", quote: "The ATS resume feedback alone was worth it. My callbacks tripled after the rewrite." },
  { name: "Rohan Verma", role: "Full Stack @ Uber", quote: "Personalized skill gap analysis showed me exactly what to focus on. Game changer." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Loved by <span className="text-gradient">students</span>
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {items.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6 hover:shadow-elegant transition-shadow">
              <div className="flex gap-1 text-primary-glow">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full btn-primary font-semibold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
