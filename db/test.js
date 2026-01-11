// src/db/test.js
const pool = require("./index");

(async () => {
  const res = await pool.query("SELECT NOW()");
  console.log(res.rows[0]);
  process.exit(0);
})();
