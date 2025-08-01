import { NextFunction, Request, Response } from 'express';
import { body, validationResult, Meta, matchedData } from 'express-validator';
import bcrypt from 'bcryptjs';
import db from '../db/query';

// The Custom validator uses value and Meta objects as inputs
function passwordMatches(value: string, { req }: Meta) {
  return value === req.body.password;
}

const validateUser = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 1, max: 30 })
    .withMessage('Name length must be between 1 and 30 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be in email format')
    .isLength({ min: 1, max: 30 })
    .withMessage('Email length must be between 1 and 30 characters'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword(),
  body('confirmPassword')
    .trim()
    .notEmpty()
    .withMessage('Must confirm password')
    .isStrongPassword()
    .custom(passwordMatches)
    .withMessage('Passwords do not match'),
];

// Needed to spread validate user bc the router expects an array of middleware functions
// but without spreading, you're providing an array containing an array and a middleware function
// (each item in the validateUser array is a middleware function?)

const createUser = [
  ...validateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }

    try {
      const data = matchedData(req);
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const { name, email } = data;
      const newUser = { name, email, password: hashedPassword, isAdmin: false };

      // Admin checkbox selected
      if (req.body.isAdmin) {
        newUser.isAdmin = true;
      }
      await db.addUser(newUser);
    } catch (error) {
      console.error(error);
      next(error);
    }
    res.redirect('/');
  },
];

export default {
  createUser,
};
