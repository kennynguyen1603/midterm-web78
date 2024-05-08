import { Router } from "express";
import userRouters from "./users.js";
import profileRoutes from "./profiles.js";
const rootRouterV1 = Router();
rootRouterV1.use("/users", userRouters);
rootRouterV1.use("/profiles", profileRoutes);

export default rootRouterV1;
