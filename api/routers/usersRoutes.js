import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import usersController from "../controllers/usersController.js";
const userRouters = Router();

userRouters.get(
  "/:userId",
  authMiddleware.verifyToken,
  usersController.userCredentials
);

// thay đôi
userRouters.put(
  "/:userId",
  authMiddleware.verifyToken,
  usersController.changUserCredentials
);

export default userRouters;
