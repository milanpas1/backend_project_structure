const express = require("express");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use((err, req, res, next) => {
  if (err.code === "23505") { // PostgreSQL unique violation
    return res.status(409).json({
      message: "Email already exists",
    });
  }

  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
