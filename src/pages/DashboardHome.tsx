import { motion } from "framer-motion";
import { BookOpen, Code, BarChart3, Target, Brain, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

/* ============================= */
/* EXISTING STATIC DATA */
/* ============================= */

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

/* ============================= */
/* DASHBOARD DYNAMIC DATA */
/* ============================= */

const dashboardData = {
  todayFocus: {
    topic: "Mechanics – Laws of Motion",
    time: "45 minutes"
  },
  xp: 240,
  totalXp: 300
};

const xpPercentage = (dashboardData.xp / dashboardData.totalXp) * 100;

/* ============================= */
/* COMPONENT */
/* ============================= */

export default function DashboardHome() {
  return (
    <div className="space-y-6 max-w-6xl">

      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Your learning overview at a glance</p>
      </div>

      {/* ===================================================== */}
      {/* ✅ UPDATED: 60-40 LAYOUT (Smart Focus + Calendar) */}
      {/* ===================================================== */}

      <div className="grid lg:grid-cols-5 gap-6">

        {/* ================= LEFT SIDE (60%) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 p-6 rounded-xl border bg-card shadow-card"
        >
          <div className="flex items-center gap-3 mb-3">
            <Brain className="w-6 h-6 text-primary" />
            <h2 className="font-display font-semibold text-foreground">
              🔥 Today’s Smart Focus
            </h2>
          </div>

          <p className="text-foreground font-medium">
            {dashboardData.todayFocus.topic}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Estimated Time: {dashboardData.todayFocus.time}
          </p>

          <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition">
            Start Session
          </button>
        </motion.div>

        {/* ================= RIGHT SIDE (40%) ================= */}
        {/* ✅ NEW: LeetCode Style Calendar Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 p-6 rounded-xl border bg-card shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">
              March 2026
            </h3>
            <span className="text-sm text-muted-foreground">
              🔥 12 day streak
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-xs text-center">

            {/* Days */}
            {["S","M","T","W","T","F","S"].map((d, i) => (
              <div key={i} className="text-muted-foreground font-medium">
                {d}
              </div>
            ))}

            {/* Calendar Cells */}
            {[...Array(31)].map((_, i) => (
              <div
                key={i}
                className={`h-8 rounded-md flex items-center justify-center transition
                  ${i % 4 === 0 ? "bg-success/50" :
                    i % 3 === 0 ? "bg-success/30" :
                    "bg-muted hover:bg-muted/70"}`}
              >
                {i + 1}
              </div>
            ))}

          </div>
        </motion.div>
      </div>

      {/* ===================================================== */}
      {/* STATS SECTION */}
      {/* ===================================================== */}

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

            {/* XP Progress Only for Topics Learned */}
            {s.label === "Topics Learned" && (
              <div className="mt-3">
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {dashboardData.xp} / {dashboardData.totalXp} XP
                </p>
              </div>
            )}

            <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
          </motion.div>
        ))}
      </div>

      {/* ===================================================== */}
      {/* LOWER SECTION */}
      {/* ===================================================== */}

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

        {/* Topic Progress */}
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
                      t.progress >= 70 ? "bg-success" :
                      t.progress >= 50 ? "bg-info" :
                      t.progress >= 40 ? "bg-warning" :
                      "bg-destructive"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Study Time */}
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