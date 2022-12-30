import User from '../models/userDetailsModel.js';

const userLoginCheck = (req, res, next) => {
  // console.log('user login check:',req.session)
  if (req.session.userLogin) {
    next();
  } else {
    res.redirect('/signin');
  }
};
const checkBlockedUser = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.block) {
    res.render('user/blocked_user');
  } else {
    next();
  }
};
export { userLoginCheck, checkBlockedUser };
