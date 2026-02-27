import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Play, CheckCircle, AlertTriangle, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const mockQuestions: Record<string, { title: string; desc: string; hint: string }> = {
  Easy: {
    title: "Two Sum",
    desc: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nExample:\nInput: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\nExplanation: Because nums[0] + nums[1] == 9",
    hint: "Try using a hash map for O(n) solution",
  },
  Medium: {
    title: "Longest Substring Without Repeating Characters",
    desc: "Given a string s, find the length of the longest substring without repeating characters.\n\nExample:\nInput: s = 'abcabcbb'\nOutput: 3\nExplanation: The answer is 'abc', with the length of 3.",
    hint: "Use sliding window technique with a set",
  },
  Hard: {
    title: "Merge K Sorted Lists",
    desc: "You are given an array of k linked-lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.\n\nExample:\nInput: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
    hint: "Use a min-heap/priority queue for optimal solution",
  },
};

const mockFeedback = {
  mistakes: ["Variable 'i' is not initialized before use in line 5", "Missing edge case: empty array input"],
  optimization: "Consider using a HashMap instead of nested loops. This would reduce time complexity from O(n²) to O(n). Also, you can early-return when a match is found.",
  timeComplexity: "Current: O(n²) — Can be optimized to O(n)",
  spaceComplexity: "Current: O(1) — With HashMap it becomes O(n)",
};

export default function PracticePage() {
  const [difficulty, setDifficulty] = useState("");
  const [question, setQuestion] = useState<typeof mockQuestions["Easy"] | null>(null);
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const generateQuestion = () => {
    if (difficulty) {
      setQuestion(mockQuestions[difficulty]);
      setCode("");
      setSubmitted(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Practice</h1>
        <p className="text-muted-foreground mt-1">Solve problems and get AI-powered feedback</p>
      </div>

      <div className="rounded-xl border bg-card shadow-card p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground mb-2 block">Difficulty</label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger><SelectValue placeholder="Select difficulty..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">🟢 Easy</SelectItem>
                <SelectItem value="Medium">🟡 Medium</SelectItem>
                <SelectItem value="Hard">🔴 Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={generateQuestion} disabled={!difficulty} className="gap-2">
            <Play className="w-4 h-4" /> Generate Question
          </Button>
        </div>
      </div>

      {question && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="rounded-xl border bg-card shadow-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-foreground">{question.title}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  difficulty === "Easy" ? "bg-success/10 text-success" :
                  difficulty === "Medium" ? "bg-warning/10 text-warning" :
                  "bg-destructive/10 text-destructive"
                }`}>{difficulty}</span>
              </div>
            </div>
            <pre className="whitespace-pre-wrap font-body text-sm text-foreground leading-relaxed">{question.desc}</pre>
            <p className="text-xs text-muted-foreground mt-3 italic">💡 Hint: {question.hint}</p>
          </div>

          <div className="rounded-xl border bg-card shadow-card p-6">
            <label className="text-sm font-medium text-foreground mb-2 block">Your Solution</label>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Write your solution here..."
              className="font-mono text-sm min-h-[200px] bg-muted/30"
            />
            <div className="flex justify-end mt-4">
              <Button onClick={() => setSubmitted(true)} disabled={!code.trim()} className="gap-2">
                <CheckCircle className="w-4 h-4" /> Submit
              </Button>
            </div>
          </div>

          {submitted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="rounded-xl border bg-card shadow-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" /> Mistakes Detected
                </h3>
                <ul className="space-y-2">
                  {mockFeedback.mistakes.map((m, i) => (
                    <li key={i} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-destructive mt-0.5">•</span> {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border bg-card shadow-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-secondary" /> Optimization Suggestions
                </h3>
                <p className="text-sm text-foreground leading-relaxed">{mockFeedback.optimization}</p>
              </div>

              <div className="rounded-xl border bg-card shadow-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" /> Complexity Analysis
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Time Complexity</p>
                    <p className="text-sm font-medium text-foreground mt-1">{mockFeedback.timeComplexity}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Space Complexity</p>
                    <p className="text-sm font-medium text-foreground mt-1">{mockFeedback.spaceComplexity}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
