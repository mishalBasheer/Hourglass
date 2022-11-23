import express from 'express';
import {
  getUserHome,
  getSignIn,
  getSignUp,
  userCheck,
  getOtpPage,
  sendOtp,
  getOtpPhonePage,
  getOtpSignUp,
  verifyOtp,
  getAllShop,
  getProductDetails,
  getContactUs,
  getForgetPassword,
  getCart,
  getOrderConfirmation,
  redirectToOtp,
  redirectToOtpSignin,
  checkExisting,
  checkNotExisting,
  getCheckout,
  getTracking,
  getProfile,
  getWish,
  setCart,
  removeFromWishlist,
  setWish,
  decQuantity,
  incQuantity,
  getAddAddress,
  logoutUser,
  addAddress,
  newUser,
} from '../controllers/user/userController.js';
import { userLoginCheck,checkBlockedUser, } from "../middleware/userLoginCheckMiddleware.js";

const router = express.Router();

router.route('/').get(getUserHome);
router.route('/logout').get(logoutUser);
router.route('/signup').get(getSignUp).post(checkNotExisting, sendOtp, redirectToOtp);
router.route('/signup/otp-signup').get(getOtpSignUp).post(verifyOtp, newUser);
router.route('/signin').get(getSignIn).post(userCheck);
router.route('/signin/otp-phone').get(getOtpPhonePage).post(checkExisting, sendOtp, redirectToOtpSignin);
router.route('/signin/otp-signin').get(getOtpPage).post(verifyOtp, getUserHome);
router.route('/shop').get(getAllShop);
router.route('/product-details/:id').get(getProductDetails);
router.route('/contact').get(getContactUs);
router.route('/forgot-password').get(getForgetPassword);
router.route('/cart').get(userLoginCheck,checkBlockedUser,getCart);
router.route('/cart/dec-quantity').post(userLoginCheck,checkBlockedUser,decQuantity);
router.route('/cart/inc-quantity').post(userLoginCheck,checkBlockedUser,incQuantity);
router.route('/add-to-cart/:id').get(userLoginCheck,checkBlockedUser,setCart);
router.route('/wishlist').get(userLoginCheck,checkBlockedUser,getWish);
router.route('/add-to-wishlist/:id').get(userLoginCheck,checkBlockedUser,setWish);
router.route('/remove-from-wishlist/:id').get(userLoginCheck,checkBlockedUser,removeFromWishlist);
router.route('/checkout').get(userLoginCheck,checkBlockedUser,getCheckout);
router.route('/order').get(userLoginCheck,checkBlockedUser,getOrderConfirmation);
router.route('/order-tracking').get(userLoginCheck,checkBlockedUser,getTracking);
router.route('/profile').get(userLoginCheck,checkBlockedUser,getProfile);
router.route('/profile/add-address').get(userLoginCheck,checkBlockedUser,getAddAddress).post(userLoginCheck,checkBlockedUser,addAddress);

export default router;
