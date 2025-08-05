import { Router } from 'express';
import signupController from '../controllers/signupController';
import db from '../db/query';
import loginController from '../controllers/loginController';
import logoutController from '../controllers/logoutController';
import joinController from '../controllers/joinController';

const router = Router();

/**
 * ------------------ GET ROUTES ------------------------
 */

router.get('/', async (req, res) => {
  console.log(await db.getUsers());
  res.render('index', {});
});

router.get('/sign-up', (req, res) => res.render('sign-up', {}));

router.get('/join', (req, res) => res.render('join', {}));

router.get('/log-in', (req, res) => res.render('login', {}));

router.get('/log-out', logoutController.logout);

/**
 * ------------------ POST ROUTES ------------------------
 */

//TODO Create middleware to check if authenticated for access to certain routes

router.post('/sign-up', signupController.createUser);

router.post('/join', joinController.addMembership);

router.post('/log-in', loginController.login);

export default router;
