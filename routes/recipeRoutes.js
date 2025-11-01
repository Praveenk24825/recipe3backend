/*import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  addComment,
  addRating,
  addFavorite,
  removeFavorite,
   getFavorites,
} from "../controllers/recipeController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

// Create recipe with image & video
router.post(
  "/",
  upload.fields([{ name: "photo", maxCount: 1 }, { name: "video", maxCount: 1 }]),
  createRecipe
);

router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.put(
  "/:id",
  upload.fields([{ name: "photo", maxCount: 1 }, { name: "video", maxCount: 1 }]),
  updateRecipe
);
router.delete("/:id", protect, deleteRecipe);

router.post("/:id/comment", protect, addComment);
router.put("/:id/rating", protect, addRating);
router.get("/favorites", protect, getFavorites); 


router.post("/favorites", protect, addFavorite);
router.delete("/favorites", protect, removeFavorite);



export default router;
*/

import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  addComment,
  addRating,
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/recipeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create recipe with image & video (protected)
router.post(
  "/",
  protect,
  upload.fields([{ name: "photo", maxCount: 1 }, { name: "video", maxCount: 1 }]),
  createRecipe
);

// Get all recipes
router.get("/", getRecipes);

// ✅ Favorites routes (must come before /:id)
router.get("/favorites", protect, getFavorites);
router.post("/favorites", protect, addFavorite);
router.delete("/favorites", protect, removeFavorite);

// Single recipe operations
router.get("/:id", getRecipeById);
router.put(
  "/:id",
  protect,
  upload.fields([{ name: "photo", maxCount: 1 }, { name: "video", maxCount: 1 }]),
  updateRecipe
);
router.delete("/:id", protect, deleteRecipe);

// Comments & ratings
router.post("/:id/comment", protect, addComment);
router.put("/:id/rating", protect, addRating);

export default router;
