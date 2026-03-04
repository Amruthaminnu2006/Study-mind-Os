import { useState } from "react";
import { Send, Bot, User } from "lucide-react";

export default function InterviewPage() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question
    };

    setMessages(prev => [...prev, userMessage]);

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/assistant/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            question: question
          })
        }
      );

      const data = await res.json();

      const aiMessage = {
        role: "ai",
        text: data.answer || "AI could not answer."
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (err) {

      console.error("AI error:", err);

    }

    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="max-w-4xl space-y-6">

      {/* HEADER */}

      <div>

        <h1 className="text-2xl font-bold">
          AI Interview Coach
        </h1>

        <p className="text-muted-foreground">
          Ask coding interview questions and get AI explanations
        </p>

      </div>

      {/* CHAT BOX */}

      <div className="border rounded-xl p-4 h-[400px] overflow-y-auto bg-card space-y-4">

        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Try asking: "Explain dynamic programming"
          </p>
        )}

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >

            {msg.role === "ai" && (
              <Bot className="text-purple-500 w-5 h-5 mt-1" />
            )}

            <div
              className={`px-4 py-2 rounded-lg max-w-[70%] ${
                msg.role === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-muted"
              }`}
            >
              {msg.text}
            </div>

            {msg.role === "user" && (
              <User className="text-blue-500 w-5 h-5 mt-1" />
            )}

          </div>

        ))}

        {loading && (
          <p className="text-sm text-muted-foreground">
            AI thinking...
          </p>
        )}

      </div>

      {/* INPUT */}

      <div className="flex gap-3">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask an interview question..."
          className="border rounded-lg p-2 w-full"
        />

        <button
          onClick={askAI}
          className="bg-purple-600 text-white px-4 rounded-lg flex items-center gap-2"
        >
          <Send size={16} />
          Ask
        </button>

      </div>

    </div>
  );
}