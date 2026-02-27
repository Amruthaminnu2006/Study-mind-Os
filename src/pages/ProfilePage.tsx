import { motion } from "framer-motion";
import { User, Mail, BookOpen, Target, Calendar, Trophy } from "lucide-react";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("studyos_user") || '{"name":"Alex","email":"alex@gmail.com"}');

  const profileStats = [
    { label: "Topics Mastered", value: "24", icon: BookOpen },
    { label: "Problems Solved", value: "156", icon: Target },
    { label: "Days Active", value: "45", icon: Calendar },
    { label: "Achievements", value: "12", icon: Trophy },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">Your learning profile and stats</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-card shadow-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">{user.name}</h2>
            <p className="text-muted-foreground flex items-center gap-1.5"><Mail className="w-4 h-4" /> {user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {profileStats.map((s, i) => (
            <div key={i} className="p-4 rounded-lg bg-muted/30 border text-center">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
