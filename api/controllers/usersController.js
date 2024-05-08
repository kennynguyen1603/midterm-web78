import UsersModel from "../models/users.js";
import bcrypt from "bcrypt";
const usersController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      if (!username) throw new Error("userName is required!");
      if (!email) throw new Error("email is required!");
      if (!password) throw new Error("password is required!");

      const existedEmail = await UsersModel.findOne({ email });
      if (existedEmail) throw new Error("Email already exists!");

      const hashedPassword = await bcrypt.hash(password, salt);

      const createdUser = await UsersModel.create({
        username,
        email,
        password: hashedPassword,
      });

      res.status(201).send({
        data: createdUser,
        message: "Register successful!",
        success: true,
      });
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
        success: false,
      });
    }
  },
};

export default usersController;
