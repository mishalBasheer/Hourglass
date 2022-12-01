import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import twilio from 'twilio';
import User from '../../models/userDetailsModel.js';
import Address from '../../models/addressModel.js';
import Brand from '../../models/brandModel.js';
import Category from '../../models/categoryModel.js';
import Product from '../../models/productModel.js';
import Cart from '../../models/cartModel.js';
import Wishlist from '../../models/wishlistModel.js';
import Banner from '../../models/bannerModel.js';
import mongoos from '../../config/connection.js';
import Order from '../../models/orderModel.js';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE;
const client = twilio(accountSid, authToken);

// get user Home Page
const getUserHome = async (req, res) => {
  // show a success message when successfully logged in
  const msg = req.flash('success');
  // getting logged in user details to "user" variable
  // const user = req.session.user;

  //////////////////////////////////////////remv
  const user = {
    block: false,
    image: 'user_icon.jpg',
    _id: mongoose.Types.ObjectId('637bea89b921d410e4c72d99'),
    fname: 'Joules',
    lname: 'Kounde',
    mob: 9947227758,
    email: 'jkounde@gmail.com',
    password: '$2b$12$dzTVHZOQ425Hn87RRam3ruX.DaSYfC8SkcXEMQmtlGgXGz230fqsG',
    cartId: mongoose.Types.ObjectId('637bea89b921d410e4c72d95'),
    wishlistId: mongoose.Types.ObjectId('637bea89b921d410e4c72d97'),
    __v: 0,
  };
  req.session.user = user;
  req.session.userLogin = true;
  /////////////////////////////////////////

  const banner = await Banner.find();
  const navCat = await Category.find();
  console.log(banner);
  res.render('user/home', { msg, user, banner,navCat ,navCat});
};

// get SignIn Page
const getSignIn = async(req, res) => {
  const user = req.session.user;
  const navCat = await Category.find();
  const loginCheck = req.flash('errorLoginCheck');
  console.log(loginCheck);
  const msg = req.flash('error');
  // console.log(msg);
  res.render('user/login', { msg, user, loginCheck ,navCat});
};

// get SignUp Page
const getSignUp = async(req, res) => {
  const user = req.session.user;
  const navCat = await Category.find();
  const msg = req.flash('error');
  console.log(msg);
  res.render('user/signup', { msg, user ,navCat});
};

// get OTP Phone number Page (SignIn)
const getOtpPhonePage = async(req, res) => {
  const user = req.session.user;
  const navCat = await Category.find();
  res.render('user/otp_phone', { user ,navCat});
};

// get OTP number from user Page(SignIn)
const getOtpPage = async(req, res) => {
  const user = req.session.user;
  const navCat = await Category.find();
  res.render('user/otp_page', { user ,navCat});
};

// get OTP number from user Page (SignUp)
const getOtpSignUp = async(req, res) => {
  const user = req.session.user;
  const navCat = await Category.find();
  res.render('user/otp_page_signup', { user ,navCat});
};

// Shows all products that is listed in shop page
const getAllShop = async (req, res) => {
  try {
    const brand = await Brand.find();
    const category = await Category.find();
    const product = await Product.find();
    const cat = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: Category.collection.name,
          localField: '_id',
          foreignField: '_id',
          as: 'cat',
        },
      },
    ]);

    const count = product.length;
    const user = req.session.user;
    if (user) {
      const wishlistProducts = await Wishlist.findOne({ _id: user.wishlistId }).select({
        'products.product': 1,
        _id: 0,
      });
      const msg = req.flash('cartSuccess');
      res.render('user/shop', { user, product, brand, msg, wishlistProducts, count,navCat:category ,cat});
    } else {
      const msg = req.flash('cartSuccess');
      res.render('user/shop', { user, product, brand, msg, count,navCat:category ,cat});
    }
  } catch (err) {
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error from getting all products' });
  }
};

