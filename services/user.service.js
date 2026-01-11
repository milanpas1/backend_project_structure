const pool = require("../db");
const bcrypt = require("bcrypt");

async function createUser({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at
  `;

  const values = [name, email, hashedPassword];
  const result = await pool.query(query, values);

  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query(
    "SELECT id, name, email, password FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
}


module.exports = {
  createUser,
  findUserByEmail,
};
