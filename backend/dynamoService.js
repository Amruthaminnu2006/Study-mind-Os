const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  UpdateCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand
} = require("@aws-sdk/lib-dynamodb");

const { v4: uuidv4 } = require("uuid");

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const docClient = DynamoDBDocumentClient.from(client);

/* ================= GET USER ================= */
async function getUser(userId) {
  const result = await docClient.send(
    new GetCommand({
      TableName: "Users",
      Key: { userId }
    })
  );
  return result.Item;
}

/* ================= SMART STREAK + XP ================= */
async function updateUserXP(userId, xpToAdd) {
  const user = await getUser(userId);

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  let newStreak = 1;

  if (user && user.lastStudyDate) {
    const lastDate = new Date(user.lastStudyDate);
    const diffDays = Math.floor(
      (today - lastDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) newStreak = user.streak || 1;
    else if (diffDays === 1) newStreak = (user.streak || 1) + 1;
    else newStreak = 1;
  }

  const result = await docClient.send(
    new UpdateCommand({
      TableName: "Users",
      Key: { userId },
      UpdateExpression: `
        SET xp = if_not_exists(xp, :zero) + :inc,
            streak = :streak,
            lastStudyDate = :today
      `,
      ExpressionAttributeValues: {
        ":inc": xpToAdd,
        ":zero": 0,
        ":streak": newStreak,
        ":today": todayStr
      },
      ReturnValues: "ALL_NEW"
    })
  );

  return result.Attributes;
}

/* ================= SAVE SESSION ================= */
async function saveStudySession(userId, duration, xpEarned) {
  const item = {
    userId,
    sessionId: uuidv4(),
    duration,
    xpEarned,
    createdAt: new Date().toISOString()
  };

  await docClient.send(
    new PutCommand({
      TableName: "StudySessions",
      Item: item
    })
  );

  return item;
}

/* ================= GET SESSIONS ================= */
async function getStudySessions(userId) {
  const result = await docClient.send(
    new QueryCommand({
      TableName: "StudySessions",
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: {
        ":uid": userId
      }
    })
  );

  return result.Items || [];
}

/* ================= BADGE ENGINE ================= */
async function checkAndAwardBadges(user) {
  const unlocked = [];

  const possibleBadges = [
    { id: "FIRST_SESSION", name: "Beginner", condition: user.totalSessions >= 1 },
    { id: "STREAK_3", name: "Consistent Learner", condition: user.streak >= 3 },
    { id: "STREAK_7", name: "Study Warrior", condition: user.streak >= 7 },
    { id: "XP_100", name: "XP Starter", condition: user.xp >= 100 },
    { id: "XP_500", name: "XP Master", condition: user.xp >= 500 }
  ];

  for (const badge of possibleBadges) {
    if (!badge.condition) continue;

    const existing = await docClient.send(
      new GetCommand({
        TableName: "UserBadges",
        Key: {
          userId: user.userId,
          badgeId: badge.id
        }
      })
    );

    if (!existing.Item) {
      await docClient.send(
        new PutCommand({
          TableName: "UserBadges",
          Item: {
            userId: user.userId,
            badgeId: badge.id,
            name: badge.name,
            earnedAt: new Date().toISOString()
          }
        })
      );

      unlocked.push(badge.name);
    }
  }

  return unlocked;
}

/* ================= GET BADGES ================= */
async function getUserBadges(userId) {
  const result = await docClient.send(
    new QueryCommand({
      TableName: "UserBadges",
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: {
        ":uid": userId
      }
    })
  );

  return result.Items || [];
}

/* ================= LEADERBOARD ================= */
async function getLeaderboard() {
  const result = await docClient.send(
    new ScanCommand({
      TableName: "Users"
    })
  );

  if (!result.Items) return [];

  return result.Items
    .sort((a, b) => (b.xp || 0) - (a.xp || 0))
    .map((user, index) => ({
      rank: index + 1,
      userId: user.userId,
      xp: user.xp || 0,
      streak: user.streak || 1
    }));
}

module.exports = {
  updateUserXP,
  getUser,
  saveStudySession,
  getStudySessions,
  checkAndAwardBadges,
  getUserBadges,
  getLeaderboard
};