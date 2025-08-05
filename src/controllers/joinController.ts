import { NextFunction, Request, Response } from 'express';
import { body, validationResult, matchedData } from 'express-validator';
import db from '../db/query';

const validatePasscode = [
  body('join').trim().notEmpty().withMessage('Passcode is required'),
];

const addMembership = [
  ...validatePasscode,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }

    try {
      const passcode = 'secret';
      const { join: input } = matchedData(req);
      if (input === passcode) {
        await db.updateMembership(res.locals.currentUser.id);
        return res.redirect('/');
      }

      res.redirect('/join');
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
];

export default { addMembership };
