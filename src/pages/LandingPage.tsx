import { motion } from "framer-motion";
import { ArrowRight, Brain, Target, Calendar, Code, Zap, BarChart3, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const problems = [
  { icon: BookOpen, title: "Complex Concepts", desc: "Hard to understand without personalized guidance" },
  { icon: Target, title: "Generic Platforms", desc: "One-size-fits-all approach doesn't work" },
  { icon: BarChart3, title: "No Weakness Tracking", desc: "Students can't identify what to improve" },
  { icon: Code, title: "No Interview Integration", desc: "Learning and interviews are disconnected" },
];

const features = [
  { icon: Brain, title: "Dynamic Adaptation", desc: "AI adjusts difficulty based on your performance in real-time", color: "primary" },
  { icon: Target, title: "AI Weakness Detection", desc: "Automatically identifies gaps in your understanding", color: "secondary" },
  { icon: Calendar, title: "Adaptive Smart Planner", desc: "Auto-adjusting study schedule that evolves with you", color: "accent" },
  { icon: Zap, title: "Interview-Specific Prep", desc: "Company-focused questions and AI feedback", color: "primary" },
  { icon: Sparkles, title: "Easy Language", desc: "Explanations in English + Hinglish for better understanding", color: "secondary" },
  { icon: BarChart3, title: "Seamless Learning Flow", desc: "From topic selection to mastery in one place", color: "accent" },
];

const flowSteps = [
  { step: "01", title: "Select Topic", desc: "Choose from DSA topics", icon: BookOpen },
  { step: "02", title: "AI Explains", desc: "Get personalized explanations", icon: Brain },
  { step: "03", title: "Practice", desc: "Solve adaptive problems", icon: Code },
  { step: "04", title: "Analyze & Plan", desc: "Track progress, update plan", icon: BarChart3 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">StudyOS</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-5xl">
          <motion.div className="text-center" variants={stagger} initial="initial" animate="animate">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> AI-Powered Learning Platform
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">StudyOS – Your</span>
              <br />
              <span className="gradient-text">Intelligent Learning OS</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Adaptive AI-powered learning & interview readiness platform. Your mentor, planner, and evaluator — all in one.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="gap-2 px-8 text-base">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg" className="px-8 text-base">
                  Explore Features
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-16 relative"
          >
            <div className="rounded-2xl border bg-card shadow-elevated p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Topics Mastered", value: "24", change: "+3 this week" },
                  { label: "Practice Problems", value: "156", change: "82% accuracy" },
                  { label: "Study Streak", value: "12 days", change: "🔥 Personal best" },
                  { label: "Interview Ready", value: "78%", change: "↑ 5% from last week" },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-muted/50 text-center">
                    <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm font-medium text-foreground mt-1">{stat.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -inset-1 rounded-2xl gradient-hero opacity-10 blur-2xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">The Problem with Traditional Learning</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Current platforms leave students struggling with a one-size-fits-all approach</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border bg-card shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Why StudyOS Stands Out</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">An intelligent system that adapts to you, not the other way around</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-xl border bg-card shadow-card hover:shadow-elevated transition-all hover:-translate-y-1"
              >
                <div className={`w-10 h-10 rounded-lg bg-${f.color}/10 flex items-center justify-center mb-4`}>
                  <f.icon className={`w-5 h-5 text-${f.color}`} />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Flow */}
      <section className="py-20 px-4">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Seamless Learning Flow</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flowSteps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative p-6 rounded-xl border bg-card shadow-card text-center"
              >
                <span className="font-display text-4xl font-bold gradient-text">{s.step}</span>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto my-4">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl gradient-hero p-10 md:p-14 text-center relative overflow-hidden"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Transform Your Learning?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">Join StudyOS and experience AI-powered personalized learning like never before.</p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="gap-2 px-8 text-base font-semibold">
                Start Learning Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 StudyOS. Built for the future of learning.</p>
        </div>
      </footer>
    </div>
  );
}
