import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc    Get logged-in user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update logged-in user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});  

// Follow a user
export const followUser = asyncHandler(async (req, res) => {
  const userToFollow = await User.findById(req.params.id);
  const currentUser = await User.findById(req.user._id);

  if (!userToFollow) {
    return res.status(404).json({ message: "User not found" });
  }
  if (userToFollow._id.equals(currentUser._id)) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  const alreadyFollowing = userToFollow.followers.some((f) =>
    f.equals(currentUser._id)
  );

  if (alreadyFollowing) {
    return res.status(400).json({ message: "Already following this user" });
  }

  userToFollow.followers.push(currentUser._id);
  currentUser.following.push(userToFollow._id);

  await userToFollow.save();
  await currentUser.save();

  res.json({
  message: `You are now following ${userToFollow.name}`,
  userToFollow: await User.findById(userToFollow._id).select("-password"),
  currentUser: await User.findById(currentUser._id).select("-password"),
});

});

// Unfollow a user
export const unfollowUser = asyncHandler(async (req, res) => {
  const userToUnfollow = await User.findById(req.params.id);
  const currentUser = await User.findById(req.user._id);

  if (!userToUnfollow) {
    return res.status(404).json({ message: "User not found" });
  }
  if (userToUnfollow._id.equals(currentUser._id)) {
    return res.status(400).json({ message: "You cannot unfollow yourself" });
  }

  userToUnfollow.followers = userToUnfollow.followers.filter(
    (f) => !f.equals(currentUser._id)
  );
  currentUser.following = currentUser.following.filter(
    (f) => !f.equals(userToUnfollow._id)
  );

  await userToUnfollow.save();
  await currentUser.save();

  res.json({
    message: `You have unfollowed ${userToUnfollow.name}`,
    userToUnfollow: await User.findById(userToUnfollow._id).select("-password"),
    currentUser: await User.findById(currentUser._id).select("-password"),
  });
});
// Controller: getAllUsers
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users); 
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};