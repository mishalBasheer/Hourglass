import mongoose from 'mongoose';
import Admin from '../../models/adminModel.js';
import Product from '../../models/productModel.js';
import User from '../../models/userDetailsModel.js';
import Category from '../../models/categoryModel.js';
import Brand from '../../models/brandModel.js';
import Coupon from '../../models/couponModel.js';
import Order from '../../models/orderModel.js';
import moment from 'moment';
import Banner from '../../models/bannerModel.js';

const getAdminLogin = (req, res) => {
  if (req.session.adminLogIn) {
    res.redirect('/admin/dashboard');
  } else {
    const msg = req.flash('error');
    res.render('admin/login', { msg });
  }
};

const getAdminDashboard = async (req, res) => {
  req.session.pageIn = 'dashboard';
  const orders = await Order.find({}).sort({ _id: -1 }).limit(10).populate('userId').populate('address');
  const userCount = await User.find({});
  const totalSales = await Order.aggregate([
    {
      $project: { month: { $month: '$createdAt' }, total: 1 },
    },
    {
      $match: { month: 12 },
    },
    {
      $group: { _id: '$month', totalSales: { $sum: '$total' }, count: { $sum: 1 } },
    },
  ]);
  const pendingOrders = await Order.aggregate([
    {
      $match: { orderstat: { $ne: 'DELIVERED' } },
    },
    {
      $group: { _id: '$__v', count: { $sum: 1 } },
    },
  ]);
  const categoriseOrderCount = await Order.aggregate([
    { $project: { orderstat: 1 } },
    { $group: { _id: '$orderstat', count: { $sum: 1 } } },
    // {
    //   $unwind: { path: '$products' },
    // },
    // {
    //   $lookup: {
    //     from: 'products',
    //     localField: 'products.product.title',
    //     foreignField: 'title',
    //     as: 'productDetails',
    //   },
    // },
    // {
    //   $unwind: { path: '$productDetails' },
    // },
    // {
    //   $group: { _id: '$productDetails.category', categorySales: { $sum: '$productDetails.price' }, count: { $sum: 1 } },
    // },
    // {
    //   $lookup: {
    //     from: 'categories',
    //     localField: '_id',
    //     foreignField: '_id',
    //     as: 'categoryDetails',
    //   },
    // },
    // {
    //   $project: { 'categoryDetails.title': 1, categorySales: 1, count: 1 },
    // },
    // { $sort: { 'categoryDetails.title': 1 } },
  ]);
  console.log(categoriseOrderCount);
  const brandCount = await Order.aggregate([
    {
      $unwind: { path: '$products' },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'products.product.title',
        foreignField: 'title',
        as: 'productDetails',
      },
    },
    {
      $unwind: { path: '$productDetails' },
    },
    {
      $group: { _id: '$productDetails.brand', count: { $sum: 1 } },
    },
    {
      $lookup: {
        from: 'brands',
        localField: '_id',
        foreignField: '_id',
        as: 'brandDetails',
      },
    },
    {
      $project: { 'brandDetails.title': 1, count: 1 },
    },
    { $sort: { 'brandDetails.title': 1 } },
  ]);

  const categoryNameArray = [];
  const categoryCountArray = [];
  // categoriseOrderCount.forEach((el) => {
  //   categoryCountArray.push(el.categorySales);
  //   categoryNameArray.push(el.categoryDetails[0].title);
  // });
  categoriseOrderCount.forEach((el) => {
    categoryCountArray.push(el.count);
    categoryNameArray.push(el._id);
  });

  const brandCountArray = [];
  const brandNameArray = [];
  brandCount.forEach((el) => {
    brandCountArray.push(el.count);
    brandNameArray.push(el.brandDetails[0].title);
  });
  console.log(brandNameArray);
  const msg = req.flash('success');
  res.render('admin/dashboard', {
    categoryNameArray,
    categoryCountArray,
    brandCountArray,
    brandNameArray,
    pendingOrders: pendingOrders[0].count,
    totalSales: totalSales[0],
    userCount: userCount.length,
    orders,
    msg,
    pageIn: req.session.pageIn,
    dashboardPage: ' text-gray-800 dark:text-gray-100',
    ordersPage: '',
    productsPage: '',
    bannerPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: '',
    couponPage: '',
  });
};

const getAdminOrders = async (req, res) => {
  const orders = await Order.find({}).sort({ _id: -1 }).populate('userId').populate('address');

  req.session.pageIn = 'orders';
  res.render('admin/orders', {
    orders,
    pageIn: req.session.pageIn,
    ordersPage: 'dark:text-gray-100',
    dashboardPage: '',
    productsPage: '',
    bannerPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: '',
    couponPage: '',
  });
};
const orderUpdate = async (req, res) => {
  console.log(req.body);
  const order = await Order.findByIdAndUpdate(req.body.orderId, { orderstat: req.body.newOrderStatus });
  if (order) {
    res.json({
      orderUpdate: 'success',
    });
  } else {
    res.json({
      orderUpdate: 'failed',
    });
  }
};