// Shows all products that is listed in shop page
const getShopCategory = async (req, res) => {
  try {
    const brand = await Brand.find();
    const category = await Category.find();
    const product = await Product.find({category:req.params.id});
    const cat = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: Category.collection.name,
          localField: '_id',
          foreignField: '_id',
          as: 'cat',
        },
      },
    ]);

    const count = product.length;
    const user = req.session.user;
    if (user) {
      const wishlistProducts = await Wishlist.findOne({ _id: user.wishlistId }).select({
        'products.product': 1,
        _id: 0,
      });
      const msg = req.flash('cartSuccess');
      res.render('user/shop', { user, product, brand, msg, wishlistProducts, count,navCat:category ,cat});
    } else {
      const msg = req.flash('cartSuccess');
      res.render('user/shop', { user, product, brand, msg, count,navCat:category ,cat});
    }
  } catch (err) {
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error from getting all products' });
  }
};

// Shows all products that is listed in shop page
const getShopBrand = async (req, res) => {
  try {
    const brand = await Brand.find();
    const category = await Category.find();
    const product = await Product.find({brand:req.params.id});
    const cat = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: Category.collection.name,
          localField: '_id',
          foreignField: '_id',
          as: 'cat',
        },
      },
    ]);

    const count = product.length;
    const user = req.session.user;
    if (user) {
      const wishlistProducts = await Wishlist.findOne({ _id: user.wishlistId }).select({
        'products.product': 1,
        _id: 0,
      });
      const msg = req.flash('cartSuccess');
      res.render('user/shop', { user, product, brand, msg, wishlistProducts, count,navCat:category ,cat});
    } else {
      const msg = req.flash('cartSuccess');
      res.render('user/shop', { user, product, brand, msg, count,navCat:category ,cat});
    }
  } catch (err) {
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error from getting all products' });
  }
};

// shows the details of specific product
const getProductDetails = async (req, res) => {
  try {

    const product = await Product.findOne({ _id: req.params.id }).populate('category').populate('brand');
    // console.log(product);
    const user = req.session.user;
    
  const navCat = await Category.find();
    // console.log(wishlisted)

    if (user) {
      const wishlistProducts = await Wishlist.findOne({ _id: user.wishlistId }).select({
        'products.product': 1,
        _id: 0,
      });
      const wishlisted = wishlistProducts.products.some((el) => el.product.equals(product._id));
      const msg = req.flash('cartSuccess');
      res.render('user/p_details', { user, product, msg, wishlisted ,navCat});
    } else {
      res.render('user/p_details', { user, product ,navCat});
    }
  } catch (err) {
    console.log(err);
    res.status(404).render('user/error-page', { error: err, errorMsg: 'error from getting product detail' });
  }
};

// get ContactUs Page
const getContactUs = async(req, res) => {
  const user = req.session.user;
  const navCat = await Category.find();
  res.render('user/contact', { user ,navCat});
};

// get ForgetPassword Page
const getForgetPassword =async (req, res) => {
  const user = req.session.user;
  const navCat = await Category.find();
  res.render('user/forgotpass', { user ,navCat});
};

// get Cart Page
const getCart = async (req, res) => {
  try {
    const user = req.session.user;
    const navCat = await Category.find();
    const cart = await Cart.findOne({ _id: user.cartId }).populate('products.product');
    res.render('user/cart', { user, cart: cart.products ,navCat});
  } catch (err) {
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error from getting cart products' ,navCat});
  }
};

const TotalCalc = async (id) => {
  const totalCalc = await Cart.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    { $unwind: { path: '$products' } },
    { $project: { 'products.subtotal': 1, _id: 0 } },
  ]);
  let sum = 0;
  totalCalc.forEach((el) => {
    sum += el.products.subtotal;
  });
  await Cart.updateOne({ _id: id }, { total: sum });
};

