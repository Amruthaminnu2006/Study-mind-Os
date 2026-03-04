import { useEffect, useState } from "react";
import { Flame, Trophy, Star } from "lucide-react";
import { getUser } from "../lib/utilss/getUser.js";
import StudyHeatmap from "@/components/StudyHeatmap";

export default function DashboardHome() {

  const user = getUser();
  const userId = user?.userId;

  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await fetch(
          `http://localhost:5000/api/dashboard?userId=${userId}`
        );

        const data = await res.json();

        if (data.success) {
          setDashboard(data.dashboard);
        }

      } catch (err) {
        console.error("Dashboard error", err);
      }

    };

    fetchDashboard();

  }, [userId]);

  if (!dashboard) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (

    <div className="space-y-6 max-w-6xl">

      <h1 className="text-3xl font-bold">
        Welcome back {user?.name}
      </h1>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-5 border rounded-xl bg-card">

          <Flame className="text-orange-500 mb-2"/>

          <p className="text-sm text-muted-foreground">
            Streak
          </p>

          <h2 className="text-2xl font-bold">
            {dashboard.streak} days
          </h2>

        </div>

        <div className="p-5 border rounded-xl bg-card">

          <Trophy className="text-yellow-500 mb-2"/>

          <p className="text-sm text-muted-foreground">
            XP
          </p>

          <h2 className="text-2xl font-bold">
            {dashboard.xp}
          </h2>

        </div>

        <div className="p-5 border rounded-xl bg-card">

          <Star className="text-purple-500 mb-2"/>

          <p className="text-sm text-muted-foreground">
            Level
          </p>

          <h2 className="text-2xl font-bold">
            {dashboard.level}
          </h2>

        </div>

      </div>

      {/* XP PROGRESS */}

      <div className="p-5 border rounded-xl bg-card">

        <p className="text-sm text-muted-foreground mb-2">
          Progress to next level
        </p>

        <div className="w-full bg-gray-200 h-3 rounded-full">

          <div
            className="bg-purple-600 h-3 rounded-full"
            style={{
              width: `${dashboard.progressPercent}%`
            }}
          />

        </div>

        <p className="text-xs text-muted-foreground mt-2">

          {dashboard.xpToNextLevel} XP to next level

        </p>

      </div>

      {/* STUDY HEATMAP */}

      <StudyHeatmap />

    </div>
  );
}