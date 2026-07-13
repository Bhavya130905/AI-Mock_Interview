import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/30 blur-3xl animate-glow" />
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
            <span className="text-muted-foreground">Powered by Gemini AI</span>
          </div>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Accelerate Your <br />
            Career with <span className="text-gradient">AI</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Get personalized career guidance, AI resume analysis, interview preparation, learning
            resources and placement tracking—all in one platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium hover:[&]:btn-primary-hover"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#features"
              className="glass inline-flex items-center rounded-xl px-6 py-3 font-medium hover:bg-white/5 transition-colors"
            >
              Explore Features
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div>
              <div className="text-2xl font-bold text-foreground">50K+</div>
              <div>Students</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-2xl font-bold text-foreground">92%</div>
              <div>Placement Rate</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-2xl font-bold text-foreground">1M+</div>
              <div>Interviews</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative"
        >
          <div className="glass rounded-3xl p-3 shadow-elegant animate-float">
            <img
              src={heroImg}
              alt="AI career guidance dashboard illustration"
              width={1536}
              height={1280}
              className="w-full rounded-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
