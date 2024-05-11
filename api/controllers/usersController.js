import UsersModel from "../models/users.js";
// import ProfileModel from "../models/profile.js";

async function removeProfileFromUser(userId) {
  try {
    await UsersModel.findByIdAndUpdate(userId, {
      $unset: { profile: "" },
    });
  } catch (error) {
    throw error;
  }
}

const usersController = {
  changUserCredentials: async (req, res) => {
    const { userId } = req.params;
    const { newUsername, newPassword } = req.body;

    try {
      if (!newUsername || !newPassword) {
        return res
          .status(400)
          .send({ message: "Username and password are required." });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      const updatedUser = await UsersModel.findByIdAndUpdate(
        userId,
        {
          username: newUsername,
          password: hashedPassword,
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).send({ message: "User not found" });
      }

      res.status(200).send({
        message: "Username and password updated successfully",
        data: { username: updatedUser.username },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // chỉ có người dùng mới xem được thông tin xác thực của mình
  userCredentials: async (req, res) => {
    try {
      const user = req.user; // id email duoc lay tu jwt
      const { userId } = req.params;

      const existingUser = await UsersModel.findById(userId);

      if (!existingUser)
        return res.status(404).send({ message: "Không tìm thấy thông tin" });

      if (user.userId !== userId)
        return res.status(403).send({ message: "Bạn không có quyền xem" });

      return res.status(200).send({
        data: existingUser,
        message: "Lấy thông tin thành công!",
        success: true,
      });
    } catch (error) {
      return res.status(error.status || 500).send({
        data: null,
        message: error.message || "Internal server error",
        success: false,
      });
    }
  },
};

export default usersController;
export { removeProfileFromUser };
