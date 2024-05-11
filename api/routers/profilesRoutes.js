import { Router } from "express";
import profilesController from "../controllers/ProfilesController.js";
import authMiddleware from "../middlewares/auth.js";

const profileRoutes = Router();

profileRoutes.post(
  "",
  authMiddleware.verifyToken,
  profilesController.createProfile
);

profileRoutes.get(
  "/:profileId",
  //   authMiddleware.verifyToken,
  profilesController.getProfileById
);

profileRoutes.put(
  "/:profileId",
  authMiddleware.verifyToken,
  authMiddleware.verifyOwnership,
  profilesController.updateProfileById
);

profileRoutes.delete(
  "/:profileId",
  authMiddleware.verifyToken,
  authMiddleware.verifyOwnership,
  profilesController.deleteProfileById
);

export default profileRoutes;
