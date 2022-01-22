import express from "express";
import { createChatController, fetchChatController } from "../controllers/chatController.js";

const router = express.Router();

router.post("/:id", createChatController);
router.get("/:id", fetchChatController);

export default router;