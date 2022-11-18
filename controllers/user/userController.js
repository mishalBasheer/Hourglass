import User from '../../models/userDetailsModel.js';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE;
const client = twilio(accountSid, authToken);

const getUserHome = (req, res) => {
  console.log(req.session);
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
const getOtpSignUp = (req, res) => {
  res.render('user/otp_page_signup');
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
  const newUser = req.session.newUser;
  emailCheck(newUser).then((matchFound) => {
    if (!matchFound) {
      // console.log("new User:",newUser);
      User.create(newUser);
      // console.log(newUser);
      req.session.userEmail = newUser.email;
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

const sendOtp = (req, res, next) => {
  next();
  // req.session.userMobile=req.body.mob;
  // let mobile=req.session.userMobile;
  // client.verify.v2
  //   .services(serviceId)
  //   .verifications.create({ to: `+91${mobile}`, channel: 'sms' })
  //   .then((verification) => {
  //     console.log(verification.status);
  //     next();
  //   });
};

const verifyOtp = (req, res, next) => {
  next();
  // const verificationCode = req.body.otp;
  // let mobile=req.session.userMobile;
  // client.verify.v2
  //   .services(serviceId)
  //   .verificationChecks.create({ to: `+91${mobile}`, code: verificationCode })
  //   .then((verification_check) => {
  //     console.log(verification_check.status);
  //     if(verification_check.status==="approved"){
  //       next();
  //     }else{
  //       res.redirect('/signup');
  //     }
  //   });
};

const getCheckout = (req, res)=>{
  res.render('user/checkout')
}

const redirectToOtp =(req, res)=>{
  // Object.assign(req.body,{image:req.file.filname})
  req.session.newUser=req.body;
  res.redirect('/signup/otp-signup')
}
const redirectToOtpSignin =(req, res)=>{
  // Object.assign(req.body,{image:req.file.filname})
  req.session.newUser=req.body;
  res.redirect('/signin/otp-signin')
}

const checkExisting=async(req,res,next)=>{
const user = await User.find({mob:req.body.mob})
if(user!==null){
  next()
}else{
  req.session.errorMsg="User need to signup first to login to account"
  res.redirect('/signin')
}
}

export { getUserHome, getSignIn, getSignUp, newUser, userCheck, getOtpPage, sendOtp, getOtpPhonePage, verifyOtp,getAllShop ,
  getProductDetails,
  getContactUs,
  getForgetPassword,
  getTracking,
  getCart,
  redirectToOtp,
  getOtpSignUp,
  redirectToOtpSignin,
  checkExisting,
  getCheckout,
  getOrderConfirmation };
