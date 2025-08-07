import { NextFunction, Request, Response } from 'express';
import db from '../db/query';

interface User extends Express.User {
  id: string;
  membership_status: boolean;
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
    let isMember = false;
    let isAdmin = false;
    if (user) {
      isMember = (user as User).membership_status;
      isAdmin = (user as User).is_admin;
    }
    console.log(messages);
    res.render('index', {
      messages: messages,
      isMember: isMember,
      isAdmin: isAdmin,
    });
  } catch (error) {
    next(error);
  }
}

export default { displayMessages };
