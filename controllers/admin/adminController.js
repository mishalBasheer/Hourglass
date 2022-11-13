import Admin from '../../models/adminModel.js';
import Product from '../../models/productModel.js'

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
const getAdminUsers = (req, res) => {
  res.render('admin/client');
};

const adminCheck = async (req, res) => {
  try{
    await Admin.findOne({ email: req.body.email }, function (err, user) {
      if (err) throw err;
      // test a matching password
      if(user!=null){
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            res.render('admin/dashboard');
          } else {
            res.status(400).json({
              status: 'admin Password not match',
              // message:err,
            });
          }
        });
      }else{
        res.status(400).json({
          status: 'admin email not match',
          // message:err,
        });
      }
    });
  }catch(err){
    console.log(err);
  }
  };

  const getAddProductPage = (req,res)=>{
    res.render('admin/add_product');
  }


  const uploadProduct=async (req,res)=>{
    try{
      // console.log("form body: ", req.body);
      const product = await Product.create(req.body);
      // console.log("product details: ",product);
      // res.status(200).json({
      //   data:req.body,
      // })
      res.redirect('/admin/products/add-product');
    }catch(err){
      console.log(err);
      res.status(400).json({
        status:"failed to upload"
      })
    }

}


export { 
  getAdminLogin,
  getAdminDashboard,
  getAdminOrders,
  getAdminProducts,
  getAdminUsers,
  getAddProductPage,
  uploadProduct,
  adminCheck};
