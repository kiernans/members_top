import { Router } from 'express';
import signupController from '../controllers/signupController';
import joinController from '../controllers/joinController';
import authController from '../controllers/authController';
import messageController from '../controllers/messageController';
import indexController from '../controllers/indexController';

const router = Router();

/**
 * ------------------ GET ROUTES ------------------------
 */
router.get('/', indexController.displayMessages);

router.get('/sign-up', (req, res) => res.render('sign-up', {}));

router.get('/create', (req, res) => res.render('message', {}));

router.get('/join', (req, res) => res.render('join', {}));

router.get('/log-in', (req, res) => res.render('login', {}));

router.get('/log-out', authController.logout);

/**
 * ------------------ POST ROUTES ------------------------
 */

router.post('/sign-up', signupController.createUser);

router.post('/create', messageController.createMessage);

router.post('/join', authController.checkLogin, joinController.addMembership);

router.post('/log-in', authController.login);

router.post(
  '/:id/delete',
  authController.checkLogin,
  authController.checkAdmin,
  messageController.deleteMessage,
);

export default router;
