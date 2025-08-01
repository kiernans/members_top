import pool from './pool';

interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface Message {
  user_id: number;
  title: string;
  text: string;
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

async function getUsers() {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
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

async function addMessage({ user_id, title, text }: Message) {
  try {
    await pool.query(
      `
          INSERT INTO
          users (title, text)
          VALUES
          (
          ($1),
          ($2),
          ($3))`,
      [user_id, title, text],
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  getMessages,
  getUsers,
  addUser,
  addMessage,
};
