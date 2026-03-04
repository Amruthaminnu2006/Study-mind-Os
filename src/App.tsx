import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Moon, Sun } from "lucide-react";

/* =========================
   PAGES
========================= */

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import DashboardLayout from "./components/DashboardLayout";

import DashboardHome from "./pages/DashboardHome";
import LearnPage from "./pages/LearnPage";
import PracticePage from "./pages/PracticePage";
import WeaknessPage from "./pages/WeaknessPage";
import PlannerPage from "./pages/PlannerPage";
import InterviewPage from "./pages/InterviewPage";
import ProfilePage from "./pages/ProfilePage";
import LeaderboardPage from "./pages/LeaderBoardPage";

import NotFound from "./pages/NotFound";

/* =========================
   QUERY CLIENT
========================= */

const queryClient = new QueryClient();

/* =========================
   LOAD SAVED THEME
========================= */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}

/* =========================
   APP
========================= */

export default function App() {

  const toggleTheme = () => {

    const root = document.documentElement;

    if (root.classList.contains("dark")) {

      root.classList.remove("dark");
      localStorage.setItem("theme", "light");

    } else {

      root.classList.add("dark");
      localStorage.setItem("theme", "dark");

    }

  };

  return (

    <QueryClientProvider client={queryClient}>

      <TooltipProvider>

        <Toaster />
        <Sonner />

        <BrowserRouter>

          {/* THEME BUTTON */}

          <button
            onClick={toggleTheme}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card border border-border shadow-lg hover:scale-110 transition"
          >

            {document.documentElement.classList.contains("dark") ? (

              <Sun className="w-5 h-5 text-yellow-400" />

            ) : (

              <Moon className="w-5 h-5 text-blue-500" />

            )}

          </button>

          {/* ROUTES */}

          <Routes>

            {/* PUBLIC */}

            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* DASHBOARD */}

            <Route path="/dashboard" element={<DashboardLayout />}>

              <Route index element={<DashboardHome />} />

              <Route path="learn" element={<LearnPage />} />

              <Route path="practice" element={<PracticePage />} />

              <Route path="weakness" element={<WeaknessPage />} />

              <Route path="planner" element={<PlannerPage />} />

              <Route path="interview" element={<InterviewPage />} />

              <Route path="leaderboard" element={<LeaderboardPage />} />

              <Route path="profile" element={<ProfilePage />} />

            </Route>

            {/* 404 */}

            <Route path="*" element={<NotFound />} />

          </Routes>

        </BrowserRouter>

      </TooltipProvider>

    </QueryClientProvider>

  );
}