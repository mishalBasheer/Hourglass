import mongoose from 'mongoose';
import Admin from '../../models/adminModel.js';
import Product from '../../models/productModel.js';
import User from '../../models/userDetailsModel.js';
import Category from '../../models/categoryModel.js';
import Brand from '../../models/brandModel.js';
import moment from 'moment';

const getAdminLogin = (req, res) => {
  if (req.session.adminLogIn) {
    res.redirect('/admin/dashboard');
  } else {
    res.render('admin/login');
  }
};

const getAdminDashboard = (req, res) => {
  req.session.pageIn = 'dashboard';
  res.render('admin/dashboard', {
    pageIn: req.session.pageIn,
    dashboardPage: ' text-gray-800 dark:text-gray-100',
    ordersPage: '',
    productsPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: '',
  });
};

const getAdminOrders = (req, res) => {
  req.session.pageIn = 'orders';
  res.render('admin/orders', {
    pageIn: req.session.pageIn,
    ordersPage: 'dark:text-gray-100',
    dashboardPage: '',
    productsPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: '',
  });
};

const getEditProductPage = async (req, res) => {
  const brand = await Brand.find({});
  const category = await Category.find({});
  let product = await Product.find({ _id: mongoose.Types.ObjectId(req.params.id) }).populate('brand').populate('category');
  let userId = req.params.id;
  req.session.pageIn = 'products';
  res.render('admin/edit_product', {
    brand,
    category,
    product: product[0],
    userId,
    pageIn: req.session.pageIn,
    productsPage: 'dark:text-gray-100',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: '',
  });
};

const getAdminProducts = async (req, res) => {
  try {
    // console.log(await getAllProduct());
    let products = await getAllProduct();
    console.log(products);
    req.session.pageIn = 'products';
    res.render('admin/product_management', {
      products,
      pageIn: req.session.pageIn,
      productsPage: 'dark:text-gray-100',
      dashboardPage: '',
      ordersPage: '',
      usersPage: '',
      categoryPage: '',
      brandPage: '',
    });
  } catch (err) {
    res.status(400).json({
      status: 'no data in database',
      message: err,
    });
  }
};

const getAddProductPage = async (req, res) => {
  const brand = await Brand.find({});
  const category = await Category.find({});
  // console.log(brand, category);
  req.session.pageIn = 'products';
  res.render('admin/add_product', {
    brand,
    category,
    pageIn: req.session.pageIn,
    productsPage: 'dark:text-gray-100',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: '',
  });
};

const editProduct = async (req, res) => {
  console.log(req.files)
  if (Object.keys(req.files).length==0) {
    // console.log(req.body)
    await Product.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true,
      new: true,
      runValidators: true,
    });
    res.redirect('/admin/products');
  }else if(req.files.images == undefined && req.files.thumbnail.length !== 0){
  const thumbnail = req.files.thumbnail[0].filename;
    Object.assign(req.body, { thumbnail });
    await Product.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true,
      new: true,
      runValidators: true,
    });
    res.redirect('/admin/products');

  }else if(req.files.thumbnail == undefined && req.files.images.length !== 0){
    const img=[];
    req.files.forEach((el) => {
      img.push(el.filename);
    });
    Object.assign(req.body, { images: img });
    await Product.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true,
      new: true,
      runValidators: true,
    });
    res.redirect('/admin/products');
  
  
  } else {
    const img = [];
    const thumbnail = req.files.thumbnail[0].filename;
    req.files.forEach((el) => {
      img.push(el.filename);
    });
    Object.assign(req.body, { images: img,thumbnail});
    // const {title,brand,category,price,images,description}=req.body;
    // console.log(req.body)
    await Product.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true,
      new: true,
      runValidators: true,
    });
    res.redirect('/admin/products');
  }
};

const adminCheck = async (req, res) => {
  try {
    await Admin.findOne({ email: req.body.email }, function (err, user) {
      if (err) throw err;
      // test a matching password
      if (user != null) {
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            // console.log('admin')
            req.session.adminLogIn = true;
            // console.log('SESSION CHECK',req.session)
            res.redirect('/admin/dashboard');
          } else {
            res.status(400).json({
              status: 'admin Password not match',
              message: err,
            });
          }
        });
      } else {
        res.status(400).json({
          status: 'admin email not match',
          // message:err,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const uploadProduct = async (req, res) => {
  try {
    // console.log("form body: ", req.body);
    // console.log(req.files);
    const img = [];
    const thumbnail = req.files.thumbnail[0].filename;
    
    req.files.images.forEach((el) => {
      img.push(el.filename);
    });

    Object.assign(req.body, { images: img, thumbnail });
    const product = await Product.create(req.body);

    console.log("product details: ",product);
    // res.status(200).json({
    //   data:req.body,
    // })
    res.redirect('/admin/products/add-product');
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'failed to upload',
    });
  }
};

const getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    let products = await Product.find().populate('brand').populate('category').exec();
    // if(products!=null){
    resolve(products);
    // }else{
    //   reject({status:"failed",message:"no products found"})
    // }
  });
};

