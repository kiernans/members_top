import { Router } from 'express';
import signupController from '../controllers/signupController';
import db from '../db/query';

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

router.get('/login', (req, res) => res.render('login', {}));

/**
 * ------------------ POST ROUTES ------------------------
 */

router.post('/sign-up', signupController.createUser);

export default router;
