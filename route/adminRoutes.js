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
  deleteProduct,
  getAdminUsers,
} from '../controllers/admin/adminController.js';
import { upload } from "../middleware/multerMiddleware.js";
import { adminLoginCheck } from "../middleware/adminLoginCheckMiddleware.js";

const router = express.Router();

router.route('/').get(getAdminLogin).post(adminCheck);
router.route('/dashboard').get(adminLoginCheck,getAdminDashboard);
router.route('/orders').get(adminLoginCheck,getAdminOrders);
router.route('/products').get(adminLoginCheck,getAdminProducts);
router.route('/products/add-product').get(adminLoginCheck,getAddProductPage).post(upload, uploadProduct);
router.route('/products/edit-product/:id').get(adminLoginCheck,getEditProductPage).post(upload,editProduct);
router.route('/products/delete-product/:id').get(adminLoginCheck,deleteProduct);
router.route('/clients').get(adminLoginCheck,getAdminUsers);
router.route('/clients/block/:id').get(adminLoginCheck,blockUser);
router.route('/clients/unblock/:id').get(adminLoginCheck,unblockUser);

export default router;
