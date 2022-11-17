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
  getAllShop,
  getProductDetails,
  getContactUs,
  getForgetPassword,
  getCart,
  getOrderConfirmation,
  getCheckout,
  getTracking,
  newUser } from '../controllers/user/userController.js';

const router = express.Router();

router.route('/').get(getUserHome);
router.route('/signup').get(getSignUp).post(newUser);
router.route('/signin').get(getSignIn).post(userCheck);
router.route('/signin/otp-phone').get(getOtpPhonePage).post(sendOtp);
router.route('/signin/otp-signin').get(getOtpPage).post(verifyOtp);
router.route('/shop').get(getAllShop)
router.route('/product-details').get(getProductDetails)
router.route('/contact').get(getContactUs)
router.route('/forgot-password').get(getForgetPassword)
router.route('/cart').get(getCart)
router.route('/checkout').get(getCheckout)
router.route('/order').get(getOrderConfirmation)
router.route('/order-tracking').get(getTracking)
// router.route('/forgot-password').get(getForgetPass)

export default router;
