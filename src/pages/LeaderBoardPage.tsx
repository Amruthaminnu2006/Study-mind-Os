import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown } from "lucide-react";

interface LeaderboardUser {
  userId: string;
  xp: number;
}

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================= */
  /* FETCH LEADERBOARD */
  /* ============================= */

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/leaderboard");
        const data = await res.json();

        if (data.success) {
          setLeaders(data.leaderboard);
        } else {
          setError("Failed to load leaderboard");
        }
      } catch (err) {
        console.error("Leaderboard error:", err);
        setError("Backend connection failed");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  /* ============================= */
  /* STATES */
  /* ============================= */

  if (loading)
    return <div className="p-6 text-lg">Loading leaderboard...</div>;

  if (error)
    return <div className="p-6 text-red-500 font-semibold">{error}</div>;

  /* ============================= */
  /* UI */
  /* ============================= */

  return (
    <div className="space-y-6 max-w-4xl p-6">

      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground">
          Compete and climb the ranks 🚀
        </p>
      </div>

      <div className="rounded-xl border bg-card shadow-card p-6 space-y-4">

        {leaders.length === 0 && (
          <p className="text-muted-foreground">
            No users yet. Start studying!
          </p>
        )}

        {leaders.map((user, index) => {
          const level = Math.floor(user.xp / 100) + 1;

          return (
            <motion.div
              key={user.userId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                index === 0
                  ? "bg-yellow-50 border-yellow-300"
                  : index === 1
                  ? "bg-gray-50 border-gray-300"
                  : index === 2
                  ? "bg-orange-50 border-orange-300"
                  : "bg-muted/30"
              }`}
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">

                {/* Rank */}
                <div className="text-xl font-bold w-8">
                  {index + 1}
                </div>

                {/* Medal Icons */}
                {index === 0 && <Crown className="w-5 h-5 text-yellow-500" />}
                {index === 1 && <Medal className="w-5 h-5 text-gray-500" />}
                {index === 2 && <Medal className="w-5 h-5 text-orange-500" />}

                {/* Username */}
                <div>
                  <p className="font-semibold">
                    {user.userId}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Level {level}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="text-right">
                <p className="text-lg font-bold text-primary">
                  {user.xp} XP
                </p>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}