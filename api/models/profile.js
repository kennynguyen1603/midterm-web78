import mongoose from "mongoose";
import Collections from "../database/collection.js";
import SkillsModel from "./skills.js";
import ProjectsModel from "./projects.js";
import EmploymentModel from "./employment.js";

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: Collections.USERS },
  full_name: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  place_of_birth: { type: String, required: true },
  nationality: { type: String, required: true },
  education: { type: String, required: true },
  skills: [SkillsModel.schema],
  projects: [ProjectsModel.schema],
  employments: [EmploymentModel.schema],
  interests: [{ type: String }],
  goals: [{ type: String }],
});

const ProfileModel = mongoose.model(Collections.PROFILE, ProfileSchema);

export default ProfileModel;
