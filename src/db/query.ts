import pool from './pool';

interface User {
  name: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

interface Message {
  user_id: number;
  title: string;
  text: string;
}

async function getMessages() {
  const { rows } = await pool.query('SELECT * FROM messages ORDER BY id');
  return rows;
}

async function getUsers() {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
}

async function addUser({ name, username, password, isAdmin = false }: User) {
  await pool.query(
    `
        INSERT INTO
        users (name, username, password, isAdmin)
        VALUES
        (
        ($1),
        ($2),
        ($3),
        ($4))`,
    [name, username, password, isAdmin],
  );
}

async function addMessage({ user_id, title, text }: Message) {
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
}

export default {
  getMessages,
  getUsers,
  addUser,
  addMessage,
};
