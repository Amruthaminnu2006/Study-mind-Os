import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, Sparkles, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const topics = ["Arrays", "Linked Lists", "Stacks & Queues", "Trees", "Binary Search Trees", "Graphs", "Recursion", "Dynamic Programming", "Sorting Algorithms", "Hashing"];

const mockExplanations: Record<string, { english: string; hinglish: string; example: string }> = {
  "Arrays": {
    english: "An array is a collection of elements stored at contiguous memory locations. Think of it as a row of lockers — each locker has a number (index) and stores one item. You can instantly access any element if you know its index (O(1) time). Arrays are fixed-size in most languages, meaning you define the size when you create them.\n\nKey operations:\n• Access: O(1) — Direct index lookup\n• Search: O(n) — May need to check every element\n• Insert/Delete: O(n) — Shifting elements required",
    hinglish: "Array ek aisi jagah hai jahan saare elements ek line mein stored hote hain, bilkul train ke compartments ki tarah. Har compartment ka ek number hota hai (index), aur usme ek cheez rakh sakte ho. Agar tumhe pata hai kaunsa compartment chahiye, toh seedha jaa sakte ho — yeh bahut fast hai!\n\nKey operations:\n• Access: O(1) — Seedha index se nikal lo\n• Search: O(n) — Har element check karna padh sakta hai\n• Insert/Delete: O(n) — Baaki elements shift karne padte hain",
    example: "Real-life example: Imagine a parking lot with numbered spots (0, 1, 2...). If someone says 'your car is in spot 5', you go directly there — no searching needed! But if you want to insert a new car in spot 3, all cars from spot 3 onwards need to shift one spot right."
  },
  "Recursion": {
    english: "Recursion is when a function calls itself to solve a smaller version of the same problem. Every recursive function needs a base case (when to stop) and a recursive case (how to break the problem down).\n\nThink of it as Russian dolls — you keep opening a smaller doll until you reach the smallest one (base case). Then you work your way back up.\n\nKey concepts:\n• Base case: The simplest version that can be solved directly\n• Recursive case: Break problem into smaller subproblems\n• Call stack: Each recursive call adds to the stack",
    hinglish: "Recursion matlab ek function apne aap ko baar baar call karta hai, lekin har baar problem chhoti ho jaati hai. Jaise ki tum kisi se pucho 'yeh kya hai?' aur woh bole 'pehle yeh chhota wala samjho' — yahi recursion hai!\n\nBase case zaroori hai — warna infinite loop ho jayega. Jaise Russian dolls — andar andar kholte jao jab tak sabse chhoti na mil jaye.\n\nKey concepts:\n• Base case: Sabse simple version jo seedha solve ho\n• Recursive case: Problem ko chhota karo\n• Call stack: Har call stack mein add hoti hai",
    example: "Real-life example: Counting people in a queue. You ask the person in front 'how many people are ahead of you?' They ask the next person, who asks the next... until the first person says '0'. Then each person adds 1 and passes the answer back."
  },
  "Dynamic Programming": {
    english: "Dynamic Programming (DP) is an optimization technique that solves complex problems by breaking them into overlapping subproblems and storing their solutions (memoization). Instead of recalculating the same thing multiple times, you save the result and reuse it.\n\nTwo approaches:\n• Top-Down (Memoization): Start from the main problem, recursively solve subproblems, cache results\n• Bottom-Up (Tabulation): Start from smallest subproblems, build up to the solution\n\nDP works when a problem has:\n1. Optimal substructure — optimal solution uses optimal solutions of subproblems\n2. Overlapping subproblems — same subproblems solved multiple times",
    hinglish: "DP matlab smart recursion! Normal recursion mein same cheez baar baar calculate hoti hai. DP mein hum result save kar lete hain taaki dobara calculate na karna pade.\n\nDo tarike hain:\n• Top-Down (Memoization): Bade problem se shuru karo, chhote solve karo, result yaad rakho\n• Bottom-Up (Tabulation): Chhote se shuru karo, table bharte jao\n\nDP tab kaam karta hai jab:\n1. Problem ko chhote problems mein tod sako\n2. Wohi chhote problems baar baar aayein",
    example: "Real-life example: Calculating Fibonacci numbers. To find fib(5), you need fib(4) and fib(3). fib(4) needs fib(3) and fib(2). Notice fib(3) is needed twice! DP saves fib(3)'s result the first time and reuses it."
  },
};

export default function LearnPage() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState<"english" | "hinglish" | null>(null);

  const explanation = topic && mockExplanations[topic] ? mockExplanations[topic] : null;
  const defaultExplanation = {
    english: `${topic} is a fundamental concept in computer science and data structures. This topic covers the core principles, common operations, and their time complexities.\n\nKey areas to focus on:\n• Understanding the data structure\n• Common operations and their complexities\n• When to use this structure\n• Common interview patterns`,
    hinglish: `${topic} computer science ka ek important concept hai. Isme hum basic principles, common operations, aur unki time complexities samjhenge.\n\nImportant areas:\n• Data structure ko samjho\n• Common operations aur unki complexity\n• Kab use karna hai\n• Interview mein kaise aata hai`,
    example: `Real-life example: Think about how this concept relates to everyday organizing and problem-solving. Understanding the real-world parallel helps you remember the abstract concept better.`
  };

  const content = explanation || (topic ? defaultExplanation : null);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Learn</h1>
        <p className="text-muted-foreground mt-1">Select a topic and get AI-powered explanations</p>
      </div>

      <div className="rounded-xl border bg-card shadow-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground mb-2 block">Select Topic</label>
            <Select value={topic} onValueChange={(v) => { setTopic(v); setLanguage(null); }}>
              <SelectTrigger><SelectValue placeholder="Choose a topic..." /></SelectTrigger>
              <SelectContent>
                {topics.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {topic && (
            <div className="flex gap-2 sm:self-end">
              <Button onClick={() => setLanguage("english")} variant={language === "english" ? "default" : "outline"} className="gap-2">
                <BookOpen className="w-4 h-4" /> English
              </Button>
              <Button onClick={() => setLanguage("hinglish")} variant={language === "hinglish" ? "default" : "outline"} className="gap-2">
                <Sparkles className="w-4 h-4" /> Hinglish
              </Button>
            </div>
          )}
        </div>
      </div>

      {topic && language && content && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="rounded-xl border bg-card shadow-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-foreground">{topic}</h2>
                <p className="text-xs text-muted-foreground">AI Explanation • {language === "english" ? "English" : "Hinglish"}</p>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-body text-sm text-foreground leading-relaxed bg-transparent border-0 p-0">
                {content[language]}
              </pre>
            </div>
          </div>

          <div className="rounded-xl border bg-card shadow-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-display font-semibold text-foreground">Real-Life Example</h3>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{content.example}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
