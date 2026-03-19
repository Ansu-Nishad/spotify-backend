import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

router.get("/login", AuthController.login);

router.get("/callback", AuthController.callback);

export default router;
