import { Router } from 'express';
import signupController from '../controllers/signupController';
import db from '../db/query';
import loginController from '../controllers/loginController';

const router = Router();

/**
 * ------------------ GET ROUTES ------------------------
 */

router.get('/', async (req, res) => {
  console.log(await db.getUsers());
  // User needed for displaying either login or logout navbar
  res.render('index', { user: res.locals.currentUser });
});

router.get('/sign-up', (req, res) => res.render('sign-up', {}));

router.get('/join', (req, res) => res.render('join', {}));

router.get('/log-in', (req, res) => res.render('login', {}));

router.get('/log-out', (req, res, next) =>
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect('/');
  }),
);

/**
 * ------------------ POST ROUTES ------------------------
 */

router.post('/sign-up', signupController.createUser);

router.post('/log-in', loginController.login);

export default router;