const getAdminUsers = async (req, res) => {
  try {
    let users = await getAllClients();
    req.session.pageIn = 'users';
    res.render('admin/client', {
      users,
      pageIn: req.session.pageIn,
      usersPage: 'dark:text-gray-100',
      dashboardPage: '',
      ordersPage: '',
      productsPage: '',
      categoryPage: '',
      brandPage: '',
    });
  } catch (err) {
    res.status(400).json({
      status: 'no data in database',
      message: err,
    });
  }
};
const blockUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndUpdate(userId, { block: true });
    res.redirect('/admin/clients');
  } catch (err) {
    res.status(400).json({
      status: 'blocking error',
      message: err,
    });
  }
};
const unblockUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndUpdate(userId, { block: false });
    res.redirect('/admin/clients');
  } catch (err) {
    res.status(400).json({
      status: 'unblocking error',
      message: err,
    });
  }
};
const getAllClients = () => {
  return new Promise(async (resolve, reject) => {
    let users = await User.find();
    if (users != null) {
      resolve(users);
    } else {
      reject({ status: 'failed', message: 'no users found' });
    }
  });
};

const deleteProduct = async (req, res) => {
  await Product.deleteOne({ _id: req.params.id });
  res.redirect('/admin/products');
};

const getCategory = async (req, res) => {
  let category = await Category.find({});
  req.session.pageIn = 'category';
  res.render('admin/category', {
    pageIn: req.session.pageIn,
    category,
    productsPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: 'dark:text-gray-100',
    brandPage: '',
  });
};

const getEditCategory = async (req, res) => {
  const catId = req.params.id;
  req.session.pageIn = 'category';
  const category = await Category.find({ _id: mongoose.Types.ObjectId(catId) });
  // console.log(category);
  res.render('admin/edit_category', {
    category,
    catId,
    pageIn: req.session.pageIn,
    productsPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: 'dark:text-gray-100',
    brandPage: '',
  });
};

const getAddCategory = (req, res) => {
  req.session.pageIn = 'category';
  res.render('admin/add_category', {
    pageIn: req.session.pageIn,
    productsPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: 'dark:text-gray-100',
    brandPage: '',
  });
};

const addCategory = async (req, res) => {
  try {
    // console.log(req.file)
    // console.log(req.body);

    const catInfo = req.body;
    const img = req.file.filename;
    // console.log(img)
    Object.assign(catInfo, { image: img });
    // console.log(catInfo);
    await Category.create(catInfo);
    res.redirect('/admin/category');
  } catch (err) {
    res.status(400).json({
      status: 'error while adding category',
      message: err,
    });
  }
};
const editCategory = async (req, res) => {
  try {
    if (req.file == undefined) {
      // console.log(req.body)
      await Category.findByIdAndUpdate(req.params.id, req.body, {
        upsert: true,
        new: true,
        runValidators: true,
      });
      res.redirect('/admin/category');
    } else {
      // console.log(req.file)
      const catInfo = req.body;
      const img = req.file.filename;
      Object.assign(catInfo, { image: img });
      await Category.findByIdAndUpdate(catInfo);
      res.redirect('/admin/category');
    }
  } catch (err) {
    res.status(400).json({
      status: 'error while editing category',
      message: err,
    });
  }
};

const getBrand = async (req, res) => {
  let brand = await Brand.find({});
  req.session.pageIn = 'brand';
  res.render('admin/brand', {
    pageIn: req.session.pageIn,
    brand,
    productsPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: 'dark:text-gray-100',
  });
};

const getEditBrand = async (req, res) => {
  const brandId = req.params.id;
  req.session.pageIn = 'brand';
  const brand = await Brand.find({ _id: mongoose.Types.ObjectId(brandId) });
  // console.log(brand);
  res.render('admin/edit_brand', {
    brand,
    brandId,
    pageIn: req.session.pageIn,
    productsPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: 'dark:text-gray-100',
  });
};

const getAddBrand = (req, res) => {
  req.session.pageIn = 'brand';
  res.render('admin/add_brand', {
    pageIn: req.session.pageIn,
    productsPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: 'dark:text-gray-100',
    brandPage: '',
  });
};

const addBrand = async (req, res) => {
  try {
    // console.log(req.file)
    // console.log(req.body);

    const brandInfo = req.body;
    const img = req.file.filename;
    // console.log(img)
    Object.assign(brandInfo, { image: img });
    // console.log(brandInfo);
    await Brand.create(brandInfo);
    res.redirect('/admin/brand');
  } catch (err) {
    res.status(400).json({
      status: 'error while adding brand',
      message: err,
    });
  }
};
const editBrand = async (req, res) => {
  try {
    if (req.file == undefined) {
      // console.log(req.body)
      await Brand.findByIdAndUpdate(req.params.id, req.body, {
        upsert: true,
        new: true,
        runValidators: true,
      });
      res.redirect('/admin/brand');
    } else {
      // console.log(req.file)
      const brandInfo = req.body;
      const img = req.file.filename;
      Object.assign(brandInfo, { image: img });
      await Brand.findByIdAndUpdate(brandInfo);
      res.redirect('/admin/brand');
    }
  } catch (err) {
    res.status(400).json({
      status: 'error while editing brand',
      message: err,
    });
  }
};

export {
  getAdminLogin,
  getAdminDashboard,
  getAdminOrders,
  getAdminProducts,
  getAdminUsers,
  getAddProductPage,
  uploadProduct,
  getEditProductPage,
  editProduct,
  blockUser,
  getCategory,
  getEditCategory,
  getAddCategory,
  addCategory,
  editCategory,
  getBrand,
  getEditBrand,
  getAddBrand,
  addBrand,
  editBrand,
  unblockUser,
  deleteProduct,
  adminCheck,
};
