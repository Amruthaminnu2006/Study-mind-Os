import { useState, useEffect } from "react";
import { Calendar, Sparkles } from "lucide-react";

export default function PlannerPage() {

  const [topic, setTopic] = useState("");
  const [planner, setPlanner] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const userId = "user123";

  /* =========================
     LOAD SAVED PLAN
  ========================= */

  useEffect(() => {

    const fetchPlanner = async () => {

      try {

        const res = await fetch(
          `http://localhost:5000/api/planner?userId=${userId}`
        );

        const data = await res.json();

        if (data.success && data.planner) {

          // If backend returns string plan
          if (typeof data.planner === "string") {

            const lines = data.planner.split("\n").filter(Boolean);

            const parsedPlan = lines.map((line: string, index: number) => ({
              day: index + 1,
              task: line
            }));

            setPlanner(parsedPlan);

          }

          // If backend returns structured plan
          else if (Array.isArray(data.planner)) {

            setPlanner(data.planner);

          }

        }

      } catch (err) {

        console.error("Planner fetch error", err);

      }

    };

    fetchPlanner();

  }, []);

  /* =========================
     GENERATE AI PLAN
  ========================= */

  const generatePlan = async () => {

    if (!topic) return;

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/planner/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId,
            topic
          })
        }
      );

      const data = await res.json();

      if (data.success && data.planner) {

        if (typeof data.planner === "string") {

          const lines = data.planner.split("\n").filter(Boolean);

          const parsedPlan = lines.map((line: string, index: number) => ({
            day: index + 1,
            task: line
          }));

          setPlanner(parsedPlan);

        }

        else if (Array.isArray(data.planner)) {

          setPlanner(data.planner);

        }

      }

    } catch (err) {

      console.error("Planner error", err);

    }

    setLoading(false);

  };

  return (
    <div className="space-y-6 max-w-4xl">

      {/* HEADER */}

      <div>

        <h1 className="text-2xl font-bold flex items-center gap-2">
          Smart Planner <Sparkles className="text-purple-500" />
        </h1>

        <p className="text-muted-foreground">
          Generate an AI-powered study schedule
        </p>

      </div>

      {/* INPUT + GENERATE BUTTON */}

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Enter topic (Example: React, Graphs)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border p-2 rounded-lg w-full"
        />

        <button
          onClick={generatePlan}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          {loading ? "Generating..." : "Generate"}
        </button>

      </div>

      {/* PLAN DISPLAY */}

      <div className="space-y-3">

        {planner.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No planner generated yet. Enter a topic and click Generate.
          </p>
        )}

        {planner.map((day, index) => (

          <div
            key={index}
            className="p-4 border rounded-lg flex items-center gap-3 bg-card"
          >

            <Calendar className="text-blue-500" />

            <div>

              <p className="font-semibold">
                Day {day.day}
              </p>

              <p className="text-sm text-muted-foreground">
                {day.task}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}