require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { generateAIResponse } = require("./bedrockService");

const {
  updateUserXP,
  getUser,
  saveStudySession,
  getStudySessions,
  savePlanner,
  getPlanner,
  getLeaderboard
} = require("./dynamoService");

const app = express();

app.use(cors());
app.use(express.json());

/* ========================================
   ROOT
======================================== */
app.get("/", (req, res) => {
  res.send("StudyOS Backend Running 🚀");
});


/* ========================================
   DASHBOARD API
======================================== */
app.get("/api/dashboard", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId required"
      });
    }

    const user = await getUser(userId);
    const sessions = await getStudySessions(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const xp = user.xp || 0;
    const level = Math.floor(xp / 100) + 1;

    const xpInLevel = xp % 100;
    const xpToNextLevel = 100 - xpInLevel;
    const progressPercent = xpInLevel;

    res.json({
      success: true,
      dashboard: {
        userId,
        xp,
        level,
        streak: user.streak || 1,
        totalSessions: sessions.length,
        xpToNextLevel,
        progressPercent
      }
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ success: false });
  }
});


/* ========================================
   COMPLETE STUDY SESSION
======================================== */
app.post("/api/session/complete", async (req, res) => {
  try {

    const { userId, xpEarned, duration } = req.body;

    if (!userId || !xpEarned || !duration) {
      return res.status(400).json({
        success: false,
        message: "userId, xpEarned, duration required"
      });
    }

    const updatedUser = await updateUserXP(userId, xpEarned);

    const session = await saveStudySession(
      userId,
      duration,
      xpEarned
    );

    res.json({
      success: true,
      user: updatedUser,
      session
    });

  } catch (error) {
    console.error("Session error:", error);
    res.status(500).json({ success: false });
  }
});


/* ========================================
   GET STUDY SESSIONS
======================================== */
app.get("/api/sessions", async (req, res) => {
  try {

    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId required"
      });
    }

    const sessions = await getStudySessions(userId);

    res.json({
      success: true,
      sessions
    });

  } catch (error) {
    console.error("Sessions error:", error);
    res.status(500).json({ success: false });
  }
});


/* ========================================
   GENERATE STUDY PLANNER (AI)
======================================== */
app.post("/api/planner/generate", async (req, res) => {
  try {

    const { userId, topic } = req.body;

    if (!userId || !topic) {
      return res.status(400).json({
        success: false,
        message: "userId and topic required"
      });
    }

    const prompt = `
Create a structured 7 day study plan for ${topic}.
Break it into daily tasks with explanations.
Make it beginner friendly.
`;

    const aiPlanner = await generateAIResponse(prompt);

    const savedPlanner = await savePlanner(
      userId,
      aiPlanner
    );

    res.json({
      success: true,
      planner: savedPlanner
    });

  } catch (error) {
    console.error("Planner error:", error);
    res.status(500).json({ success: false });
  }
});


/* ========================================
   GET SAVED PLANNER
======================================== */
app.get("/api/planner", async (req, res) => {
  try {

    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId required"
      });
    }

    const planner = await getPlanner(userId);

    res.json({
      success: true,
      planner
    });

  } catch (error) {
    console.error("Get planner error:", error);
    res.status(500).json({ success: false });
  }
});


/* ========================================
   AI ASSISTANT
======================================== */
app.post("/api/assistant/ask", async (req, res) => {
  try {

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question required"
      });
    }

    const answer = await generateAIResponse(question);

    res.json({
      success: true,
      answer
    });

  } catch (error) {
    console.error("AI assistant error:", error);
    res.status(500).json({ success: false });
  }
});


/* ========================================
   LEADERBOARD
======================================== */
app.get("/api/leaderboard", async (req, res) => {
  try {

    const leaderboard = await getLeaderboard();

    res.json({
      success: true,
      leaderboard
    });

  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({ success: false });
  }
});


/* ========================================
   START SERVER
======================================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});