import express from 'express';
import { 
  getUserHome, 
  getSignIn, 
  getSignUp,
  userCheck, 
  getOtpPage,
  sendOtp,
  getOtpPhonePage,
  verifyOtp,
  newUser } from '../controllers/user/userController.js';

const router = express.Router();

router.route('/').get(getUserHome);
router.route('/signin').get(getSignIn).post(userCheck);
router.route('/signup').get(getSignUp).post(newUser);
router.route('/signin/otp-phone').get(getOtpPhonePage).post(sendOtp);
router.route('/signin/otp-signin').get(getOtpPage).post(verifyOtp);
// router.route('')

export default router;
