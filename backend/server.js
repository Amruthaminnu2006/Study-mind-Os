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
  checkAndAwardBadges,
  getUserBadges,
  getLeaderboard
} = require("./dynamoService");

const app = express();
app.use(cors());
app.use(express.json());

/* =================================================
   ROOT
================================================= */
app.get("/", (req, res) => {
  res.send("StudyOS Backend Running 🚀");
});

/* =================================================
   AI ASSISTANT
================================================= */
app.post("/api/assistant/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question)
      return res.status(400).json({ error: "Question required" });

    const aiResponse = await generateAIResponse(question);

    res.json({
      success: true,
      answer: aiResponse
    });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ success: false });
  }
});

/* =================================================
   COMPLETE STUDY SESSION
================================================= */
app.post("/api/session/complete", async (req, res) => {
  try {
    const { userId, xpEarned, duration } = req.body;

    if (!userId || !xpEarned || !duration)
      return res.status(400).json({
        error: "userId, xpEarned and duration required"
      });

    // 1. Update XP + Smart Streak
    const updatedUser = await updateUserXP(userId, xpEarned);

    // 2. Save study session
    const session = await saveStudySession(userId, duration, xpEarned);

    // 3. Get total sessions
    const sessions = await getStudySessions(userId);

    // 4. Prepare user object for badge engine
    const userWithMeta = {
      ...updatedUser,
      totalSessions: sessions.length
    };

    // 5. Check & award badges
    const newBadges = await checkAndAwardBadges(userWithMeta);

    res.json({
      success: true,
      user: updatedUser,
      session,
      newBadges
    });

  } catch (error) {
    console.error("Session Error:", error);
    res.status(500).json({ success: false });
  }
});

/* =================================================
   DASHBOARD
================================================= */
app.get("/api/dashboard", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId)
      return res.status(400).json({ error: "userId required" });

    const user = await getUser(userId);
    const sessions = await getStudySessions(userId);
    const badges = await getUserBadges(userId);

    if (!user)
      return res.status(404).json({ error: "User not found" });

    const xp = user.xp || 0;
    const level = Math.floor(xp / 100) + 1;
    const xpInLevel = xp % 100;

    res.json({
      success: true,
      dashboard: {
        userId,
        xp,
        level,
        streak: user.streak || 1,
        totalSessions: sessions.length,
        xpToNextLevel: 100 - xpInLevel,
        progressPercent: xpInLevel,
        badges
      }
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ success: false });
  }
});

/* =================================================
   GET STUDY SESSIONS
================================================= */
app.get("/api/sessions", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId)
      return res.status(400).json({ error: "userId required" });

    const sessions = await getStudySessions(userId);

    res.json({
      success: true,
      sessions
    });

  } catch (error) {
    console.error("Get Sessions Error:", error);
    res.status(500).json({ success: false });
  }
});

/* =================================================
   GENERATE STUDY PLANNER
================================================= */
app.post("/api/planner/generate", async (req, res) => {
  try {
    const { userId, topic } = req.body;

    if (!userId || !topic)
      return res.status(400).json({
        error: "userId and topic required"
      });

    const prompt = `
Create a structured 7-day study plan for ${topic}.
Break into daily tasks with short explanations.
Keep it beginner friendly.
`;

    const aiPlanner = await generateAIResponse(prompt);
    const savedPlanner = await savePlanner(userId, aiPlanner);

    res.json({
      success: true,
      planner: savedPlanner
    });

  } catch (error) {
    console.error("Planner Error:", error);
    res.status(500).json({ success: false });
  }
});

/* =================================================
   GET SAVED PLANNER
================================================= */
app.get("/api/planner", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId)
      return res.status(400).json({ error: "userId required" });

    const planner = await getPlanner(userId);

    res.json({
      success: true,
      planner
    });

  } catch (error) {
    console.error("Get Planner Error:", error);
    res.status(500).json({ success: false });
  }
});

/* =================================================
   GET USER BADGES
================================================= */
app.get("/api/badges", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId)
      return res.status(400).json({ error: "userId required" });

    const badges = await getUserBadges(userId);

    res.json({
      success: true,
      badges
    });

  } catch (error) {
    console.error("Get Badges Error:", error);
    res.status(500).json({ success: false });
  }
});

/* =================================================
   LEADERBOARD
================================================= */
app.get("/api/leaderboard", async (req, res) => {
  try {
    const leaderboard = await getLeaderboard();

    res.json({
      success: true,
      leaderboard
    });

  } catch (error) {
    console.error("Leaderboard Error:", error);
    res.status(500).json({ success: false });
  }
});

/* =================================================
   START SERVER
================================================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});