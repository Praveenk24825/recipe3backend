import asyncHandler from "express-async-handler";
import MealPlan from "../models/MealPlan.js";

// @desc    Get all meal plans for logged-in user
// @route   GET /api/mealplans
// @access  Private
export const getMealPlans = asyncHandler(async (req, res) => {
  const mealPlans = await MealPlan.find({ createdBy: req.user._id }).populate("recipes");
  res.json(mealPlans);
});

// @desc    Get single meal plan by ID (only if it belongs to logged-in user)
// @route   GET /api/mealplans/:id
// @access  Private
export const getMealPlanById = asyncHandler(async (req, res) => {
  const mealPlan = await MealPlan.findOne({ _id: req.params.id, createdBy: req.user._id }).populate("recipes");
  if (mealPlan) {
    res.json(mealPlan);
  } else {
    res.status(404);
    throw new Error("Meal plan not found");
  }
});

// @desc    Create a new meal plan
// @route   POST /api/mealplans
// @access  Private
export const createMealPlan = asyncHandler(async (req, res) => {
  const { title, recipes } = req.body;

  if (!title || !recipes) {
    res.status(400);
    throw new Error("Title and recipes are required");
  }

  const mealPlan = new MealPlan({
    createdBy: req.user._id, // use correct field
    title,
    recipes, // array of recipe IDs
  });

  const createdMealPlan = await mealPlan.save();
  res.status(201).json(createdMealPlan);
});

// @desc    Update a meal plan
// @route   PUT /api/mealplans/:id
// @access  Private
export const updateMealPlan = asyncHandler(async (req, res) => {
  const mealPlan = await MealPlan.findOne({ _id: req.params.id, createdBy: req.user._id });

  if (mealPlan) {
    mealPlan.title = req.body.title || mealPlan.title;
    mealPlan.recipes = req.body.recipes || mealPlan.recipes;

    const updatedMealPlan = await mealPlan.save();
    res.json(updatedMealPlan);
  } else {
    res.status(404);
    throw new Error("Meal plan not found");
  }
});

// @desc    Delete a meal plan
// @route   DELETE /api/mealplans/:id
// @access  Private
export const deleteMealPlan = asyncHandler(async (req, res) => {
  const mealPlan = await MealPlan.findById(req.params.id);

  if (mealPlan) {
    await mealPlan.deleteOne(); 
    res.json({ message: "Meal plan removed" });
  } else {
    res.status(404);
    throw new Error("Meal plan not found");
  }
});