const subTotCalc = async (id, proId) => {
  const productcheck = await Cart.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    { $unwind: { path: '$products' } },
    { $match: { 'products.product': mongoose.Types.ObjectId(proId) } },
  ]);

  const quantity = Number(productcheck[0].products.quantity);
  const price = Number(productcheck[0].products.price);

  await Cart.findOneAndUpdate(
    { _id: id, 'products.product': proId },
    { $set: { 'products.$.subtotal': Number(quantity * price) } }
  );
};

// adding a Product to user's cart
const setCart = async (req, res, next) => {
  try {
    const user = req.session.user;
    const productId = req.body.productId;
    const product = await Product.findById(productId);

    const productcheck = await Cart.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(user.cartId) } },
      { $unwind: { path: '$products' } },
      { $match: { 'products.product': mongoose.Types.ObjectId(productId) } },
    ]);

    if (productcheck.length > 0) {
      await Cart.findOneAndUpdate(
        { _id: user.cartId, 'products.product': productId },
        { $inc: { 'products.$.quantity': 1 } },
        { upsert: true }
      );

      await subTotCalc(user.cartId, productId);
    } else {
      const newObj = { product: productId, quantity: 1, price: product.price, subtotal: product.price };
      await Cart.updateOne({ _id: user.cartId }, { $push: { products: newObj } }, { upsert: true });
      //  await Cart.findOneAndUpdate({_id:user.cartId},{"$set": {[`items.$[outer].${propertyName}`]: value}})
      //  await Cart.updateOne( { _id: user.cartId }, { '$set': { "products.$[].product": mongoose.Types.ObjectId(productId) , "products.$[].quantity": 1, } } )
    }

    await TotalCalc(user.cartId);

    res.json({
      access: true,
      msg: 'successfully added to cart',
    });
    // next();
  } catch (err) {
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error from putting a product to cart' ,navCat});
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const user = req.session.user;
    const productId = req.body.productId;

    const removeObj = { product: productId };
    await Cart.updateOne({ _id: user.cartId }, { $pull: { products: removeObj } });

    await TotalCalc(user.cartId);

    res.json({
      access: true,
      msg: 'successfully removed from cart',
    });
  } catch (err) {
    res.json({
      access: false,
      msg: 'error while removing product from cart',
    });
  }
};

const setToWish = async (req, res) => {
  try {
    const user = req.session.user;
    const productId = req.body.productId;
    const newObj = { product: productId };
    const productcheck = await Wishlist.findOne({ 'products.product': productId });

    if (!productcheck) {
      await Wishlist.updateOne({ _id: user.wishlistId }, { $push: { products: newObj } }, { upsert: true });
    }

    await Cart.updateOne({ _id: user.cartId }, { $pull: { products: newObj } });

    res.json({
      access: true,
      msg: 'successfully removed from cart',
    });
  } catch (err) {
    res.json({
      access: false,
      msg: 'error while removing product from cart',
    });
  }
};

// ajax increase Quantity of the cart product
const incQuantity = async (req, res) => {
  try {
    const user = req.session.user;
    const productId = mongoose.Types.ObjectId(req.body.productId);

    // const quantity =Number(req.body.quantity);
    // if(quantity>=15){
    //   res.status(200).json({
    //     stat:false,
    //     message:'cannot increase from 10',
    //   })
    // }else{
    await Cart.findOneAndUpdate(
      { _id: user.cartId, 'products.product': productId },
      { $inc: { 'products.$.quantity': 1 } }
    );

    await subTotCalc(user.cartId, productId);
    await TotalCalc(user.cartId);

    res.status(200).json({
      stat: true,
    });
    // }
  } catch (err) {
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error when increasing quantity from the cart' ,navCat});
  }
};

