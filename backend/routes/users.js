import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserProfile, getSuggestedProfiles, toggleFollowUser, updateUserProfile, searchUsers } from "../controllers/users.js"

const router = express.Router();
router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getSuggestedProfiles);
router.post("/toggle-follow/:user_id", protectRoute, toggleFollowUser);
router.post("/update", protectRoute, updateUserProfile);
router.get("/search", protectRoute, searchUsers);


export default router;
