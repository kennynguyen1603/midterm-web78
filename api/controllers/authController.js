import UsersModel from "../models/users.js";
import ProfileModel from "../models/profile.js";
import bcrypt from "bcrypt";
import { token } from "../utils/token.js";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();
// Validation function
function validateFields(fields) {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) throw new Error(`${key} is required!`);
  }
}

const authController = {
  // Register a new user
  registerUser: async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        full_name,
        date_of_birth,
        place_of_birth,
        nationality,
        education,
        skills,
        projects,
        employments,
        interests,
        goals,
      } = req.body;
      const saltRounds = 10;

      // Validate required fields
      try {
        validateFields({
          username,
          email,
          password,
          full_name,
          date_of_birth,
          place_of_birth,
          nationality,
          education,
        });
      } catch (validationError) {
        return res.status(400).json({ message: validationError.message });
      }

      // Check if the username or email already exists
      const existingUser = await UsersModel.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "Username or email already exists!" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create and save a new profile
      const profile = new ProfileModel({
        full_name,
        date_of_birth,
        place_of_birth,
        nationality,
        education,
        skills: skills || [],
        projects: projects || [],
        employments: employments || [],
        interests: interests || [],
        goals: goals || [],
      });

      const savedProfile = await profile.save();

      if (!savedProfile) {
        throw new Error("Failed to save profile");
      }

      const createdUser = await UsersModel.create({
        username,
        email,
        password: hashedPassword,
        profile: savedProfile._id,
      });

      return res.status(201).json({
        data: createdUser,
        message: "User registered successfully!",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal server error",
        data: null,
        success: false,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        throw new Error("Email and password are required");

      const user = await UsersModel.findOne({ email })
        .populate("profile")
        .exec();
      if (!user) {
        return res.status(401).send({ message: "Invalid email or password" });
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const accessToken = token.generateAccessToken(
        { userId: user._id, email: user.email },
        "15m"
      );
      const refreshToken = token.generateRefreshToken({
        userId: user._id,
        email: user.email,
      });

      req.session.user = { id: user._id, email: user.email };

      // const userObject = user.toObject();
      // delete userObject.password;
      user.refreshToken = refreshToken;
      user.save();

      return res.status(200).send({
        message: "Login successful",
        token: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        user: {
          username: user.username,
          email: user.email,
          profile: user.profile,
        },
      });
    } catch (error) {
      return res.status(error.status || 500).send({
        data: null,
        message: error.message || "Internal server error",
        success: false,
      });
    }
  },
  refreshAccessToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw new Error("Refresh token is required");

      let decodedToken = token.verifyRefreshToken(refreshToken);

      console.log(decodedToken.userData);

      const user = await UsersModel.findOne({
        _id: decodedToken.userData.userId,
        refreshToken,
      });

      if (!user)
        return res.status(403).send({ message: "Invalid Refresh Token!" });

      const newAccessToken = token.generateAccessToken(
        { userId: user._id, email: user.email },
        "15m"
      );

      return res.status(200).send({
        message: "Access token refreshed successfully",
        newAccessToken,
      });
    } catch (error) {
      return res.status(error.status || 500).send({
        data: null,
        message: error.message || "Internal server error",
        success: false,
      });
    }
  },
  logout: async (req, res) => {
    try {
      // console.log(req.session);
      // console.log(req.session.user);
      const { refreshToken } = req.body;

      if (!refreshToken) throw new Error("Refresh Token Is Required!");
      else UsersModel.deleteOne({ refreshToken });
      if (!req.session.user)
        return res.status(400).send({ message: "No active session found" });

      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).json({ message: "Unable to log out" });
          }
          return res.status(200).json({ message: "Logout successful" });
        });
      } else {
        return res.status(400).json({ message: "No active session found" });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ message: error.message || "Internal server error" });
    }
  },
};

export default authController;
