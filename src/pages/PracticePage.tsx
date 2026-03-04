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
  const [xp, setXp] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const userId = "user123";

  const handleSolve = async () => {

    if (!difficulty) return;

    const rewardXp = dummyQuestions[difficulty].xp;

    try {

      const res = await fetch(
        "http://localhost:5000/api/session/complete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId,
            xpEarned: rewardXp,
            duration: 30,
            topic: difficulty
          })
        }
      );

      const data = await res.json();

      if (data.success) {

        setXp(data.user.xp);

        setShowReward(true);

        setTimeout(() => {
          setShowReward(false);
        }, 2500);

      }

    } catch (err) {
      console.error("Session error:", err);
    }

  };

  const xpPercentage = (xp % 100);

  return (
    <div className="space-y-8 max-w-5xl">

      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Practice Arena <Swords className="text-orange-500" />
        </h1>

        <p className="text-muted-foreground mt-2">
          Choose your battle and earn XP.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">

        {["Easy", "Medium", "Hard"].map((level) => (

          <motion.div
            key={level}
            whileHover={{ scale: 1.05 }}
            onClick={() => setDifficulty(level as any)}
            className={`cursor-pointer p-5 rounded-xl border
            ${
              difficulty === level
                ? "border-purple-500 shadow-md bg-card"
                : "bg-card border-border"
            }`}
          >

            <div className="flex items-center justify-between">

              <h3 className="font-semibold">{level}</h3>

              {level === "Easy" && <Flame className="text-green-500" />}
              {level === "Medium" && <Brain className="text-yellow-500" />}
              {level === "Hard" && <Trophy className="text-red-500" />}

            </div>

            <p className="text-xs text-muted-foreground mt-2">
              +{dummyQuestions[level as "Easy" | "Medium" | "Hard"].xp} XP
            </p>

          </motion.div>

        ))}

      </div>

      <AnimatePresence>

        {difficulty && (

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-6 rounded-xl bg-card border"
          >

            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="text-purple-500" />
              Challenge
            </h3>

            <p className="text-foreground mb-4">
              {dummyQuestions[difficulty].question}
            </p>

            <button
              onClick={handleSolve}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Submit Solution 🚀
            </button>

          </motion.div>

        )}

      </AnimatePresence>

      <div className="p-6 rounded-xl bg-card border">

        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold">Your XP</h3>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <motion.div
            animate={{ width: `${xpPercentage}%` }}
            className="h-full bg-purple-600"
          />

        </div>

        <p className="text-sm text-muted-foreground mt-2">
          {xp} XP
        </p>

      </div>

      <AnimatePresence>

        {showReward && difficulty && (

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            className="fixed bottom-10 right-10 bg-white border shadow-xl rounded-xl p-6"
          >

            <h4 className="font-semibold mb-2">
              ⭐ Mission Complete!
            </h4>

            <div className="flex gap-1 mb-2">

              {[...Array(dummyQuestions[difficulty].stars)].map((_, i) => (

                <Star
                  key={i}
                  className="text-yellow-500 fill-yellow-500 w-5 h-5"
                />

              ))}

            </div>

            <p className="text-sm text-gray-500">
              +{dummyQuestions[difficulty].xp} XP earned
            </p>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}