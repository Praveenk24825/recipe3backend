import mongoose from "mongoose";
import User from "./User.js"; // Import User, don't redefine

const mealPlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

// Prevent overwriting the model
const MealPlan = mongoose.models.MealPlan || mongoose.model("MealPlan", mealPlanSchema);
export default MealPlan;
