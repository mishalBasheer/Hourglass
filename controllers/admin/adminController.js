import mongoose from 'mongoose';
import Admin from '../../models/adminModel.js';
import Product from '../../models/productModel.js'
import User from '../../models/userDetailsModel.js'
import Category from '../../models/categoryModel.js'
import moment from "moment";

const getAdminLogin = (req, res) => {
  if(req.session.adminLogIn){
    res.redirect('/admin/dashboard')
  }else{
    res.render('admin/login');
  }
};

const getAdminDashboard = (req, res) => {
  req.session.pageIn="dashboard";
  res.render('admin/dashboard',
  {pageIn:req.session.pageIn,
    dashboardPage:" text-gray-800 dark:text-gray-100",
    ordersPage:"",
    productsPage:"",
    usersPage:""});
};

const getAdminOrders = (req, res) => {
  req.session.pageIn="orders";
  res.render('admin/orders',
  {pageIn:req.session.pageIn,
    ordersPage:"dark:text-gray-100",
    dashboardPage:"",
    productsPage:"",
    usersPage:""});
};

const getEditProductPage =async(req,res)=>{

 let product = await Product.find({_id:mongoose.Types.ObjectId(req.params.id)})
 let userId = req.params.id;
 req.session.pageIn="products";
  res.render('admin/edit_product',
  {product:product[0],
    userId,pageIn:req.session.pageIn,
    productsPage:"dark:text-gray-100",
    dashboardPage:"",
    ordersPage:"",
    usersPage:""});
}

const getAdminProducts = async (req, res) => {
  try{
    // console.log(await getAllProduct());
    let products = await getAllProduct();
    req.session.pageIn="products";
   res.render('admin/product_management',
   {products,pageIn:req.session.pageIn,
    productsPage:"dark:text-gray-100",
    dashboardPage:"",
    ordersPage:"",
    usersPage:""});
  }catch(err){
    res.status(400).json({
      status:"no data in database",
      message:err,
    })
  }

};



const getAddProductPage = (req,res)=>{
  req.session.pageIn="products";
  res.render('admin/add_product',
  {pageIn:req.session.pageIn,
    productsPage:"dark:text-gray-100",
    dashboardPage:"",
    ordersPage:"",
    usersPage:""});
}

const editProduct = async (req, res)=>{
  // console.log(req.files)
  if(req.files.length===0){
    console.log(req.body)
    await Product.findByIdAndUpdate(req.params.id,req.body,{
      upsert:true,
      new:true,
      runValidators:true,
    })
    res.redirect('/admin/products');
  }else{
  const img=[];
  req.files.forEach(el => {
    img.push(el.filename);
  });
  Object.assign(req.body,{images:img,date:moment().format("MMMM Do YYYY, h:mm a")});
  // const {title,brand,category,price,images,description}=req.body;
  console.log(req.body)
  await Product.findByIdAndUpdate(req.params.id,req.body,{
    upsert:true,
    new:true,
    runValidators:true,
  })
  res.redirect('/admin/products');
}
}


const adminCheck = async (req, res) => {
  try{
    await Admin.findOne({ email: req.body.email }, function (err, user) {
      if (err) throw err;
      // test a matching password
      if(user!=null){
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            console.log('admin')
            req.session.adminLogIn=true;
            console.log('SESSION CHECK',req.session)
            res.redirect('/admin/dashboard');
          } else {
            res.status(400).json({
              status: 'admin Password not match',
              message:err,
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

  const uploadProduct=async (req,res)=>{
    try{
      // console.log("form body: ", req.body);
      // console.log(req.files);
      const img=[];
      req.files.forEach(el => {
        img.push(el.filename);
      });
      Object.assign(req.body,{images:img});
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

const getAllProduct = ()=>{
  return new Promise (async(resolve,reject)=>{
    let products = await Product.find();
    // if(products!=null){
      resolve(products)

    // }else{
    //   reject({status:"failed",message:"no products found"})
    // }
  })
}


const getAdminUsers =async (req, res) => {
  try{
    let users = await getAllClients();
    req.session.pageIn="users";
    res.render('admin/client',
    {users,
      pageIn:req.session.pageIn,
      usersPage:"dark:text-gray-100",
      dashboardPage:"",
      ordersPage:"",
      productsPage:"",
    block:true});
    }catch(err){
      res.status(400).json({
        status:"no data in database",
        message:err,
      })
    }

};
const blockUser =async (req,res)=>{
  try{
    const userId=req.params.id;
    await User.findByIdAndUpdate(userId,{block:true})
    res.redirect('/admin/clients');
  }catch(err){
    res.status(400).json({
      status:"blocking error",
      message:err
    })
  }
    
}
const unblockUser =async (req,res)=>{
  try{
    const userId=req.params.id;
    await User.findByIdAndUpdate(userId,{block:false})
    res.redirect('/admin/clients');
  }catch(err){
    res.status(400).json({
      status:"unblocking error",
      message:err
    })
  }
    
}
const getAllClients = ()=>{
  return new Promise (async(resolve,reject)=>{
    let users = await User.find();
    if(users!=null){
      resolve(users)
    }else{
      reject({status:"failed",message:"no users found"})
    }
  })
}

const deleteProduct= async(req,res)=>{
  await Product.deleteOne({_id:req.params.id});
  res.redirect('/admin/products')
}

const getCategory = async (req,res)=>{
 let category= await Category.find({});
res.render('admin/category',
{pageIn:req.session.pageIn,
  category,
  productsPage:"dark:text-gray-100",
  dashboardPage:"",
  ordersPage:"",
  usersPage:""})
}

const getEditCategory =async (req,res)=>{
  const catId = req.params.id;
  const category = await Category.find({_id:mongoose.Types.ObjectId(catId)})
  console.log(category);
res.render('admin/edit_category',
{category,
  catId,
  pageIn:req.session.pageIn,
  productsPage:"dark:text-gray-100",
  dashboardPage:"",
  ordersPage:"",
  usersPage:""});
}

const getAddCategory = (req,res)=>{
res.render('admin/add_category',
{pageIn:req.session.pageIn,
  productsPage:"dark:text-gray-100",
  dashboardPage:"",
  ordersPage:"",
  usersPage:""});
}

const addCategory =async(req,res)=>{
  try{
    console.log(req.file)
    console.log(req.body);

    const catInfo = req.body;
    const img = req.file.filename;
    console.log(img)
    Object.assign(catInfo,{image:img});
    console.log(catInfo);
    await Category.create(catInfo);
    res.redirect('/admin/category');
  }catch(err){
    res.status(400).json({
      status:"error while adding category",
      message:err
    })
  }
}
const editCategory = async(req,res)=>{
  try{
    if(req.file==undefined){
      console.log(req.body)
      await Category.findByIdAndUpdate(req.params.id,req.body,{
        upsert:true,
        new:true,
        runValidators:true,
      })
      res.redirect('/admin/category');
    }else{
      
      console.log(req.file)
      const catInfo = req.body;
      const img = req.file.filename;
      Object.assign(catInfo,{image:img});
      await Category.findByIdAndUpdate(catInfo);
      res.redirect('/admin/category');
    }
  }catch(err){
    res.status(400).json({
      status:"error while editing category",
      message:err,
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
  getEditProductPage,
  editProduct,
  blockUser,
  getCategory,
  getEditCategory,
  getAddCategory,
  addCategory,
  editCategory,
  unblockUser,
  deleteProduct,
  adminCheck};
