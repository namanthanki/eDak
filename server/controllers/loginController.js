import _ from "lodash";

import dotenv from "dotenv";
dotenv.config({
    path: "./config/config.env"
});

import jwt from "jsonwebtoken";
import User from "../models/User.js";

import { validationResult } from "express-validator";

const loginController = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        User
            .findOne({ email })
            .exec((err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'User does not exist, Please Create Account'
                    });
                }
                
                if (!user.authenticate(password)) {
                    return res.status(400).json({
                        error: 'User does not exist, Please Create Account'
                    });
                }

                const token = jwt.sign(
                    {
                        _id: user._id
                    },
                        process.env.JWT_SECRET
                     ,
                    {
                        expiresIn: '7d'
                    }
                );
                
                const { _id, email } = user;

                return res.json({
                    token,
                    user: {
                        _id,
                        email
                    }
                });
            });
    }
};

export { loginController };