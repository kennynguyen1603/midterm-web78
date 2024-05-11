import { Router } from "express";
import userRouters from "./usersRoutes.js";
import profileRoutes from "./profilesRoutes.js";
import authRouters from "./authsRoutes.js";
const rootRouterV1 = Router();
rootRouterV1.use("/users", userRouters);
rootRouterV1.use("/profiles", profileRoutes);
rootRouterV1.use("/auth", authRouters);

export default rootRouterV1;
