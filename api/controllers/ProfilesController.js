import ProfileModel from "../models/profile.js";
import { removeProfileFromUser } from "./usersController.js";

const profilesController = {
  createProfile: async (req, res) => {
    try {
      // thực hiện kiểm tra xem người dùng này đã tạo profile trước đó chưa (tồn tại 1 profile rồi),
      // Nếu chưa thì mới được tạo
      const userId = req.session.user.id;

      const existingProfile = await ProfileModel.findOne({ user: userId });
      if (existingProfile) {
        return res
          .status(409)
          .json({ message: "Người dùng này đã có hồ sơ tồn tại." });
      }

      const {
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

      const profile = new ProfileModel({
        user: userId,
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
      return res.status(201).json({
        message: "Tạo hồ sơ thành công",
        data: savedProfile,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ message: error.message || "Lỗi máy chủ nội bộ" });
    }
  },
  getProfileById: async (req, res) => {
    try {
      const { profileId } = req.params;
      const existedProfile = await ProfileModel.findById(profileId);
      if (!existedProfile)
        return res.status(404).send({ message: "Profile not found" });

      return res.status(200).send({
        data: existedProfile,
        message: "Get profile successfully",
        success: true,
      });
    } catch (error) {
      res.status(error.status || 500).send({
        data: null,
        message: error.message || "Internal server error",
        success: false,
      });
    }
  },
  updateProfileById: async (req, res) => {
    try {
      const profileId = req.profileId;
      const updateData = req.body;

      const updatedProfile = await ProfileModel.findByIdAndUpdate(
        profileId,
        updateData,
        { new: true }
      );

      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.status(200).json({
        message: "Profile updated successfully",
        data: updatedProfile,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ message: error.message || "Internal server error" });
    }
  },
  deleteProfileById: async (req, res) => {
    try {
      const profile = await ProfileModel.findById(req.profileId);
      if (!profile) {
        return res.status(404).send({ message: "Profile does not exist" });
      }

      const userId = profile.user;

      await ProfileModel.findByIdAndDelete(req.profileId);

      await removeProfileFromUser(userId);

      return res.status(200).send({ message: "Profile deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: error.message || "Internal server error" });
    }
  },
};

export default profilesController;
