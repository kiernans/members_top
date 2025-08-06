import { Request, Response } from 'express';
import { body, validationResult, matchedData } from 'express-validator';
import db from '../db/query';

interface User extends Express.User {
  id: string;
  email: string;
}

const validateMessage = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isAlphanumeric('en-US', { ignore: ' ' })
    .withMessage('Only alphanumeric characters allowed'),
  body('message').notEmpty().withMessage('Message is required').escape(),
];

const createMessage = [
  ...validateMessage,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user) {
      return res
        .status(400)
        .json({ message: 'Must be logged in to create message.' });
    }

    const { title, message } = matchedData(req);
    const user = req.user;
    const user_id = (user as User).id;
    const author = (user as User).email;

    await db.addMessage({ user_id, author, title, message });

    res.redirect('/');
  },
];

export default { createMessage };
