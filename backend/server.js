import { useEffect, useState } from "react";
import { AlertTriangle, Brain } from "lucide-react";

export default function WeaknessPage() {

  const [weakTopics, setWeakTopics] = useState<string[]>([]);
  const userId = "user123";

  useEffect(() => {

    const fetchSessions = async () => {

      try {

        const res = await fetch(
          `http://localhost:5000/api/sessions?userId=${userId}`
        );

        const data = await res.json();

        if (data.success) {

          analyzeWeakness(data.sessions);

        }

      } catch (err) {
        console.error(err);
      }

    };

    fetchSessions();

  }, []);

  const analyzeWeakness = (sessions: any[]) => {

    const topicCount: any = {};

    sessions.forEach((s) => {

      const topic = s.topic || "Unknown";

      topicCount[topic] = (topicCount[topic] || 0) + 1;

    });

    const weak = Object.keys(topicCount).filter(
      topic => topicCount[topic] < 2
    );

    setWeakTopics(weak);

  };

  return (

    <div className="space-y-6 max-w-4xl">

      <div>

        <h1 className="text-2xl font-bold flex items-center gap-2">
          Weakness Analyzer
          <Brain className="text-purple-500" />
        </h1>

        <p className="text-muted-foreground">
          Topics you should practice more
        </p>

      </div>

      <div className="space-y-3">

        {weakTopics.map((topic, index) => (

          <div
            key={index}
            className="p-4 border rounded-lg flex items-center gap-3"
          >

            <AlertTriangle className="text-orange-500" />

            <div>

              <p className="font-semibold">
                {topic}
              </p>

              <p className="text-sm text-muted-foreground">
                Practice more problems on this topic
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}