import User from '../../models/userDetailsModel.js';
import Address from '../../models/addressModel.js'
import twilio from 'twilio';
import flash from 'connect-flash';


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE;
const client = twilio(accountSid, authToken);

const getUserHome = (req, res) => {
  // show a success message when successfully logged in 
  const msg=req.flash('success');
  // getting logged in user details to "user" variable 
  const user = req.session.user;
  console.log(user);

  res.render('user/home',{msg,user});
};

const getSignIn = (req, res) => {
  const user = req.session.user;
  const msg=req.flash('error');
  console.log(msg);
  res.render('user/login',{msg,user});
};

const getSignUp = (req, res) => {
  const user = req.session.user;
  const msg=req.flash('error');
  console.log(msg);
  res.render('user/signup',{msg,user});
};

const getOtpPhonePage = (req, res) => {
  const user = req.session.user;
  res.render('user/otp_phone',{user});
};

const getOtpPage = (req, res) => {
  const user = req.session.user;
  res.render('user/otp_page',{user});
};
const getOtpSignUp = (req, res) => {
  const user = req.session.user;
  res.render('user/otp_page_signup',{user});
};

const getAllShop =(req,res)=>{
  const user = req.session.user;
  res.render('user/shop',{user});
}
const getProductDetails =(req,res)=>{
  const user = req.session.user;
  res.render('user/p_details',{user});
}
const getContactUs =(req,res)=>{
  const user = req.session.user;
  res.render('user/contact',{user});
}
const getForgetPassword =(req,res)=>{
  const user = req.session.user;
  res.render('user/forgotpass',{user});
}
const getCart =(req,res)=>{
  const user = req.session.user;
  res.render('user/cart',{user});
}
const getOrderConfirmation =(req,res)=>{
  const user = req.session.user;
  res.render('user/order',{user});
}
const getTracking =(req,res)=>{
  const user = req.session.user;
  res.render('user/tracking',{user});
}

const getProfile = async (req,res)=>{
  const user = req.session.user;
  const address = await Address.find({userId:user._id});
  res.render('user/profile',{user,address});
}

const   getAddAddress =(req,res)=>{
  const user = req.session.user;
  res.render('user/add_address',{user});
}

const addAddress =async (req,res)=>{
  try{
    let newAdd = req.body;
    const user = req.session.user;
    Object.assign(newAdd,{userId:user._id})
    await Address.create(newAdd);
    res.redirect('/profile');
  }catch(err){
    res.json({
      status:'error while adding address',
      message:err,
    })
  }
    
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
  const newUser = req.session.newuser;
  emailCheck(newUser).then((matchFound) => {
    if (!matchFound) {
      // console.log("new User:",newUser);
      User.create(newUser);
      // console.log(newUser);
      req.session.user=newUser
      req.session.userEmail = newUser.email;
      req.session.userLogin = true;
      res.redirect('/');
    } else {
      req.flash('error','email already exists')
      res.redirect('/signup');
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
            // res.status(200).json({
            //   status: 'success',
            //   data: {
            //     user,
            //   },
            // });
            req.session.user=user;
            req.flash('success',"Successfully Logged In");
            res.redirect('/')
          } else {
            // res.status(400).json({
            //   status: 'password not match error',
            // });
            req.flash('error','Password not match')
            res.redirect('/signin');
          }
        });
      } else {
        // res.status(400).json({
        //   status: 'user not found error',
        // });
        req.flash('error','User email not found');
        res.redirect('/signin');
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

const verifyOtp =async (req, res, next) => {
  req.flash('success','successfully signed in')
  next();
  // const verificationCode = req.body.otp;
  // let mobile=req.session.userMobile;
  // client.verify.v2
  //   .services(serviceId)
  //   .verificationChecks.create({ to: `+91${mobile}`, code: verificationCode })
  //   .then((verification_check) => {
  //     console.log(verification_check.status);
  //     if(verification_check.status==="approved"){
  // req.flash('success','successfully signed in')
  // await User.findOne({mob:mobile},function(err,user){
  //   if(err)throw err;
  //   req.session.user=user;
  // })
  //       next();
  //     }else{
  //       res.redirect('/signup');
  //     }
  //   });
};

const getCheckout = (req, res)=>{
  const user = req.session.user;
  res.render('user/checkout',{user})
}

const redirectToOtp =(req, res)=>{
  // Object.assign(req.body,{image:req.file.filname})
  req.session.newuser=req.body;
  res.redirect('/signup/otp-signup')
}
const redirectToOtpSignin =(req, res)=>{
  // Object.assign(req.body,{image:req.file.filname})
  req.session.newuser=req.body;
  res.redirect('/signin/otp-signin')
}

const checkExisting=async(req,res,next)=>{
const user = await User.find({mob:req.body.mob})
console.log('user: ',user);
if(user.length>0){
  next()
}else{
  // req.session.errorMsg="User need to signup first to login to account"
  req.flash('error','new mobile, user need to signup first to login to account')
  res.redirect('/signin')
}
}

const checkNotExisting=async(req,res,next)=>{
const user = await User.find({mob:req.body.mob})
console.log('user: ',user);
if(!(user.length>0)){
  next();
}else{
  // req.session.errorMsg="User need to signup first to login to account"
  req.flash('error','existing mobile user can login to account using login panel');
  res.redirect('/signup');
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
  checkNotExisting,
  getCheckout,
  getAddAddress,
  addAddress,
  getProfile,
  getOrderConfirmation };
