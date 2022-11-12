const getAdminLogin = (req, res) => {
  res.render('admin/login');
};
const getAdminDashboard = (req, res) => {
  res.render('admin/dashboard');
};
const getAdminOrders = (req, res) => {
  res.render('admin/orders');
};
const getAdminProducts = (req, res) => {
  res.render('admin/product_management');
};
const addProduct = (req, res) => {
  res.render('admin/add_product');
};
const getAdminUsers = (req, res) => {
  res.render('admin/client');
};

export { 
  getAdminLogin,
  getAdminDashboard,
  getAdminOrders,
  getAdminProducts,
  getAdminUsers};
