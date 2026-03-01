import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Trophy, Flame, Sparkles } from "lucide-react";

/* ============================= */
/* Dummy Topics */
/* ============================= */

const missions = [
  { title: "Binary Search Trees", level: "Medium", xp: 120 },
  { title: "Dynamic Programming", level: "Hard", xp: 200 },
  { title: "Graph Algorithms", level: "Medium", xp: 150 },
  { title: "Recursion Basics", level: "Easy", xp: 80 },
];

export default function LearnPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setLoading(true);
    setAiExplanation(null);

    // Simulated AI delay
    setTimeout(() => {
      setAiExplanation(
        `🤖 AI Explanation for ${topic}

This topic covers important concepts and real interview patterns.

• Core idea  
• Problem-solving strategy  
• Common mistakes  
• Optimized approach  

(Backend integration will replace this dummy text)`
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-6xl">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold gradient-text">
          Learn Arena 🎮
        </h1>
        <p className="text-muted-foreground mt-2">
          Choose your mission and unlock AI-powered mastery.
        </p>
      </div>

      {/* Daily Challenge */}
      <div className="p-6 rounded-2xl gradient-card border shadow-elevated">
        <div className="flex items-center gap-3 mb-3">
          <Flame className="text-secondary w-6 h-6" />
          <h2 className="font-semibold text-lg">Daily Challenge</h2>
        </div>

        <p className="font-medium">Mechanics – Laws of Motion</p>
        <p className="text-sm text-muted-foreground mb-4">
          Complete today's mission to earn bonus XP.
        </p>

        <button
          onClick={() => handleSelectTopic("Mechanics – Laws of Motion")}
          className="px-5 py-2 rounded-lg bg-primary text-white hover:shadow-glow transition"
        >
          Start Mission ⚡
        </button>
      </div>

      {/* XP Progress */}
      <div className="p-6 rounded-2xl bg-card border shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-5 h-5 text-accent" />
          <h3 className="font-semibold">Your XP Progress</h3>
        </div>

        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div className="h-full w-[68%] gradient-hero rounded-full" />
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          Level 3 • 680 / 1000 XP
        </p>
      </div>

      {/* Missions */}
      <div>
        <h2 className="font-semibold mb-4">Available Missions</h2>

        <div className="grid md:grid-cols-2 gap-5">
          {missions.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleSelectTopic(m.title)}
              className="cursor-pointer p-5 rounded-xl bg-card border shadow-card hover:shadow-elevated transition"
            >
              <div className="flex items-center justify-between">
                <Brain className="w-5 h-5 text-primary" />
                <span className="text-xs px-2 py-1 rounded-full bg-muted">
                  {m.level}
                </span>
              </div>

              <p className="mt-3 font-medium">{m.title}</p>
              <p className="text-sm text-muted-foreground mt-1">
                +{m.xp} XP
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Topic Selector */}
      <div className="p-6 rounded-2xl bg-card border shadow-card">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Or Choose Custom Topic
        </h3>

        <select
          onChange={(e) => handleSelectTopic(e.target.value)}
          className="w-full p-3 rounded-lg bg-muted border"
        >
          <option>Select a topic...</option>
          <option>Binary Search Trees</option>
          <option>Dynamic Programming</option>
          <option>Graph Theory</option>
          <option>Recursion</option>
        </select>
      </div>

      {/* AI Explanation Panel */}
      {selectedTopic && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-card border shadow-elevated"
        >
          <h3 className="font-semibold mb-3">
            🤖 AI Explanation – {selectedTopic}
          </h3>

          {loading ? (
            <p className="animate-pulse text-muted-foreground">
              Generating AI explanation...
            </p>
          ) : (
            <p className="whitespace-pre-line text-foreground">
              {aiExplanation}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}