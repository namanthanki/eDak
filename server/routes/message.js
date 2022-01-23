import express from "express";

import { sendMessagesController, getMessagesController, getMessageController } from "../controllers/messageController.js";

const router = express.Router();

router.post("/:id", sendMessagesController);
router.get("/:chat_id", getMessagesController);
router.get("/read/:msg_id", getMessageController);

export default router;