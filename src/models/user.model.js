const pool = require("../config/db");

const getUserByEmail = async (email) => {
  const query = `
    SELECT id, email, password, name
    FROM users
    WHERE email = $1
  `;

  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

const getUserById = async (id) => {
  const query = `
    SELECT id, email, name
    FROM users
    WHERE id = $1
  `;

  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  getUserByEmail,
  getUserById,
};
