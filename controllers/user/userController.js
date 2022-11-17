import User from '../../models/userDetailsModel.js';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE;
const client = twilio(accountSid, authToken);

const getUserHome = (req, res) => {
  res.render('user/home');
};

const getSignIn = (req, res) => {
  res.render('user/login');
};

const getSignUp = (req, res) => {
  res.render('user/signup');
};

const getOtpPhonePage = (req, res) => {
  res.render('user/otp_phone');
};

const getOtpPage = (req, res) => {
  res.render('user/otp_page');
};

const getAllShop =(req,res)=>{
  res.render('user/shop');
}
const getProductDetails =(req,res)=>{
  res.render('user/p_details');
}
const getContactUs =(req,res)=>{
  res.render('user/contact');
}
const getForgetPassword =(req,res)=>{
  res.render('user/forgotpass');
}
const getCart =(req,res)=>{
  res.render('user/cart');
}
const getOrderConfirmation =(req,res)=>{
  res.render('user/order');
}
const getTracking =(req,res)=>{
  res.render('user/tracking');
}

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

const newUser = async (req, res) => {
  emailCheck(req.body).then((matchFound) => {
    if (!matchFound) {
      console.log(req.body);
      User.create(req.body);
      req.session.userEmail = req.body.email;
      req.session.userLogin = true;
      res.redirect('/');
    } else {
      res.render('user/signup');
    }
  });
};

const userCheck = async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }, function (err, user) {
      if (err) throw err;
      // test a matching password
      if (user != null) {
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            res.status(200).json({
              status: 'success',
              data: {
                user,
              },
            });
          } else {
            res.status(400).json({
              status: 'error',
              // message:err,
            });
          }
        });
      } else {
        res.status(400).json({
          status: 'error',
          // message:err,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const sendOtp = (req, res) => {
  req.session.userMobile=req.body.mob;
  let mobile=req.session.userMobile;
  client.verify.v2
    .services(serviceId)
    .verifications.create({ to: `+91${mobile}`, channel: 'sms' })
    .then((verification) => {
      console.log(verification.status);
      res.redirect('/signin/otp-signin');
    });
};

const verifyOtp = (req, res) => {
  const verificationCode = req.body.otp;
  let mobile=req.session.userMobile;
  client.verify.v2
    .services(serviceId)
    .verificationChecks.create({ to: `+91${mobile}`, code: verificationCode })
    .then((verification_check) => {
      console.log(verification_check.status);
      if(verification_check.status==="approved"){
        res.redirect('/');
      }else{
        res.redirect('/signup');
      }
    });
};

const getCheckout = (req, res)=>{
  res.render('user/checkout')
}


export { getUserHome, getSignIn, getSignUp, newUser, userCheck, getOtpPage, sendOtp, getOtpPhonePage, verifyOtp,getAllShop ,
  getProductDetails,
  getContactUs,
  getForgetPassword,
  getTracking,
  getCart,
  getCheckout,
  getOrderConfirmation };
