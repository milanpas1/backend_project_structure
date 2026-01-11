const pool = require("../db");

async function createUser({ name, email }) {
  const query = `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING id, name, email, created_at
  `;

  const values = [name, email];

  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getAllUsers() {
  const result = await pool.query(
    "SELECT id, name, email, created_at FROM users ORDER BY id"
  );
  return result.rows;
}

module.exports = {
  createUser,
  getAllUsers,
};