// ajax decrease Quantity of the cart product
const decQuantity = async (req, res) => {
  try {
    const user = req.session.user;
    const productId = mongoose.Types.ObjectId(req.body.productId);
    // const quantity =Number(req.body.quantity);
    // console.log(user,quantity);
    // console.log(typeof productId)
    // if(quantity<=1){
    //   res.json({
    //     stat:false,
    //     message:'cannot decrease to zero',
    //   })
    // }else{
    await Cart.findOneAndUpdate(
      { _id: user.cartId, 'products.product': productId },
      { $inc: { 'products.$.quantity': -1 } }
    );

    await subTotCalc(user.cartId, productId);
    await TotalCalc(user.cartId);

    res.json({
      stat: true,
    });
    // }
  } catch (err) {
    // res.json({
    //   status: 'error while decreasing from cart error',
    //   message: err,
    // });
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error from decreasing quantity from the cart' ,navCat});
  }
};

// get Wishlist Page
const getWish = async (req, res) => {
  try {
    const user = req.session.user;
  const navCat = await Category.find();
    // console.log(user);
    const wishlist = await Wishlist.findOne({ _id: user.wishlistId }).populate('products.product');
    // console.log(wishlist);
    res.render('user/wishlist', { user, wishlist: wishlist.products ,navCat});
  } catch (err) {
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error while getting wishlist products' ,navCat});
  }
};

// putting products to Wishlist
const setWish = async (req, res) => {
  try {
    const user = req.session.user;
    const productId = req.params.id;
    // const productcheck =await Wishlist.findOne({ 'products.product': productId  });
    // console.log('user:',user.wishlistId);
    // console.log('checked Product:',productcheck);
    // if(!productcheck){
    //  await Cart.findOneAndUpdate({_id:user.cartId,'products.product':productId},{$inc:{'products.$.quantity':1}});
    // }else{
    const newObj = { product: productId };
    await Wishlist.updateOne({ _id: user.wishlistId }, { $push: { products: newObj } }, { upsert: true });
    //  await Cart.findOneAndUpdate({_id:user.cartId},{"$set": {[`items.$[outer].${propertyName}`]: value}})
    //  await Cart.updateOne( { _id: user.cartId }, { '$set': { "products.$[].product": mongoose.Types.ObjectId(productId) , "products.$[].quantity": 1, } } )
    req.flash('cartSuccess', 'Successfully added product to wishlist');
    // }else{
    //   req.flash('cartSuccess','Product already in the wishlist')

    // }
    res.redirect('/shop');
  } catch (err) {
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error while putting products to wishlist' ,navCat});
  }
};

// removing products from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const user = req.session.user;
    const productId = req.params.id;
    const removeObj = { product: productId };
    await Wishlist.updateOne({ _id: user.wishlistId }, { $pull: { products: removeObj } });
    req.flash('cartSuccess', 'Successfully remove product from wishlist');
    res.redirect('/shop');
  } catch (err) {
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error while removing products from wishlist' ,navCat});
  }
};

// get Orders
const getOrders = async (req, res) => {
  const user = req.session.user;
  const navCat = await Category.find();
  const orders = await Order.find({ userId: user._id })
    .populate('address')
    .select({ 'products._id': 0, _id: 0, userId: 0, 'address.userId': 0, 'address._id': 0 });
  console.log(orders);
  res.render('user/order_confirmation', { user, orders ,navCat});
};

// OrderConfirmation
const OrderConfirmation = async (req, res) => {
  const user = req.session.user;
  console.log(req.body);
  const cartProducts = await Cart.findById(user.cartId)
    .populate('products.product')
    .select({ 'products.product': 1, 'products.subtotal': 1, 'products.quantity': 1, total: 1, _id: 0 });
  console.log(cartProducts);

  const newOrder = {
    userId: user._id,
    payment: req.body.payment,
    address: mongoose.Types.ObjectId(req.body.address),
    message: req.body.message,
    products: cartProducts.products,
    total: cartProducts.total,
  };
  await Order.create(newOrder);

  res.redirect('/order-confirmation');
};