const getEditProductPage = async (req, res) => {
  const brand = await Brand.find({});
  const category = await Category.find({});
  let product = await Product.find({ _id: mongoose.Types.ObjectId(req.params.id) })
    .populate('brand')
    .populate('category');
  let userId = req.params.id;
  req.session.pageIn = 'products';
  res.render('admin/edit_product', {
    brand,
    category,
    product: product[0],
    userId,
    pageIn: req.session.pageIn,
    productsPage: 'dark:text-gray-100',
    bannerPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: '',
    couponPage: '',
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
      bannerPage: '',
      dashboardPage: '',
      ordersPage: '',
      usersPage: '',
      categoryPage: '',
      brandPage: '',
      couponPage: '',
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
  const msg = req.flash('error');
  req.session.pageIn = 'products';
  res.render('admin/add_product', {
    msg,
    brand,
    category,
    pageIn: req.session.pageIn,
    productsPage: 'dark:text-gray-100',
    bannerPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: '',
    couponPage: '',
  });
};

const editProduct = async (req, res) => {
  console.log(req.files);
  if (Object.keys(req.files).length == 0) {
    // console.log(req.body)
    await Product.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true,
      new: true,
      runValidators: true,
    });
    res.redirect('/admin/products');
  } else if (req.files.images == undefined && req.files.thumbnail.length !== 0) {
    const thumbnail = req.files.thumbnail[0].filename;
    Object.assign(req.body, { thumbnail });
    await Product.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true,
      new: true,
      runValidators: true,
    });
    res.redirect('/admin/products');
  } else if (req.files.thumbnail == undefined && req.files.images.length !== 0) {
    const img = [];
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
    Object.assign(req.body, { images: img, thumbnail });
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
            req.flash('success', 'Successfully Signed In');
            res.redirect('/admin/dashboard');
          } else {
            // res.status(400).json({
            //   status: 'admin Password not match',
            //   message: err,
            // });
            req.flash('error', 'Password not match');
            res.redirect('/admin');
          }
        });
      } else {
        req.flash('error', 'Email not found');
        res.redirect('/admin');
      }
    });
  } catch (err) {
    console.log(err);
    res.render('admin/error-page');
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

    console.log('product details: ', product);
    // res.status(200).json({
    //   data:req.body,
    // })
    res.redirect('/admin/products/add-product');
  } catch (err) {
    console.log(err);
    req.flash('error', 'An Error occured while adding product to database');
    res.redirect('/admin/products/add-product');
  }
};

const getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    let products = await Product.find({ available: true }).populate('brand').populate('category').exec();
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
      bannerPage: '',
      categoryPage: '',
      brandPage: '',
      couponPage: '',
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
  await Product.findByIdAndUpdate(req.params.id, { available: false });
  res.redirect('/admin/products');
};

const getCategory = async (req, res) => {
  let category = await Category.find({});
  req.session.pageIn = 'category';
  res.render('admin/category', {
    pageIn: req.session.pageIn,
    category,
    productsPage: '',
    bannerPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: 'dark:text-gray-100',
    brandPage: '',
    couponPage: '',
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
    bannerPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: 'dark:text-gray-100',
    brandPage: '',
    couponPage: '',
  });
};

const getAddCategory = (req, res) => {
  req.session.pageIn = 'category';
  res.render('admin/add_category', {
    pageIn: req.session.pageIn,
    productsPage: '',
    bannerPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: 'dark:text-gray-100',
    brandPage: '',
    couponPage: '',
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
    bannerPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: 'dark:text-gray-100',
    couponPage: '',
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
    bannerPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: 'dark:text-gray-100',
    couponPage: '',
  });
};

const getAddBrand = (req, res) => {
  req.session.pageIn = 'brand';
  res.render('admin/add_brand', {
    pageIn: req.session.pageIn,
    productsPage: '',
    bannerPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: 'dark:text-gray-100',
    brandPage: '',
    couponPage: '',
  });
};

