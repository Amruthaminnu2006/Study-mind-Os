import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Brain, LayoutDashboard, BookOpen, Code, BarChart3, Calendar, Target, User, LogOut, Flame, ChevronLeft, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Learn", path: "/dashboard/learn", icon: BookOpen },
  { title: "Practice", path: "/dashboard/practice", icon: Code },
  { title: "Weakness Analysis", path: "/dashboard/weakness", icon: BarChart3 },
  { title: "Smart Planner", path: "/dashboard/planner", icon: Calendar },
  { title: "Interview Prep", path: "/dashboard/interview", icon: Target },
  { title: "Profile", path: "/dashboard/profile", icon: User },
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const user = JSON.parse(localStorage.getItem("studyos_user") || '{"name":"Alex","email":"alex@gmail.com"}');

  const handleLogout = () => {
    localStorage.removeItem("studyos_user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-60"} bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 hidden md:flex`}>
        <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-sidebar-primary-foreground">StudyOS</span>
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className={`${collapsed ? "mx-auto" : "ml-auto"} text-sidebar-foreground hover:text-sidebar-primary-foreground transition-colors`}>
            {collapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent w-full transition-colors">
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b flex items-center justify-between px-6 bg-card">
          <div className="md:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome back,</span>
            <span className="font-display font-semibold text-foreground">{user.name}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-foreground">12 day streak</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Progress</span>
              <Progress value={68} className="w-24 h-2" />
              <span className="text-sm font-medium text-foreground">68%</span>
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="md:hidden border-b overflow-x-auto">
          <div className="flex px-4 py-2 gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
