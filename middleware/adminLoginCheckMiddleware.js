const adminLoginCheck = (req, res, next) => {
  if (req.session.adminLogIn) {
    next();
  } else {
    res.redirect('/admin');
  }
};
export default adminLoginCheck;
