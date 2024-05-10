import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const token = {
  generateAccessToken: (userData, expiresIn) => {
    return jwt.sign({ userData }, process.env.MY_ACCESS_SECRET_KEY, {
      expiresIn: expiresIn ?? "15m",
    });
  },

  generateRefreshToken: (userData) => {
    return jwt.sign({ userData }, process.env.MY_REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });
  },

  verifyAccessToken: (accessToken) => {
    try {
      return jwt.verify(accessToken, process.env.MY_ACCESS_SECRET_KEY);
    } catch (error) {
      throw new Error("Invalid access token");
    }
  },

  verifyRefreshToken: (refreshToken) => {
    try {
      return jwt.verify(refreshToken, process.env.MY_REFRESH_SECRET_KEY);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  },
};

export { token };
