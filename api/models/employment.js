import mongoose from "mongoose";
import Collections from "../database/collection.js";

const EmploymentSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  role: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
});

const EmploymentModel = mongoose.model(
  Collections.EMPLOYMENT,
  EmploymentSchema
);

export default EmploymentModel;
