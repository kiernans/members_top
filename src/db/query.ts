import pool from './pool';

interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface Message {
  user_id: string;
  author: string;
  title: string;
  message: string;
}

async function getUsers() {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserByEmail(email: string) {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = ($1)',
      [email],
    );
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserById(id: string) {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = ($1)', [
      id,
    ]);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function addUser({ name, email, password, isAdmin = false }: User) {
  try {
    await pool.query(
      `
          INSERT INTO
          users (name, email, password, is_admin)
          VALUES
          (
          ($1),
          ($2),
          ($3),
          ($4))`,
      [name, email, password, isAdmin],
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateMembership(id: string) {
  try {
    await pool.query(
      `
      UPDATE users
      SET membership_status = true
      WHERE id = ($1)
      `,
      [id],
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteUser(id: string) {
  try {
    await pool.query(
      `
      DELETE FROM users
      WHERE id = ($1)
      `,
      [id],
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getMessages() {
  try {
    const { rows } = await pool.query('SELECT * FROM messages ORDER BY id');
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function addMessage({ user_id, author, title, message }: Message) {
  try {
    await pool.query(
      `
      INSERT INTO
      messages (user_id, author, title, message)
      VALUES (($1), ($2), ($3), ($4))
      `,
      [user_id, author, title, message],
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteMessage(id: string) {
  try {
    await pool.query(
      `
      DELETE FROM messages
      WHERE id = ($1)
      `,
      [id],
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  getUsers,
  getUserByEmail,
  getUserById,
  addUser,
  updateMembership,
  deleteUser,
  getMessages,
  addMessage,
  deleteMessage,
};
