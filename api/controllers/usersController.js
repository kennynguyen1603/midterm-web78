// import UsersModel from "../models/users.js";
// import ProfileModel from "../models/profile.js";

const usersController = {
  protected: (req, res) => {
    res.status(200).send({
      message: "ok",
    });
  },
};

export default usersController;
