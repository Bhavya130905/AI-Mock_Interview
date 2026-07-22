import { motion } from "framer-motion";
import {
  Brain,
  FileText,
  MessageSquare,
  BookOpen,
  BarChart3,
  Target,
  Award,
  Route as RouteIcon,
} from "lucide-react";

const features = [
  { icon: Brain, title: "AI Skill Gap Analysis", desc: "Identify strengths, weak areas and get an interview readiness score." },
  { icon: RouteIcon, title: "Personalized Roadmap", desc: "6-month timeline generated for your career goal and target companies." },
  { icon: FileText, title: "Resume ATS Score", desc: "Analyze structure, keywords and get an improved, ATS-optimized resume." },
  { icon: MessageSquare, title: "Mock Interviews", desc: "AI-generated questions with feedback on clarity, correctness & confidence." },
  { icon: BookOpen, title: "Curated Resources", desc: "YouTube, roadmaps, notes and practice links for every skill." },
  { icon: BarChart3, title: "Progress Dashboard", desc: "Track weekly progress, skill distribution and interview performance." },
  { icon: Target, title: "Company Prep", desc: "Company-wise question banks for Google, Microsoft, Amazon and more." },
  { icon: Award, title: "Gamified Learning", desc: "Badges, streaks and leaderboards to keep you consistent." },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="glass inline-block rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            Features
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Everything you need to <span className="text-gradient">get placed</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A complete AI-powered toolkit built for students preparing for internships and full-time
            offers.
          </p>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass rounded-2xl p-6 hover:shadow-elegant hover:-translate-y-1 transition-all"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl btn-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
