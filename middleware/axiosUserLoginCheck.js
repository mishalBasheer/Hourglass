import User from '../models/userDetailsModel.js';

const axiosUserLoginCheck = (req, res, next) => {
  // console.log('user login check:',req.session)
  if (req.session.userLogin) {
    next();
  } else {
    res.json({
        access:false,
    });
  }
};
const axiosCheckBlockedUser = async (req, res, next) => {
    const userId = req.session.user._id;
  const user = await User.findById(userId);
  // console.log('User bloked or not:',user)
  if (user.block) {
    res.json({
        access:false,
    });
  } else {
    next();
  }
};
export { axiosUserLoginCheck, axiosCheckBlockedUser };