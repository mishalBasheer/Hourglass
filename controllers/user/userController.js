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

const newUser = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await User.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'error',
      message: err,
    });
  }
};

const userCheck = async (req, res) => {

    const user = await User.findOne({ mob: req.body.mob });

    if(user){
      res.status(200).json({
        status:'success',
        data:{
          user
        }
      });
    }else{
      // console.log(err.message);
      res.status(400).json({
        status:'error',
        // message:err,
      })
    }
  
};

export { getUserHome, getSignIn, getSignUp, newUser, userCheck };
