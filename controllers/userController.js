const getUserHome = (req, res) => {
  res.render('user/home');
};

const getSignIn = (req, res) => {
  res.render('user/login');
};

const getSignUp = (req, res) => {
    res.render('user/signup');
};
const newUser = (req, res) => {

};

export { getUserHome, getSignIn, getSignUp,newUser };
