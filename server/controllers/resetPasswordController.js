import _ from "lodash";

import dotenv from "dotenv";
dotenv.config({
    path: "./config/config.env"
});

import jwt from "jsonwebtoken";
import User from "../models/User.js";

import { validationResult } from "express-validator";

const resetPasswordController = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        if(resetPasswordLink) {
            jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, (err, decoded) => {
                if(err) {
                    return res.status(400).json({
                        error: "Expired Link, Try Again"
                    })
                }

                User
                    .findOne({resetPasswordLink}, (err, user) => {
                        if(err || !user) {
                            return res.status(400).json({
                                error: "Something went wrong, Try again"
                            })
                        }

                        const updatedFields = {
                            password: newPassword,
                            resetPasswordLink: ""
                        };

                        user = _.extend(user, updatedFields);

                        user.save((err, result) => {
                            if(err) {
                                return res.status(400).json({
                                    error: "Error resetting user password"
                                })
                            }

                            res.json({
                                message: "Congrats! You can now login with new password"
                            })
                        })
                    })
            })
        }
    }
}

export { resetPasswordController };