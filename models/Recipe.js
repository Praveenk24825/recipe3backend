import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, // for now just store username
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const ratingSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String }],
    steps: [{ type: String }],
    cookingTime: { type: Number },
    servings: { type: Number },
    photo: { type: String }, // path to image
    video: { type: String }, // path to video
    comments: [commentSchema],
    ratings: [ratingSchema],
    rating: { type: Number, default: 0 }, // optional average rating
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
