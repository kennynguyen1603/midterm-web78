import mongoose from "mongoose";
import Collections from "../database/collection.js";
// import ProfileModel from "./profile.js";
const UsersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: Collections.PROFILE },
});

const UsersModel = mongoose.model(Collections.SKILLS, UsersSchema);

export default UsersModel;
