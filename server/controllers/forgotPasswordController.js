import _ from "lodash";

import dotenv from "dotenv";
dotenv.config({
    path: "./config/config.env"
});

import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

import { validationResult } from "express-validator";

const from_email = process.env.FROM_EMAIL;
const email_pass = process.env.EMAIL_PASS;

const forgotPasswordController = (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        User
            .findOne({ email }, (err, user) => {
                if(err || !user) {
                    return res.status(400).json({
                        error: "User with this Email Address does not exist"
                    });
                }

                const token = jwt
                .sign(
                    {
                        _id: user._id
                    }, 
                        process.env.JWT_RESET_PASSWORD
                     , 
                    {
                        expiresIn: "10m"
                    } 
                );

                const transport = { 
                    service: "Gmail",
                    auth: {
                        user: from_email,
                        pass: email_pass
                    }
                };
        
                const transporter = nodemailer.createTransport(transport);
        
                transporter.verify((error, success) => {
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Server is ready to take messages');
                }});
        
                const emailData = {
                    from: process.env.FROM_EMAIL,
                    to: email,
                    subject: 'Password Reset Link',
                    html: 
                    `
                        <h1>Click the link to reset your password</h1>
                        <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                        <hr>
                        <p>This email contains sensitive information</p>
                        <p>${process.env.CLIENT_URL}</p>
                    `
                };

                return user.updateOne({
                    resetPasswordLink: token
                }, (err, success) => {
                    if(err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    } else {
                        transporter.sendMail(emailData, function (error, info) {
                            if (error) {
                            console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                        
                                return res.json({
                                    message: `Email has been sent to ${email}`,
                                });
                            }
                        });
                    }
                })
            });
    }
};

export { forgotPasswordController };