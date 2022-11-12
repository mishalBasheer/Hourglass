import express from 'express';
import { 
  getUserHome, 
  getSignIn, 
  getSignUp, 
  newUser } from '../controllers/userController.js';

const router = express.Router();

router.route('/').get(getUserHome);
router.route('/signin').get(getSignIn);
router.route('/signup').get(getSignUp).post(newUser);
// router.route('')

export default router;
