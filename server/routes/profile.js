import express from "express";
import { deleteFriendChat, profileController, updateUserBio, updateUserInterests, updateUserLanguages } from "../controllers/profileController.js";
import { searchUserController } from "../controllers/profileController.js";

const router = express.Router();

router.get("/:id", profileController);
router.get("/:id/search", searchUserController);
router.patch("/:id/update/interests", updateUserInterests);
router.patch("/:id/update/languages", updateUserLanguages);
router.patch("/:id/update/bio", updateUserBio);
router.delete("/:id/chat/delete", deleteFriendChat);

export default router;
