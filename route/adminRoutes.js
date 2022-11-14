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
  deleteProduct,
  getAdminUsers,
} from '../controllers/admin/adminController.js';

const router = express.Router();

router.route('/').get(getAdminLogin).post(adminCheck);
router.route('/dashboard').get(getAdminDashboard);
router.route('/orders').get(getAdminOrders);
router.route('/products').get(getAdminProducts);
router.route('/products/add-product').get(getAddProductPage).post(uploadProduct);
router.route('/products/edit-product/:id').get(getEditProductPage).post(editProduct);
router.route('/products/delete-product/:id').get(deleteProduct);
router.route('/clients').get(getAdminUsers);

export default router;
