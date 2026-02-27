import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Building2, Brain, MessageSquare, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const topics = ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming", "Recursion", "Sorting", "Searching"];
const companies = ["Google", "Amazon", "Microsoft", "Meta", "Apple"];

const mockQuestions: Record<string, Record<string, { question: string; followUp: string }>> = {
  Google: {
    Medium: {
      question: "Design an algorithm to find the kth largest element in an unsorted array. Can you do it without sorting the entire array?\n\nExample:\nInput: [3, 2, 1, 5, 6, 4], k = 2\nOutput: 5\n\nFollow-up: What is the average time complexity of your solution?",
      followUp: "How would you modify your approach if the array was streaming (elements arriving one by one)?",
    },
    Easy: {
      question: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be inserted.\n\nExample:\nInput: [1, 3, 5, 6], target = 5\nOutput: 2",
      followUp: "Can you prove that your solution has O(log n) time complexity?",
    },
    Hard: {
      question: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\nExample:\nInput: [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
      followUp: "Can you solve this in O(1) space?",
    },
  },
  Amazon: {
    Medium: {
      question: "Design an LRU (Least Recently Used) cache with the following operations:\n• get(key) — O(1)\n• put(key, value) — O(1)\n\nWhen the cache reaches capacity, evict the least recently used item.",
      followUp: "How would you handle this in a distributed system?",
    },
    Easy: {
      question: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string has valid bracket ordering.\n\nExample:\nInput: '({[]})'\nOutput: true",
      followUp: "What data structure did you use and why?",
    },
    Hard: {
      question: "Given a list of delivery locations and distances between them, find the optimal route that minimizes total delivery time while respecting delivery time windows.",
      followUp: "How would you handle real-time traffic updates?",
    },
  },
};

const mockFeedback = {
  strengths: ["Good problem decomposition", "Correct time complexity analysis", "Clean code structure"],
  improvements: ["Consider edge cases (empty input, single element)", "Explain your thought process more clearly", "Discuss space-time tradeoffs"],
  rating: "7/10",
  verdict: "You demonstrated solid understanding of the core algorithm. Focus on communicating your thought process and handling edge cases to improve your interview performance.",
};

export default function InterviewPage() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [company, setCompany] = useState("");
  const [generated, setGenerated] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQ = company && difficulty && mockQuestions[company]?.[difficulty]
    ? mockQuestions[company][difficulty]
    : { question: `Design an efficient solution for a ${difficulty?.toLowerCase() || "medium"}-level ${topic || "algorithm"} problem commonly asked at ${company || "top tech companies"}.\n\nConsider:\n• Time and space complexity\n• Edge cases\n• Code readability`, followUp: "How would you optimize this further?" };

  const handleGenerate = () => {
    setGenerated(true);
    setAnswer("");
    setShowFeedback(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Interview Preparation</h1>
        <p className="text-muted-foreground mt-1">Company-specific practice with AI feedback</p>
      </div>

      <div className="rounded-xl border bg-card shadow-card p-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Topic</label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger><SelectValue placeholder="Select topic..." /></SelectTrigger>
              <SelectContent>{topics.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
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
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Company</label>
            <Select value={company} onValueChange={setCompany}>
              <SelectTrigger><SelectValue placeholder="Select company..." /></SelectTrigger>
              <SelectContent>{companies.map(c => <SelectItem key={c} value={c}><Building2 className="w-3 h-3 inline mr-1" />{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={handleGenerate} disabled={!topic || !difficulty || !company} className="gap-2">
            <Target className="w-4 h-4" /> Generate Interview Question
          </Button>
        </div>
      </div>

      {generated && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="rounded-xl border bg-card shadow-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-foreground">{company} — {topic}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  difficulty === "Easy" ? "bg-success/10 text-success" :
                  difficulty === "Medium" ? "bg-warning/10 text-warning" :
                  "bg-destructive/10 text-destructive"
                }`}>{difficulty}</span>
              </div>
            </div>
            <pre className="whitespace-pre-wrap font-body text-sm text-foreground leading-relaxed">{currentQ.question}</pre>
            <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/20">
              <p className="text-xs text-accent font-medium">🎯 Follow-up: {currentQ.followUp}</p>
            </div>
          </div>

          <div className="rounded-xl border bg-card shadow-card p-6">
            <label className="text-sm font-medium text-foreground mb-2 block">Your Answer</label>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Explain your approach and write your solution..."
              className="font-mono text-sm min-h-[180px] bg-muted/30"
            />
            <div className="flex justify-end mt-4">
              <Button onClick={() => setShowFeedback(true)} disabled={!answer.trim()} className="gap-2">
                <MessageSquare className="w-4 h-4" /> Get AI Feedback
              </Button>
            </div>
          </div>

          {showFeedback && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-card shadow-card p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Interview Feedback</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                  <p className="text-sm font-medium text-success mb-2 flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Strengths</p>
                  <ul className="space-y-1">{mockFeedback.strengths.map((s, i) => <li key={i} className="text-sm text-foreground">• {s}</li>)}</ul>
                </div>
                <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                  <p className="text-sm font-medium text-warning mb-2 flex items-center gap-1.5"><XCircle className="w-4 h-4" /> Areas to Improve</p>
                  <ul className="space-y-1">{mockFeedback.improvements.map((s, i) => <li key={i} className="text-sm text-foreground">• {s}</li>)}</ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Overall Rating</span>
                  <span className="text-lg font-display font-bold text-primary">{mockFeedback.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground">{mockFeedback.verdict}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
