import { motion } from "framer-motion";
import { BookOpen, Code, BarChart3, Target, Calendar, Brain, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Topics Learned", value: "24", icon: BookOpen, change: "+3 this week", color: "primary" },
  { label: "Problems Solved", value: "156", icon: Code, change: "82% accuracy", color: "secondary" },
  { label: "Weak Areas", value: "5", icon: BarChart3, change: "2 improving", color: "accent" },
  { label: "Interview Ready", value: "78%", icon: Target, change: "+5% this week", color: "primary" },
];

const recentTopics = [
  { name: "Binary Search Trees", progress: 85, status: "Strong" },
  { name: "Dynamic Programming", progress: 45, status: "Needs Work" },
  { name: "Graph Algorithms", progress: 60, status: "In Progress" },
  { name: "Recursion", progress: 30, status: "Weak" },
];

const quickActions = [
  { title: "Continue Learning", desc: "Resume Binary Trees", icon: BookOpen, path: "/dashboard/learn", color: "primary" },
  { title: "Daily Practice", desc: "3 problems queued", icon: Code, path: "/dashboard/practice", color: "secondary" },
  { title: "Review Weaknesses", desc: "5 areas to improve", icon: BarChart3, path: "/dashboard/weakness", color: "accent" },
  { title: "Interview Prep", desc: "Google mock ready", icon: Target, path: "/dashboard/interview", color: "primary" },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Your learning overview at a glance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-xl border bg-card shadow-card"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg bg-${s.color}/10 flex items-center justify-center`}>
                <s.icon className={`w-5 h-5 text-${s.color}`} />
              </div>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div>
          <h2 className="font-display font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((a, i) => (
              <Link key={i} to={a.path}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl border bg-card shadow-card hover:shadow-elevated transition-all flex items-center gap-4 group cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-lg bg-${a.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <a.icon className={`w-5 h-5 text-${a.color}`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{a.title}</p>
                    <p className="text-sm text-muted-foreground">{a.desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Topics */}
        <div>
          <h2 className="font-display font-semibold text-foreground mb-4">Topic Progress</h2>
          <div className="rounded-xl border bg-card shadow-card p-5 space-y-4">
            {recentTopics.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{t.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    t.status === "Strong" ? "bg-success/10 text-success" :
                    t.status === "Weak" ? "bg-destructive/10 text-destructive" :
                    t.status === "Needs Work" ? "bg-warning/10 text-warning" :
                    "bg-info/10 text-info"
                  }`}>{t.status}</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${t.progress}%` }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    className={`h-full rounded-full ${
                      t.progress >= 70 ? "bg-success" : t.progress >= 50 ? "bg-info" : t.progress >= 40 ? "bg-warning" : "bg-destructive"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Study time */}
          <div className="mt-4 rounded-xl border bg-card shadow-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Today's Study</h3>
            </div>
            <p className="text-3xl font-display font-bold text-foreground">2h 45m</p>
            <p className="text-sm text-muted-foreground mt-1">Goal: 3 hours</p>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-3">
              <div className="h-full w-[92%] rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
