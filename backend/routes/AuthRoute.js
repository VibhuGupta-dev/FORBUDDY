import { Router } from "express";
import { loginUser, registerUser } from "../controller/AuthController.js";


const router = Router();

// Root route
router.get("/", (req, res) => {
    res.status(200).send("Hey there!");
});

// Register route
router.post("/register", registerUser)

// Login route
router.post("/login", loginUser)

export default router;