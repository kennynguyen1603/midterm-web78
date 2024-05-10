import mongoose from "mongoose";
import Collections from "../database/collection.js";

const UsersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: Collections.PROFILE },
  refreshToken: { type: String },
});

const UsersModel = mongoose.model(Collections.USERS, UsersSchema);

export default UsersModel;
