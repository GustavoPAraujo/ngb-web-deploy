import express from "express";
import { authCheck, signup, login, logout, deleteAccount } from "../controllers/auth.js";
import protectRoute from "../middleware/protectRoute.js"


const router = express.Router();
router.get("/authcheck", protectRoute, authCheck);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/delete-account", protectRoute, deleteAccount); // New route for account deletion

export default router;