const addBrand = async (req, res) => {
  try {
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

const getBanner = async (req, res) => {
  let banner = await Banner.find({});
  req.session.pageIn = 'banner';
  res.render('admin/banner', {
    pageIn: req.session.pageIn,
    banner,
    productsPage: '',
    bannerPage: 'dark:text-gray-100',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: '',
    couponPage: '',
  });
};

const getEditBanner = async (req, res) => {
  const bannerId = req.params.id;
  req.session.pageIn = 'banner';
  const banner = await Banner.find({ _id: mongoose.Types.ObjectId(bannerId) });
  // console.log(brand);
  res.render('admin/edit_banner', {
    banner,
    bannerId,
    pageIn: req.session.pageIn,
    productsPage: '',
    bannerPage: 'dark:text-gray-100',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: '',
    couponPage: '',
  });
};

const getAddBanner = (req, res) => {
  req.session.pageIn = 'banner';
  res.render('admin/add_banner', {
    pageIn: req.session.pageIn,
    productsPage: '',
    bannerPage: 'dark:text-gray-100',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: '',
    couponPage: '',
  });
};

const addBanner = async (req, res) => {
  try {
    // console.log(req.file)
    // console.log(req.body);

    const bannerInfo = req.body;
    const img = req.file.filename;
    // console.log(img)
    Object.assign(bannerInfo, { image: img });
    // console.log(bannerInfo);
    await Banner.create(bannerInfo);
    res.redirect('/admin/banner');
  } catch (err) {
    res.status(400).json({
      status: 'error while adding banner',
      message: err,
    });
  }
};

const editBanner = async (req, res) => {
  try {
    if (req.file == undefined) {
      // console.log(req.body)
      await Banner.findByIdAndUpdate(req.params.id, req.body, {
        upsert: true,
        new: true,
        runValidators: true,
      });
      res.redirect('/admin/banner');
    } else {
      // console.log(req.file)
      const bannerInfo = req.body;
      const img = req.file.filename;
      Object.assign(bannerInfo, { image: img });
      await Banner.findByIdAndUpdate(bannerInfo);
      res.redirect('/admin/banner');
    }
  } catch (err) {
    res.status(400).json({
      status: 'error while editing banner',
      message: err,
    });
  }
};
const getCoupon = async (req, res) => {
  let coupon = await Coupon.find({});
  req.session.pageIn = 'coupon';
  res.render('admin/coupon', {
    pageIn: req.session.pageIn,
    coupon,
    productsPage: '',
    bannerPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: '',
    couponPage: 'dark:text-gray-100',
  });
};
const getAddCoupon = (req, res) => {
  req.session.pageIn = 'coupon';
  res.render('admin/add_coupon', {
    pageIn: req.session.pageIn,
    productsPage: '',
    bannerPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: '',
    couponPage: 'dark:text-gray-100',
  });
};

const getEditCoupon = async (req, res) => {
  const couponId = req.params.id;
  req.session.pageIn = 'coupon';

  const coupon = await Coupon.find({ _id: mongoose.Types.ObjectId(couponId) });
  // console.log(brand);
  res.render('admin/edit_coupon', {
    coupon,
    couponId,
    pageIn: req.session.pageIn,
    productsPage: '',
    bannerPage: '',
    dashboardPage: '',
    ordersPage: '',
    usersPage: '',
    categoryPage: '',
    brandPage: '',
    couponPage: 'dark:text-gray-100',
  });
};
const editCoupon = async (req, res) => {
  try {
    const { code, isPercent, amount, usageLimit, minCartAmount ,maxDiscountAmount} = req.body;
    // const createdAt = new Date();
    // let expireAfter = createdAt.getTime() + req.body.expireAfter * 24 * 60 * 60 * 1000;
    // expireAfter = new Date(expireAfter);
    const coupon = { code, isPercent, amount, usageLimit, minCartAmount, maxDiscountAmount };
    await Coupon.findByIdAndUpdate(req.params.id, coupon);
    res.redirect('/admin/coupon');
  } catch (err) {
    res.status(400).json({
      status: 'error while editing coupon',
      message: err,
    });
  }
};

const addCoupon = async (req, res) => {
  try {
    const { code, isPercent, amount, usageLimit, minCartAmount, maxDiscountAmount } = req.body;
    const createdAt = new Date();
    let expireAfter = createdAt.getTime() + req.body.expireAfter * 24 * 60 * 60 * 1000;
    expireAfter = new Date(expireAfter);
    const coupon = { code, isPercent, amount, usageLimit, expireAfter, createdAt, minCartAmount, maxDiscountAmount };
    await Coupon.create(coupon);
    res.redirect('/admin/coupon');
  } catch (err) {
    res.status(400).json({
      status: 'error while adding coupon',
      message: err,
    });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    console.log(req.body);
    await Coupon.findByIdAndDelete(req.body.couponId);
    res.json({
      delete: 'success',
    });
  } catch (err) {
    res.json({
      delete: 'failed',
    });
  }
};

const salesReportGenerator = async (req,res)=>{
  try{
const products_sales= await Order.aggregate([
  {
    $match:{orderstat:{$ne:'CANCELLED'}}
  },
  {
    $unwind:{path:'$products'}
  },
  {
    $group:{_id:'$products.product.title',sold:{$sum:'$products.quantity'},sales:{$sum:'$products.subtotal'}}
  },
  {
    $lookup:{
      from: Product.collection.name,
       localField: '_id',
       foreignField: 'title',
       as:'stock'
    }
  },
  {
    $project:{_id:1,sold:1,sales:1,'stock.stock':1}
  }
]);

res.json({
  report:products_sales
})
  }catch(err){
    res.json({
      stat:'failed'
    })
  }
}

const adminLogout = async (req, res) => {
  req.session.adminLogIn = false;
  res.redirect('/admin');
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
  adminLogout,
  unblockUser,
  deleteProduct,
  adminCheck,
  getBanner,
  getAddBanner,
  addBanner,
  orderUpdate,
  getEditBanner,
  editBanner,
  getCoupon,
  getAddCoupon,
  addCoupon,
  getEditCoupon,
  editCoupon,
  salesReportGenerator,
  deleteCoupon,
};
