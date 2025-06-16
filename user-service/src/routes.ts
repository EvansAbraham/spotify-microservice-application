import express from "express";
import { isAuth } from "./middleware.js";
import { loginUser, myProfile, registerUser } from "./controllers.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/me", isAuth, myProfile);

export default router;