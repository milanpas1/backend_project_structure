const bcrypt = require("bcrypt");
const tokenService = require("../services/token.service");
// Import your existing user service
const userService = require("../services/user.service"); // adjust path if different

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    console.log("Request body:", req.body); // Add this to debug

    // Add validation to check if password exists
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const user = await userService.createUser({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate both tokens
    const accessToken = tokenService.generateAccessToken(user.id);
    const refreshToken = tokenService.generateRefreshToken(user.id);

    // Store refresh token in database
    await tokenService.storeRefreshToken(user.id, refreshToken);

    res.json({
      accessToken,
      refreshToken,
      expiresIn: "15m",
    });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }

    const payload = await tokenService.verifyRefreshToken(refreshToken);
    const newAccessToken = tokenService.generateAccessToken(payload.userId);

    res.json({
      accessToken: newAccessToken,
      expiresIn: "15m",
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
}

async function logout(req, res, next) {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await tokenService.revokeRefreshToken(refreshToken);
    }

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  signup,
  login,
  refresh,
  logout,
};
