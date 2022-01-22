import express from "express";
import { profileController } from "../controllers/profileController.js";
import { searchUserController } from "../controllers/profileController.js";

const router = express.Router();

router.get("/:id/profile_picture", profileController);
router.get("/:id/search", searchUserController);

export default router;