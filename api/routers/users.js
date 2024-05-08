import { Router } from "express";
import usersController from "../controllers/usersController.js";

const userRouters = Router();

userRouters.post("/register", usersController.register);

export default userRouters;
