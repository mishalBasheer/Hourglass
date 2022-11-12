import express from 'express';
import { 
    getAdminLogin,
    getAdminDashboard,
    getAdminOrders,
    getAdminProducts,
    getAdminUsers} from "../controllers/admin/adminController.js";

const router = express.Router();

router.route('/').get(getAdminLogin);
router.route('/dashboard').get(getAdminDashboard);
router.route('/orders').get(getAdminOrders);
router.route('/products').get(getAdminProducts);
router.route('/clients').get(getAdminUsers);


export default router;
