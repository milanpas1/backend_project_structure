const jwt = require("jsonwebtoken");
const pool = require("../db");

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
}

function generateRefreshToken(userId) {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
}

async function storeRefreshToken(userId, token) {
  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token, expires_at)
     VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
    [userId, token]
  );
}

async function verifyRefreshToken(token) {
  const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  const result = await pool.query(
    `SELECT * FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()`,
    [token]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid refresh token");
  }

  return payload;
}

async function revokeRefreshToken(token) {
  await pool.query(`DELETE FROM refresh_tokens WHERE token = $1`, [token]);
}

async function revokeAllUserTokens(userId) {
  await pool.query(`DELETE FROM refresh_tokens WHERE user_id = $1`, [userId]);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  storeRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens,
};