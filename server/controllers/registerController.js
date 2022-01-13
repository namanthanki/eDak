import _ from "lodash";

import dotenv from "dotenv";
dotenv.config({
    path: "./config/config.env"
});

import errorHandler from "../helpers/databaseErrorHandling.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

import { validationResult } from "express-validator";

const from_email = process.env.FROM_EMAIL;
const email_pass = process.env.EMAIL_PASS;

const registerController = (req, res) => {

    const { 
        username,
        email,
        password,
        bio,
        gender,
        dateOfBirth,
        languages,
        interests
    } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            errors: firstError
        });
    } else {
        User.findOne({
            email
        }).exec((err, user) => {
            if (user) {
                return res.status(400).json({
                    errors: 'Email is taken'
                });
            }
        });

        const token = jwt.sign(
            {
                username,
                email,
                password,
                bio,
                gender,
                dateOfBirth,
                languages,
                interests
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
                expiresIn: '1d'
            }
        );

        const transport = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: false,
            ingoreTLS: false,
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
            }
        });

        const emailData = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: 'Account Activation Link',
            html:
                `
                <h1>Click the link to activate your account</h1>
                <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                <hr>
                <p>This email contains sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        };

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
};

export { registerController };