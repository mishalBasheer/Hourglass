import express from 'express';
import {
  getAdminLogin,
  getAdminDashboard,
  getAdminOrders,
  getAdminProducts,
  adminCheck,
  getAddProductPage,
  uploadProduct,
  getEditProductPage,
  editProduct,
  blockUser,
  unblockUser,
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
  deleteProduct,
  getAdminUsers,
} from '../controllers/admin/adminController.js';
import { uploadMultiple,
        uploadOne,
        uploadBrandImg } from "../middleware/multerMiddleware.js";
import { adminLoginCheck } from "../middleware/adminLoginCheckMiddleware.js";

const router = express.Router();

router.route('/').get(getAdminLogin).post(adminCheck);
router.route('/dashboard').get(adminLoginCheck,getAdminDashboard);
router.route('/orders').get(adminLoginCheck,getAdminOrders);
router.route('/products').get(adminLoginCheck,getAdminProducts);
router.route('/products/add-product').get(adminLoginCheck,getAddProductPage).post(uploadMultiple, uploadProduct);
router.route('/products/edit-product/:id').get(adminLoginCheck,getEditProductPage).post(uploadMultiple,editProduct);
router.route('/products/delete-product/:id').get(adminLoginCheck,deleteProduct);
router.route('/clients').get(adminLoginCheck,getAdminUsers);
router.route('/clients/block/:id').get(adminLoginCheck,blockUser);
router.route('/clients/unblock/:id').get(adminLoginCheck,unblockUser);
router.route('/category').get(adminLoginCheck,getCategory);
router.route('/category/add-category').get(adminLoginCheck,getAddCategory).post(adminLoginCheck,uploadOne,addCategory);
router.route('/category/edit-category/:id').get(adminLoginCheck,getEditCategory).post(adminLoginCheck,uploadOne,editCategory);
router.route('/brand').get(adminLoginCheck,getBrand);
router.route('/brand/add-brand').get(adminLoginCheck,getAddBrand).post(adminLoginCheck,uploadBrandImg,addBrand);
router.route('/brand/edit-brand/:id').get(adminLoginCheck,getEditBrand).post(adminLoginCheck,uploadBrandImg,editBrand);

export default router;
