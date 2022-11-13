import User from '../../models/userDetailsModel.js';

const getUserHome = (req, res) => {
  res.render('user/home');
};

const getSignIn = (req, res) => {
  res.render('user/login');
};

const getSignUp = (req, res) => {
  res.render('user/signup');
};

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
      User.create(req.body)
        req.session.userEmail = req.body.email;
        req.session.userLogin = true;
        res.redirect('/');
      }else {
      res.render('user/signup');
    }
  });
}

const userCheck = async (req, res) => {
try{
  await User.findOne({ email: req.body.email }, function (err, user) {
    if (err) throw err;
    // test a matching password
    if(user!=null){
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
    }else{
      res.status(400).json({
        status: 'error',
        // message:err,
      });
    }



  });
}catch(err){
  console.log(err);
}

};

export { getUserHome, getSignIn, getSignUp, newUser, userCheck };
