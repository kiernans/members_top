import { NextFunction, Request, Response } from 'express';
import db from '../db/query';

interface User extends Express.User {
  id: string;
  is_admin: boolean;
}

async function displayMessages(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = req.user;
  try {
    const messages = await db.getMessages();
    let user_id = '';
    let is_admin = false;
    if (user) {
      user_id = (user as User).id;
      is_admin = (user as User).is_admin;
    }
    res.render('index', {
      messages: messages,
      user_id: user_id,
      is_admin: is_admin,
    });
  } catch (error) {
    next(error);
  }
}

export default { displayMessages };
