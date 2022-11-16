import mongoose from 'mongoose';
import Admin from '../../models/adminModel.js';
import Product from '../../models/productModel.js'
import moment from "moment";

const getAdminLogin = (req, res) => {
  res.render('admin/login');
};

const getAdminDashboard = (req, res) => {
  res.render('admin/dashboard');
};

const getAdminOrders = (req, res) => {
  res.render('admin/orders');
};

const getEditProductPage =async(req,res)=>{

 let product = await Product.find({_id:mongoose.Types.ObjectId(req.params.id)})
 let userId = req.params.id;
  res.render('admin/edit_product',{product:product[0],userId});
}

const getAdminProducts = async (req, res) => {
  try{
    // console.log(await getAllProduct());
    let products = await getAllProduct();
   res.render('admin/product_management',{products});
  }catch(err){
    res.status(400).json({
      status:"no data in database",
      message:err,
    })
  }

};

const getAdminUsers = (req, res) => {
  res.render('admin/client');
};

const getAddProductPage = (req,res)=>{
  res.render('admin/add_product');
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
  const {title,brand,category,price,images,description}=req.body;
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

  const uploadProduct=async (req,res)=>{
    try{
      console.log("form body: ", req.body);
      console.log(req.files);
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

const getAllProduct= ()=>{
  return new Promise (async(resolve,reject)=>{
    let products = await Product.find();
    if(products!=null){
      resolve(products)

    }else{
      reject({status:"failed",message:"no products found"})
    }
  })
}

const deleteProduct= async(req,res)=>{
  await Product.deleteOne({_id:req.params.id});
  res.redirect('/admin/products')
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
  deleteProduct,
  adminCheck};
