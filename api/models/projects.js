import mongoose from "mongoose";
import Collections from "../database/collection.js";

const ProjectsSchema = new mongoose.Schema({
  project_name: { type: String, required: true },
  project_description: { type: String, required: true },
  role: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
});

const ProjectsModel = mongoose.model(Collections.PROJECTS, ProjectsSchema);

export default ProjectsModel;
