const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { loginLimiter } = require("../milddlewares/rateLimit"); // your existing rate limiter

// POST /auth/signup
router.post("/signup", authController.signup);

// POST /auth/login
router.post("/login", loginLimiter, authController.login);

// POST /auth/refresh - Get new access token
router.post("/refresh", authController.refresh);

// POST /auth/logout - Revoke refresh token
router.post("/logout", authController.logout);

module.exports = router;
