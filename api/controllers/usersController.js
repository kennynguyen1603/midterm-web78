// import UsersModel from "../models/users.js";
// import ProfileModel from "../models/profile.js";
// import bcrypt from "bcrypt";
// import { token } from "../utils/token.js";

const usersController = {
  protected: (req, res) => {
    res.status(200).send({
      message: "ok",
    });
  },
  getProfileById: async (req, res) => {
    console.log("hello");
  },
};

export default usersController;
