import express from 'express';
import { 
    getAdminLogin,
    getAdminDashboard,
    getAdminOrders,
    getAdminProducts,
    adminCheck,
    getAdminUsers} from "../controllers/admin/adminController.js";

const router = express.Router();

router.route('/').get(getAdminLogin).post(adminCheck);
router.route('/dashboard').get(getAdminDashboard);
router.route('/orders').get(getAdminOrders);
router.route('/products').get(getAdminProducts);
router.route('/clients').get(getAdminUsers);


export default router;
