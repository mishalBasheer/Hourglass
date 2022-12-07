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
  redirectToOtp,
  redirectToOtpSignin,
  checkExisting,
  checkNotExisting,
  getCheckout,
  getTracking,
  getProfile,
  getWish,
  setCart,
  // removeFromWishlist,
  // setWish,
  decQuantity,
  incQuantity,
  getAddAddress,
  logoutUser,
  addAddress,
  removeFromCart,
  setToWish,
  checkoutConfirm,
  getOrders,
  newUser,
  getPayment,
  getShopCategory,
  setCOD,
  getOrderData,
  getShopBrand,
  getAddress,
  getOrderSuccess,
  razorOrderGenerate,
  updateWishlist,
  checkCoupon,
} from '../controllers/user/userController.js';
import { userLoginCheck, checkBlockedUser } from '../middleware/userLoginCheckMiddleware.js';
import { axiosUserLoginCheck, axiosCheckBlockedUser } from '../middleware/axiosUserLoginCheck.js';
import { addressValidator } from '../middleware/expressValidation.js';

const router = express.Router();

router.route('/').get(getUserHome);
router.route('/logout').get(logoutUser);
router.route('/signup').get(getSignUp).post(checkNotExisting, sendOtp, redirectToOtp);
router.route('/signup/otp-signup').get(getOtpSignUp).post(verifyOtp, newUser);
router.route('/signin').get(getSignIn).post(userCheck);
router.route('/signin/otp-phone').get(getOtpPhonePage).post(checkExisting, sendOtp, redirectToOtpSignin);
router.route('/signin/otp-signin').get(getOtpPage).post(verifyOtp, getUserHome);
router.route('/shop').get(getAllShop);
router.route('/shop/category/:id').get(getShopCategory);
router.route('/shop/brand/:id').get(getShopBrand);
router.route('/product-details/:id').get(getProductDetails);
router.route('/add-to-cart').post(axiosUserLoginCheck, axiosCheckBlockedUser, setCart);
router.route('/remove-from-cart').post(axiosUserLoginCheck, axiosCheckBlockedUser, removeFromCart);
router.route('/set-to-wish').post(axiosUserLoginCheck, axiosCheckBlockedUser, setToWish);
router.route('/contact').get(getContactUs);
router.route('/forgot-password').get(getForgetPassword);
router.route('/cart').get(userLoginCheck, checkBlockedUser, getCart);
router.route('/cart/dec-quantity').post(userLoginCheck, checkBlockedUser, decQuantity);
router.route('/cart/inc-quantity').post(userLoginCheck, checkBlockedUser, incQuantity);
router.route('/wishlist').get(userLoginCheck, checkBlockedUser, getWish);
// router.route('/add-to-wishlist/:id').get(userLoginCheck, checkBlockedUser, setWish);
// router.route('/remove-from-wishlist/:id').get(userLoginCheck, checkBlockedUser, removeFromWishlist);
router.route('/update-wishlist').post(axiosUserLoginCheck, axiosCheckBlockedUser, updateWishlist);

router
  .route('/checkout')
  .get(userLoginCheck, checkBlockedUser, getCheckout)
  .post(userLoginCheck, checkBlockedUser, checkoutConfirm);
router.route('/order-confirmation').get(userLoginCheck, checkBlockedUser, getPayment).post(setCOD);
router.route('/create/orderId').post(razorOrderGenerate);
router.route('/order-success').get(userLoginCheck, checkBlockedUser, getOrderSuccess);


// router.route('/order-confirmation').get(userLoginCheck, checkBlockedUser, getOrderConfirmation);
router.route('/orders').get(userLoginCheck, checkBlockedUser, getOrders).post(getOrderData);

router.route('/order-tracking').get(userLoginCheck, checkBlockedUser, getTracking);
router.route('/profile').get(userLoginCheck, checkBlockedUser, getProfile);
router.route('/address').get(userLoginCheck, checkBlockedUser, getAddress);

router
  .route('/profile/add-address')
  .get(userLoginCheck, checkBlockedUser, getAddAddress)
  .post(userLoginCheck, checkBlockedUser, addressValidator, addAddress);
  router.route('/check-coupon').post(userLoginCheck, checkBlockedUser,checkCoupon)

export default router;