// get OrderConfirmation Page
const getOrderConfirmation = async (req, res) => {
  const user = req.session.user;
  const navCat = await Category.find();
  const orders = await Order.find({ userId: user._id })
    .populate('address')
    .select({ 'products._id': 0, _id: 0, userId: 0, 'address.userId': 0, 'address._id': 0 });
  console.log(orders);
  res.render('user/order_confirmation', { user, orders ,navCat});
};

// get Tracking Page
const getTracking = async(req, res) => {
  const user = req.session.user;
  const navCat = await Category.find();
  res.render('user/tracking', { user ,navCat});
};

// get Profile Page
const getProfile = async (req, res) => {
  const user = req.session.user;
  const navCat = await Category.find();
  const address = await Address.find({ userId: user._id });
  res.render('user/profile', { user, address ,navCat});
};

// get Address profile Page
const getAddAddress =async (req, res) => {
  const alert = req.flash('alert');
  const user = req.session.user;
  const navCat = await Category.find();
  res.render('user/add_address', { user, alert ,navCat});
};

// adding Address to address collection
const addAddress = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      req.flash('alert', alert);
      return res.redirect('/profile/add-address');
    }
    let newAdd = req.body;
    const user = req.session.user;
    Object.assign(newAdd, { userId: user._id });
    await Address.create(newAdd);

    res.redirect('/profile');
  } catch (err) {
    // res.json({
    //   status: 'error while adding address',
    //   message: err,
    // });
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error while adding address to profile' ,navCat});
  }
};

// Helper - email checking when adding new user
const emailCheck = (userData) => {
  return new Promise(async (resolve, reject) => {
    let emailMatchFound;
    let user = await User.findOne({ email: userData.email });
    if (user) {
      emailMatchFound = true;
      resolve(emailMatchFound);
    } else {
      emailMatchFound = false;
      resolve(emailMatchFound);
    }
  });
};

// Verifiying new user,adding user details to DB, setting user data to session.user
const newUser = async (req, res) => {
  try {
    const newUser = req.session.newuser;
    emailCheck(newUser).then(async (matchFound) => {
      if (!matchFound) {
        const cart = await Cart.create({ created: true });
        const wishlist = await Wishlist.create({ created: true });
        // console.log('cart: ',cart)
        // console.log('wishlist: ',wishlist)
        Object.assign(newUser, { cartId: cart._id, wishlistId: wishlist._id });
        // console.log("new User:",newUser);
        User.create(newUser);
        // console.log(newUser);
        req.session.user = newUser;
        req.session.userEmail = newUser.email;
        res.redirect('/');
      } else {
        req.session.userLogin = false;
        req.flash('error', 'email already exists');
        res.redirect('/signup');
      }
    });
  } catch (err) {
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error while inserting new user' ,navCat});
  }
};

// checking user details by matching details with the DB (Authentication while signIn)
const userCheck = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }, function (err, user) {
      if (err) throw err;
      // test a matching password
      if (user != null) {
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            // res.status(200).json({
            //   status: 'success',
            //   data: {
            //     user,
            //   },
            // });
            console.log(user);
            req.session.user = user;
            req.session.userLogin = true;
            req.flash('success', 'Successfully Logged In');
            res.redirect('/');
          } else {
            // res.status(400).json({
            //   status: 'password not match error',
            // });
            req.session.userLogin = false;
            req.flash('error', 'Password not match');
            res.redirect('/signin');
          }
        });
      } else {
        // res.status(400).json({
        //   status: 'user not found error',
        // });
        req.flash('error', 'User email not found');
        res.redirect('/signin');
      }
    });
  } catch (err) {
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error while checking user from the database' ,navCat});
  }
};

// sending OTP to user
const sendOtp = (req, res, next) => {
  // next();
  req.session.userMobile = req.body.mob;
  let mobile = req.session.userMobile;
  client.verify.v2
    .services(serviceId)
    .verifications.create({ to: `+91${mobile}`, channel: 'sms' })
    .then((verification) => {
      console.log(verification.status);
      next();
    });
};

