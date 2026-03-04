import { useEffect, useState } from "react";
import { BookOpen, Target, Calendar, Trophy } from "lucide-react";
import { getUser } from "../lib/utilss/getUser.js";
export default function ProfilePage() {

  const user = getUser();

  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await fetch(
          `http://localhost:5000/api/dashboard?userId=${user.userId}`
        );

        const data = await res.json();

        if (data.success) {
          setXp(data.dashboard.xp);
          setLevel(data.dashboard.level);
          setStreak(data.dashboard.streak);
          setSessions(data.dashboard.totalSessions);
        }

      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }

    };

    fetchDashboard();

  }, []);

  return (

    <div className="space-y-6 max-w-5xl">

      {/* HEADER */}

      <div>

        <h1 className="text-2xl font-bold">
          Profile
        </h1>

        <p className="text-muted-foreground">
          Your learning profile and stats
        </p>

      </div>


      {/* USER CARD */}

      <div className="p-6 rounded-xl border bg-card">

        <h2 className="font-semibold text-lg">
          {user.name}
        </h2>

        <p className="text-muted-foreground">
          {user.userId}
        </p>

      </div>


      {/* STATS GRID */}

      <div className="grid md:grid-cols-2 gap-4">


        {/* TOTAL XP */}

        <div className="p-6 rounded-xl border bg-card flex items-center gap-4">

          <BookOpen className="text-purple-500" />

          <div>

            <p className="text-2xl font-bold">
              {xp}
            </p>

            <p className="text-sm text-muted-foreground">
              Total XP
            </p>

          </div>

        </div>


        {/* LEVEL */}

        <div className="p-6 rounded-xl border bg-card flex items-center gap-4">

          <Target className="text-blue-500" />

          <div>

            <p className="text-2xl font-bold">
              Level {level}
            </p>

            <p className="text-sm text-muted-foreground">
              Current Level
            </p>

          </div>

        </div>


        {/* STREAK */}

        <div className="p-6 rounded-xl border bg-card flex items-center gap-4">

          <Calendar className="text-green-500" />

          <div>

            <p className="text-2xl font-bold">
              {streak}
            </p>

            <p className="text-sm text-muted-foreground">
              Day Streak
            </p>

          </div>

        </div>


        {/* SESSIONS */}

        <div className="p-6 rounded-xl border bg-card flex items-center gap-4">

          <Trophy className="text-orange-500" />

          <div>

            <p className="text-2xl font-bold">
              {sessions}
            </p>

            <p className="text-sm text-muted-foreground">
              Sessions Completed
            </p>

          </div>

        </div>


      </div>

    </div>

  );

}