import { motion } from "framer-motion";

const steps = [
  "Sign Up",
  "Career Goal",
  "Skill Assessment",
  "AI Gap Analysis",
  "Roadmap",
  "Resume ATS",
  "Interview Prep",
  "Placement Ready",
];

export function Flow() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="glass inline-block rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            The Journey
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            From student to <span className="text-gradient">placed</span>
          </h2>
        </div>
        <div className="mt-14 relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent hidden lg:block" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="glass rounded-2xl p-4 text-center relative"
              >
                <div className="mx-auto grid h-10 w-10 place-items-center rounded-full btn-primary text-sm font-semibold">
                  {i + 1}
                </div>
                <div className="mt-3 text-sm font-medium">{s}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
