import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import usersController from "../controllers/usersController.js";
const userRouters = Router();

userRouters.get(
  "/protected",
  authMiddleware.verifyToken,
  usersController.protected
);

userRouters.get("/profile/:profileId", usersController.getProfileById);

export default userRouters;
