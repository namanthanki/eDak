import express from "express";
import { profileController } from "../controllers/profileController.js";

const router = express.Router();

router.get("/:id/profile_picture", profileController);

export default router;