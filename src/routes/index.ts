import { Router } from 'express';
import signupController from '../controllers/signupController';
import db from '../db/query';
import joinController from '../controllers/joinController';
import authController from '../controllers/authController';
import messageController from '../controllers/messageController';

const router = Router();

/**
 * ------------------ GET ROUTES ------------------------
 */

router.get('/', async (req, res) => {
  // console.log(await db.getUsers());
  console.log(await db.getMessages());
  res.render('index', {});
});

router.get('/sign-up', (req, res) => res.render('sign-up', {}));

router.get('/create', (req, res) => res.render('message', {}));

router.get('/join', (req, res) => res.render('join', {}));

router.get('/log-in', (req, res) => res.render('login', {}));

router.get('/log-out', authController.logout);

/**
 * ------------------ POST ROUTES ------------------------
 */

//TODO Create middleware to check if authenticated for access to certain routes

router.post('/sign-up', signupController.createUser);

router.post('/create', messageController.createMessage);

router.post('/join', joinController.addMembership);

router.post('/log-in', authController.login);

export default router;
