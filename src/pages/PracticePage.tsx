import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Trophy,
  Flame,
  Brain,
  Sparkles,
  Swords
} from "lucide-react";

const dummyQuestions = {
  Easy: {
    question: "Find the maximum element in an array.",
    xp: 50,
    stars: 1
  },
  Medium: {
    question: "Check if a binary tree is balanced.",
    xp: 100,
    stars: 2
  },
  Hard: {
    question: "Implement LRU Cache with O(1) operations.",
    xp: 200,
    stars: 3
  }
};

export default function PracticePage() {
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard" | "">("");
  const [xp, setXp] = useState(830);
  const [showReward, setShowReward] = useState(false);

  const handleSolve = () => {
    if (!difficulty) return;

    const rewardXp = dummyQuestions[difficulty].xp;
    setXp(prev => prev + rewardXp);
    setShowReward(true);

    setTimeout(() => setShowReward(false), 2500);
  };

  const xpPercentage = (xp / 1000) * 100;

  return (
    <div className="space-y-8 max-w-5xl">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold gradient-text flex items-center gap-2">
          Practice Arena <Swords className="text-accent" />
        </h1>
        <p className="text-muted-foreground mt-2">
          Choose your battle and earn XP.
        </p>
      </div>

      {/* Difficulty Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {["Easy", "Medium", "Hard"].map((level) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={level}
            onClick={() => setDifficulty(level as any)}
            className={`cursor-pointer p-5 rounded-xl border transition-all
              ${difficulty === level
                ? "border-primary shadow-glow bg-card"
                : "bg-card border-border"}
            `}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{level}</h3>
              {level === "Easy" && <Flame className="text-success" />}
              {level === "Medium" && <Brain className="text-warning" />}
              {level === "Hard" && <Trophy className="text-destructive" />}
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              +{dummyQuestions[level as "Easy" | "Medium" | "Hard"].xp} XP
            </p>
          </motion.div>
        ))}
      </div>

      {/* Question Display */}
      <AnimatePresence>
        {difficulty && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-6 rounded-2xl bg-card border shadow-elevated"
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="text-primary" />
              Challenge:
            </h3>

            <p className="text-foreground mb-4">
              {dummyQuestions[difficulty].question}
            </p>

            <button
              onClick={handleSolve}
              className="px-5 py-2 rounded-lg gradient-hero text-white shadow-glow hover:opacity-90 transition"
            >
              Submit Solution 🚀
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* XP Progress */}
      <div className="p-6 rounded-2xl bg-card border shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-5 h-5 text-accent" />
          <h3 className="font-semibold">Your XP</h3>
        </div>

        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <motion.div
            animate={{ width: `${xpPercentage}%` }}
            className="h-full gradient-hero rounded-full"
          />
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          {xp} / 1000 XP
        </p>
      </div>

      {/* Reward Popup */}
      <AnimatePresence>
        {showReward && difficulty && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            className="fixed bottom-10 right-10 bg-card border shadow-elevated rounded-xl p-6"
          >
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              ⭐ Mission Complete!
            </h4>

            <div className="flex gap-1 mb-2">
              {[...Array(dummyQuestions[difficulty].stars)].map((_, i) => (
                <Star key={i} className="text-warning fill-warning w-5 h-5" />
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              +{dummyQuestions[difficulty].xp} XP earned
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}