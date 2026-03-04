import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  /* ============================= */
  /* HANDLE LOGIN */
  /* ============================= */

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    // For now we simulate login (no backend auth yet)
    const user = {
      userId: email, // Using email as unique ID
      name: email.split("@")[0],
      email,
    };

    // Save user info
    localStorage.setItem("userId", user.userId);
    localStorage.setItem("studyos_user", JSON.stringify(user));

    // Go to dashboard
    navigate("/dashboard");
  };

  /* ============================= */
  /* GOOGLE LOGIN (Mock) */
  /* ============================= */

  const handleGoogleLogin = () => {
    const user = {
      userId: "alex@gmail.com",
      name: "Alex",
      email: "alex@gmail.com",
    };

    localStorage.setItem("userId", user.userId);
    localStorage.setItem("studyos_user", JSON.stringify(user));

    navigate("/dashboard");
  };

  /* ============================= */
  /* UI */
  /* ============================= */

  return (
    <div className="min-h-screen bg-background flex">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md"
        >
          <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-8">
            <Brain className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            Welcome back to StudyOS
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Your AI-powered learning journey continues here.
          </p>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              StudyOS
            </span>
          </Link>

          <h2 className="font-display text-2xl font-bold text-foreground mb-1">
            Log in
          </h2>
          <p className="text-muted-foreground mb-6">
            Enter your credentials to continue
          </p>

          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full mb-4 gap-2"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          {/* Email Login */}
          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>

        </motion.div>
      </div>
    </div>
  );
}