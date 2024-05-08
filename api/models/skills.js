import mongoose from "mongoose";
import Collections from "../database/collection.js";

const SkillsSchema = new mongoose.Schema({
  skill_description: { type: String, required: true },
});

const SkillsModel = mongoose.model(Collections.SKILLS, SkillsSchema);

export default SkillsModel;
