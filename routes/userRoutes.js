import express from "express";
import { getUserHome } from "../controllers/userController.js";

const router = express.Router();

router.route('/').get(getUserHome);

export default router;