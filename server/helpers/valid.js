import { check } from "express-validator";

export const validRegister = [
    check("email")
        .isEmail()
        .withMessage("Must be valid email address"),
    check("password", "password is required")
        .notEmpty(),
    check("password") 
        .isLength({
            min: 8
        })
        .withMessage("Password must contain at least 8 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number")
];

export const validLogin = [
    check("email")
        .isEmail()
        .withMessage("Must be a valid email address"),
    check("password", "password is required")
        .notEmpty(),
    check("password")
        .isLength({
            min: 8
        })
        .withMessage("Password must contain at least 8 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number")
];

export const forgotPasswordValidator = [
    check("email") 
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("Must be a valid email address")
];

export const resetPasswordValidator = [
    check("newPassword")
        .not()
        .isEmpty()
        .isLength({
            min: 8
        })
        .withMessage("Password must contain at least 8 characters")
];