import { Router } from "express";
import usersController from "../controllers/usersController.js";
import authController from "../controllers/authController.js";

const authRouters = Router();

authRouters.post("/register", authController.registerUser);

authRouters.post("/login", authController.login);

export default authRouters;
