import { Router } from "express";
import userRouters from "./users.js";
import profileRoutes from "./profiles.js";
import authRouters from "./auth.js";
const rootRouterV1 = Router();
rootRouterV1.use("/users", userRouters);
rootRouterV1.use("/profiles", profileRoutes);
rootRouterV1.use("/auth", authRouters);

export default rootRouterV1;
