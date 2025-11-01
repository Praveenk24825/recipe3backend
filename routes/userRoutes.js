import express from "express";
import {
    getUserProfile,
    updateUserProfile,
    followUser,
    unfollowUser,
    getAllUsers,
} from "../controllers/userController.js";


import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user profile
router.get("/profile", protect, getUserProfile);

// Update user profile
router.put("/profile", protect, updateUserProfile);

// Follow another user
router.put("/:id/follow", protect, followUser);

// Unfollow a user
router.put("/:id/unfollow", protect, unfollowUser);

router.get("/", protect, getAllUsers); // GET /api/users

export default router;
