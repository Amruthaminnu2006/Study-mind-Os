import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Target,
  Calendar,
  Code,
  Zap,
  BarChart3,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/* ---------------- DATA ---------------- */

const problems = [
  { icon: BookOpen, title: "Complex Concepts", desc: "Hard to understand without personalized guidance" },
  { icon: Target, title: "Generic Platforms", desc: "One-size-fits-all approach doesn't work" },
  { icon: BarChart3, title: "No Weakness Tracking", desc: "Students can't identify what to improve" },
  { icon: Code, title: "No Interview Integration", desc: "Learning and interviews are disconnected" }
];

const features = [
  { icon: Brain, title: "Dynamic Adaptation", desc: "AI adjusts difficulty based on your performance in real-time" },
  { icon: Target, title: "AI Weakness Detection", desc: "Automatically identifies gaps in your understanding" },
  { icon: Calendar, title: "Adaptive Smart Planner", desc: "Auto-adjusting study schedule that evolves with you" },
  { icon: Zap, title: "Interview-Specific Prep", desc: "Company-focused questions and AI feedback" },
  { icon: Sparkles, title: "Easy Language", desc: "Explanations in English + Hinglish for better understanding" },
  { icon: BarChart3, title: "Seamless Learning Flow", desc: "From topic selection to mastery in one place" }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">
              StudyOS
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="container max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" /> AI-Powered Learning Platform
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            StudyOS – Your <br />
            <span className="gradient-text">Intelligent Learning OS</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Adaptive AI-powered learning & interview readiness platform.
            Your mentor, planner, and evaluator — all in one.
          </p>

          <div className="flex gap-4 justify-center">
            <Button size="lg">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4">
        <div className="container max-w-6xl bg-card shadow-card rounded-2xl p-8 grid md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold">24</p>
            <p className="text-muted-foreground">Topics Mastered</p>
            <p className="text-sm text-muted-foreground">+3 this week</p>
          </div>
          <div>
            <p className="text-3xl font-bold">156</p>
            <p className="text-muted-foreground">Practice Problems</p>
            <p className="text-sm text-muted-foreground">82% accuracy</p>
          </div>
          <div>
            <p className="text-3xl font-bold">12 days</p>
            <p className="text-muted-foreground">Study Streak</p>
            <p className="text-sm text-muted-foreground">🔥 Personal best</p>
          </div>
          <div>
            <p className="text-3xl font-bold">78%</p>
            <p className="text-muted-foreground">Interview Ready</p>
            <p className="text-sm text-muted-foreground">↑ 5% from last week</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl text-center">
          <h2 className="text-4xl font-bold mb-12">
            Why StudyOS Stands Out
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-xl border border-border bg-card shadow-card">
                <f.icon className="w-6 h-6 mb-4 mx-auto text-primary" />
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container max-w-6xl text-center">
          <h2 className="text-4xl font-bold mb-12">
            The Problem with Traditional Learning
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {problems.map((p, i) => (
              <div key={i} className="p-6 rounded-xl border border-border bg-card shadow-card">
                <p.icon className="w-6 h-6 mb-4 mx-auto text-destructive" />
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container max-w-3xl text-center gradient-hero rounded-2xl p-12 text-white shadow-elevated">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Learning?
          </h2>
          <Button size="lg" variant="secondary">
            Start Learning Now
          </Button>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-muted-foreground">
        © 2026 StudyOS
      </footer>
    </div>
  );
}