import { useState } from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const missions = [
  "Binary Search Trees",
  "Dynamic Programming",
  "Graph Algorithms",
  "Recursion Basics",
];

export default function LearnPage() {
  const userId = localStorage.getItem("userId") || "user123";

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  const completeSession = async (xpEarned: number, duration: number) => {
    await fetch("http://localhost:5000/api/session/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        xpEarned,
        duration,
      }),
    });
  };

  const handleSelectTopic = async (topic: string) => {
    setSelectedTopic(topic);
    setLoading(true);
    setAiExplanation(null);

    try {
      const prompt = `
Explain ${topic} in a beginner-friendly way.
Include:
- Core idea
- Step-by-step explanation
- Common mistakes
- Optimized approach
`;

      const response = await fetch("/api/assistant/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: prompt }),
      });

      const data = await response.json();
      if (data.success) {
        setAiExplanation(data.answer);

        // 🎉 Award XP after learning
        await completeSession(50, 40);
        alert("Learning completed! +50 XP 🎉");
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">

      <h1 className="text-3xl font-bold">Learn Arena 🎮</h1>

      <div className="grid md:grid-cols-2 gap-5">
        {missions.map((m, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleSelectTopic(m)}
            className="cursor-pointer p-5 rounded-xl border"
          >
            <Brain className="w-5 h-5 text-primary mb-2" />
            <p className="font-medium">{m}</p>
          </motion.div>
        ))}
      </div>

      {selectedTopic && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 border rounded-xl">
          <h3 className="font-semibold mb-3">AI Explanation – {selectedTopic}</h3>

          {loading ? (
            <p>Generating explanation...</p>
          ) : (
            <pre className="whitespace-pre-wrap text-sm">{aiExplanation}</pre>
          )}
        </motion.div>
      )}
    </div>
  );
}