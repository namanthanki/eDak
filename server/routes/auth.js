import express from "express";

import { activationController } from "../controllers/activationController.js";
import { forgotPasswordController } from "../controllers/forgotPasswordController.js";
import { loginController } from "../controllers/loginController.js";
import { registerController } from "../controllers/registerController.js";
import { resetPasswordController } from "../controllers/resetPasswordController.js";
import { validRegister, validLogin, forgotPasswordValidator, resetPasswordValidator } from "../helpers/valid.js";

const router = express.Router();

router.post("/register", validRegister, registerController);
router.post("/login", validLogin, loginController);
router.post("/activate", activationController);

router.put("/password/forgot", forgotPasswordValidator, forgotPasswordController);
router.put("/password/reset", resetPasswordValidator, resetPasswordController);

export default router;