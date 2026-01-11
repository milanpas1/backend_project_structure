const express = require("express");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const authenticate = require("./milddlewares/auth.middleware") 

const app = express();


app.use(express.json());

app.use("/auth", authRoutes);

app.get("/protected", authenticate, (req, res) => {
  res.json({ userId: req.userId });
});

app.use("/users", authenticate, userRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/me", authenticate, (req, res) => {
  res.json(req.user);
});

app.use((err, req, res, next) => {
  if (err.code === "23505") {
    return res.status(409).json({ message: "Email already exists" });
  }

  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
