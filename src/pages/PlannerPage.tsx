import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Play, Pause, RotateCcw, CheckCircle, AlertTriangle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const weeklySchedule = [
  { day: "Monday", topics: ["Arrays Review", "Two Pointer Practice"], time: "2h", completed: true, missed: false },
  { day: "Tuesday", topics: ["Linked Lists", "Stack Problems"], time: "2.5h", completed: true, missed: false },
  { day: "Wednesday", topics: ["Recursion Deep Dive"], time: "2h", completed: false, missed: true },
  { day: "Thursday", topics: ["Recursion (Rescheduled)", "Tree Basics"], time: "3h", completed: false, missed: false },
  { day: "Friday", topics: ["BST Operations", "Practice Set"], time: "2.5h", completed: false, missed: false },
  { day: "Saturday", topics: ["Graph Intro", "BFS/DFS"], time: "3h", completed: false, missed: false },
  { day: "Sunday", topics: ["Weekly Revision", "Mock Test"], time: "2h", completed: false, missed: false },
];

const reminders = [
  { text: "Revise Arrays & Two Pointers", time: "Today, 4:00 PM" },
  { text: "Complete Recursion assignment", time: "Tomorrow, 10:00 AM" },
  { text: "Weekly mock test", time: "Sunday, 2:00 PM" },
];

export default function PlannerPage() {
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timerRunning, timeLeft]);

  const resetTimer = () => { setTimerRunning(false); setTimeLeft(25 * 60); };
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Smart Planner</h1>
        <p className="text-muted-foreground mt-1">AI-generated study schedule that adapts to you</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <div className="lg:col-span-2 rounded-xl border bg-card shadow-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-display font-semibold text-foreground">Weekly Schedule</h2>
          </div>
          <div className="space-y-3">
            {weeklySchedule.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-4 rounded-lg border ${
                  d.missed ? "border-destructive/30 bg-destructive/5" :
                  d.completed ? "border-success/30 bg-success/5" :
                  "bg-muted/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-sm text-foreground">{d.day}</span>
                    {d.missed && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Missed — Rescheduled
                      </span>
                    )}
                    {d.completed && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Completed
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {d.time}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {d.topics.map((t, j) => (
                    <span key={j} className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Pomodoro */}
          <div className="rounded-xl border bg-card shadow-card p-6 text-center">
            <div className="flex items-center gap-2 justify-center mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Pomodoro Timer</h3>
            </div>
            <div className="text-5xl font-display font-bold text-foreground mb-6">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => setTimerRunning(!timerRunning)} size="sm" className="gap-1.5">
                {timerRunning ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Start</>}
              </Button>
              <Button onClick={resetTimer} variant="outline" size="sm" className="gap-1.5">
                <RotateCcw className="w-4 h-4" /> Reset
              </Button>
            </div>
          </div>

          {/* Reminders */}
          <div className="rounded-xl border bg-card shadow-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-secondary" />
              <h3 className="font-display font-semibold text-foreground">Revision Reminders</h3>
            </div>
            <div className="space-y-3">
              {reminders.map((r, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/30 border">
                  <p className="text-sm font-medium text-foreground">{r.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{r.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
