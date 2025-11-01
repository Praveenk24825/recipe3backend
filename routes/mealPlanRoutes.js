import express from "express";
import {
  createMealPlan,
  getMealPlans,
  getMealPlanById,
  updateMealPlan,
  deleteMealPlan,
} from "../controllers/mealPlanController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CRUD for meal plans
router.post("/", protect, createMealPlan);
router.get("/", protect, getMealPlans);
router.get("/:id", protect, getMealPlanById);
router.put("/:id", protect, updateMealPlan);
router.delete("/:id", protect, deleteMealPlan);

export default router;
