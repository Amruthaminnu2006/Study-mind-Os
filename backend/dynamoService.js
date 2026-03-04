const users = {};
const sessions = {};
const planners = {};
const badges = {};

/* =================================================
   UPDATE USER XP
================================================= */

async function updateUserXP(userId, xpEarned) {

  if (!users[userId]) {
    users[userId] = {
      userId,
      xp: 0,
      streak: 1
    };
  }

  users[userId].xp += xpEarned;

  return users[userId];
}

/* =================================================
   GET USER
================================================= */

async function getUser(userId) {

  if (!users[userId]) {
    users[userId] = {
      userId,
      xp: 0,
      streak: 1
    };
  }

  return users[userId];
}

/* =================================================
   SAVE STUDY SESSION
================================================= */

async function saveStudySession(userId, duration, xpEarned) {

  if (!sessions[userId]) {
    sessions[userId] = [];
  }

  const session = {
    id: Date.now(),
    duration,
    xpEarned,
    date: new Date().toISOString()
  };

  sessions[userId].push(session);

  return session;
}

/* =================================================
   GET STUDY SESSIONS
================================================= */

async function getStudySessions(userId) {

  return sessions[userId] || [];
}

/* =================================================
   SAVE PLANNER
================================================= */

async function savePlanner(userId, planner) {

  planners[userId] = planner;

  return planner;
}

/* =================================================
   GET PLANNER
================================================= */

async function getPlanner(userId) {

  return planners[userId] || null;
}

/* =================================================
   BADGE ENGINE
================================================= */

async function checkAndAwardBadges(user) {

  const userId = user.userId;

  if (!badges[userId]) {
    badges[userId] = [];
  }

  const newBadges = [];

  if (user.totalSessions >= 1 && !badges[userId].includes("XP Starter")) {
    badges[userId].push("XP Starter");
    newBadges.push("XP Starter");
  }

  if (user.xp >= 200 && !badges[userId].includes("Beginner")) {
    badges[userId].push("Beginner");
    newBadges.push("Beginner");
  }

  if (user.xp >= 500 && !badges[userId].includes("Intermediate")) {
    badges[userId].push("Intermediate");
    newBadges.push("Intermediate");
  }

  return newBadges;
}

/* =================================================
   GET USER BADGES
================================================= */

async function getUserBadges(userId) {

  return badges[userId] || [];
}

/* =================================================
   LEADERBOARD
================================================= */

async function getLeaderboard() {

  const leaderboard = Object.values(users)
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 10);

  return leaderboard;
}

/* =================================================
   EXPORTS
================================================= */

module.exports = {
  updateUserXP,
  getUser,
  saveStudySession,
  getStudySessions,
  savePlanner,
  getPlanner,
  checkAndAwardBadges,
  getUserBadges,
  getLeaderboard
};