// verifiying users OTP
const verifyOtp = async (req, res, next) => {
  // req.flash('success', 'successfully signed in');
  // next();
  try {
    const verificationCode = req.body.otp;
    let mobile = req.session.userMobile;
    client.verify.v2
      .services(serviceId)
      .verificationChecks.create({ to: `+91${mobile}`, code: verificationCode })
      .then(async (verification_check) => {
        console.log(verification_check.status);
        if (verification_check.status === 'approved') {
          req.flash('success', 'successfully signed in');
          await User.findOne({ mob: mobile }, function (err, user) {
            if (err) throw err;
            req.session.user = user;
          });
          req.session.userLogin = true;
          next();
        } else {
          req.flash('error', 'wrong otp given try again!!');
          res.redirect('/signup');
        }
      });
  } catch (err) {
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error while verifying otp!!' ,navCat});
  }
};

// get Checkout Page
const getCheckout = async (req, res) => {
  const user = req.session.user;
  const navCat = await Category.find();
  const cartProducts = await Cart.findById(user.cartId).populate('products.product');
  const address = await Address.find({ userId: user._id });
  res.render('user/checkout', { user, total: cartProducts.total, products: cartProducts.products, address ,navCat});
};

// redirecting to OTP sign Up page
const redirectToOtp = (req, res) => {
  // Object.assign(req.body,{image:req.file.filname})
  req.session.newuser = req.body;
  res.redirect('/signup/otp-signup');
};

// redirecting to OTP sign in page
const redirectToOtpSignin = (req, res) => {
  // Object.assign(req.body,{image:req.file.filname})
  req.session.newuser = req.body;
  res.redirect('/signin/otp-signin');
};

// check whether the user Exists or not( sign In)
const checkExisting = async (req, res, next) => {
  try {
    const user = await User.find({ mob: req.body.mob });
    console.log('user: ', user);
    if (user.length > 0) {
      next();
    } else {
      // req.session.errorMsg="User need to signup first to login to account"
      req.flash('error', 'new mobile, user need to signup first to login to account');
      res.redirect('/signin');
    }
  } catch (err) {
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error while checking "existing" user' ,navCat});
  }
};

// user details cannot be the same when sign up
const checkNotExisting = async (req, res, next) => {
  try {
    const user = await User.find({ mob: req.body.mob });
    console.log('user: ', user);
    if (!(user.length > 0)) {
      next();
    } else {
      // req.session.errorMsg="User need to signup first to login to account"
      req.flash('error', 'existing mobile user can login to account using login panel');
      res.redirect('/signup');
    }
  } catch (err) {
    console.log(err);
    res.render('user/error-page', { error: err, errorMsg: 'error while checking "not an existing" user' ,navCat});
  }
};

// removing session of the user
const logoutUser = (req, res) => {
  req.session.user = null;
  req.session.userLogin = false;
  res.redirect('/');
};

export {
  getUserHome,
  getSignIn,
  getSignUp,
  newUser,
  userCheck,
  getOtpPage,
  sendOtp,
  getOtpPhonePage,
  verifyOtp,
  getAllShop,
  getProductDetails,
  getContactUs,
  getForgetPassword,
  getTracking,
  getCart,
  redirectToOtp,
  getOtpSignUp,
  redirectToOtpSignin,
  checkExisting,
  checkNotExisting,
  getCheckout,
  getAddAddress,
  addAddress,
  getWish,
  setCart,
  removeFromWishlist,
  setWish,
  decQuantity,
  logoutUser,
  incQuantity,
  removeFromCart,
  getProfile,
  setToWish,
  getOrderConfirmation,
  OrderConfirmation,
  getOrders,
  getShopCategory,
  getShopBrand,
};
