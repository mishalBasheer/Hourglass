import express from 'express';
import { getAdminLogin } from "../controllers/adminController.js";

const router = express.Router();

router.route('/').get(getAdminLogin);

export default router;
