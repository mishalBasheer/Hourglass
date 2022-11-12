import express from 'express';
import { 
  getUserHome, 
  getSignIn, 
  getSignUp,
  userCheck, 
  newUser } from '../controllers/user/userController.js';

const router = express.Router();

router.route('/').get(getUserHome);
router.route('/signin').get(getSignIn).post(userCheck);
router.route('/signup').get(getSignUp).post(newUser);
// router.route('')

export default router;
