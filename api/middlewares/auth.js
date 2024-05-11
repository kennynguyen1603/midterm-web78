// import UsersModel from "../models/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import { token } from "../utils/token.js";
import UsersModel from "../models/users.js";

dotenv.config();
const authMiddleware = {
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .send({ message: "Unauthorized! No token provided." });
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "No token provided." });
    }

    jwt.verify(token, process.env.MY_ACCESS_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.user = decoded.userData;
      next();
    });
  },
  verifyOwnership: async (req, res, next) => {
    try {
      const { profileId } = req.params;
      // sau khi login thi thong tin nguoi dung se duoc luu o session
      const user = await UsersModel.findById(req.session.user.id);

      if (!profileId)
        return res.status(401).send({ message: "ProfileId is required" });
      if (user.profile.toString() === profileId) {
        req.profileId = profileId;
        next();
      } else {
        return res.status(403).send({
          message: "You do not have permission to modify this profile",
        });
      }
    } catch (error) {
      return res.status(error.status || 500).send({
        data: null,
        message: error.message || "Internal server error",
        success: false,
      });
    }
  },
};

export default authMiddleware;
