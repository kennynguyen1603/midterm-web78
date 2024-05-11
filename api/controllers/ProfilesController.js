import ProfileModel from "../models/profile.js";

const profilesController = {
  createProfile: async (req, res) => {
    try {
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
        .json({ message: error.message || "Lỗi máy chủ nội bộ" });
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
      const deletedProfile = await ProfileModel.findByIdAndDelete(
        req.profileId
      );

      console.log(deletedProfile);

      if (!deletedProfile) {
        return res.status(404).send({ message: "Profile does not exist" });
      }

      return res.status(200).send({ message: "Profile deleted successfully" });
    } catch (error) {}
  },
};

export default profilesController;
