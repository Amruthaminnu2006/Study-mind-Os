import { motion } from "framer-motion";
import { BarChart3, TrendingDown, Target, Lightbulb } from "lucide-react";

const weaknesses = [
  { topic: "Recursion", score: 35, issues: ["Base case identification", "Stack overflow prevention", "Tail recursion"], trend: "improving" },
  { topic: "Dynamic Programming", score: 28, issues: ["State transition", "Memoization patterns", "Bottom-up conversion"], trend: "stable" },
  { topic: "Time Complexity", score: 42, issues: ["Amortized analysis", "Log factor identification", "Space-time tradeoffs"], trend: "improving" },
  { topic: "Graph Traversal", score: 50, issues: ["BFS vs DFS selection", "Cycle detection", "Topological sort"], trend: "declining" },
  { topic: "Bit Manipulation", score: 20, issues: ["XOR properties", "Bit masking", "Power of 2 checks"], trend: "stable" },
];

const improvementPlan = [
  { week: "This Week", tasks: ["Complete 5 recursion problems", "Review base case patterns", "Practice tree recursion"] },
  { week: "Next Week", tasks: ["Start DP fundamentals", "Solve 3 memoization problems", "Learn state transition formulas"] },
  { week: "Week 3", tasks: ["Graph algorithms deep dive", "Practice BFS/DFS variations", "Solve 5 graph problems"] },
];

export default function WeaknessPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Weakness Analysis</h1>
        <p className="text-muted-foreground mt-1">AI-detected areas that need your attention</p>
      </div>

      {/* Weakness chart */}
      <div className="rounded-xl border bg-card shadow-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-accent" />
          </div>
          <h2 className="font-display font-semibold text-foreground">Weakness Map</h2>
        </div>
        <div className="space-y-4">
          {weaknesses.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{w.topic}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    w.trend === "improving" ? "bg-success/10 text-success" :
                    w.trend === "declining" ? "bg-destructive/10 text-destructive" :
                    "bg-warning/10 text-warning"
                  }`}>
                    {w.trend === "improving" ? "↑ Improving" : w.trend === "declining" ? "↓ Declining" : "→ Stable"}
                  </span>
                  <span className="text-sm font-medium text-foreground">{w.score}%</span>
                </div>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${w.score}%` }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className={`h-full rounded-full ${
                    w.score >= 50 ? "bg-warning" : w.score >= 30 ? "bg-secondary" : "bg-destructive"
                  }`}
                />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {w.issues.map((issue, j) => (
                  <span key={j} className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">{issue}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Focus areas */}
      <div className="rounded-xl border bg-card shadow-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-destructive" />
          </div>
          <h2 className="font-display font-semibold text-foreground">Top Focus Areas</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {weaknesses.slice(0, 3).map((w, i) => (
            <div key={i} className="p-4 rounded-lg bg-muted/30 border">
              <p className="font-medium text-foreground text-sm">{w.topic}</p>
              <p className="text-2xl font-display font-bold text-destructive mt-1">{w.score}%</p>
              <p className="text-xs text-muted-foreground mt-1">Needs immediate attention</p>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Plan */}
      <div className="rounded-xl border bg-card shadow-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-display font-semibold text-foreground">AI Improvement Plan</h2>
        </div>
        <div className="space-y-4">
          {improvementPlan.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }} className="p-4 rounded-lg border bg-muted/20">
              <p className="font-display font-semibold text-foreground text-sm mb-2">{p.week}</p>
              <ul className="space-y-1.5">
                {p.tasks.map((t, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                    <Target className="w-3 h-3 text-primary shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
