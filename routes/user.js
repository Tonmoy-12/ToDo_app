import express from "express";
import {
  getAllUsers,
  register,
  login,
  logout,
  getMyProfile,
} from "../controllers/user.js";

import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();
// Route to get all users
router.get("/all", getAllUsers);

// Route to register a new user
router.post("/new", register);

// Route to login user
router.post("/login", login);

router.get("/logout", logout);


router.get("/me",isAuthenticated, getMyProfile)

export default router;
