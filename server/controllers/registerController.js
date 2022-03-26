import _ from "lodash";

import dotenv from "dotenv";
dotenv.config({
  path: "./config/config.env",
});

import errorHandler from "../helpers/databaseErrorHandling.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

import { validationResult } from "express-validator";

const from_email = process.env.FROM_EMAIL;
const email_pass = process.env.EMAIL_PASS;

const registerController = async (req, res) => {
  const {
    username,
    email,
    password,
    bio,
    userProfileImage,
    gender,
    dateOfBirth,
    location,
    languages,
    interests,
  } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    await User.findOne()
      .or([{ email }, { username }])
      .exec((err, user) => {
        if (user) {
          return res.status(400).json({
            errors: "Email or Username is taken",
          });
        } else {
          const token = jwt.sign(
            {
              username,
              email,
              password,
              userProfileImage,
              bio,
              gender,
              dateOfBirth,
              location,
              languages,
              interests,
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
              expiresIn: "1d",
            }
          );

          const transport = {
            host: "smtp.gmail.com",
            port: 465,
            secure: false,
            ingoreTLS: false,
            service: "Gmail",
            auth: {
              user: from_email,
              pass: email_pass,
            },
          };

          const transporter = nodemailer.createTransport(transport);

          transporter.verify((error, success) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take messages");
            }
          });

          const emailData = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: "Account Activation Link",
            html: `     <div style="
                                width: 100%; 
                                height: 100%; 
                                color: #eeeeee;
                                background-color: #777777;
                                margin: 0 auto;">
                          <h1>Click the link to activate your account</h1>
                          <button 
                            style="
                              border: none;
                              outline: none;
                              font-size: 12px;
                              width: 70px;
                              background-color: #d65a31;
                              color: #eeeeee;
                              padding: 7px;
                              border-radius: 3px;
                              cursor: pointer;
                              transition: all 0.3s ease;
                              box-shadow: 0 3px 1px -2px #222831, 0 2px 2px 0 #222831,
                                0 1px 5px 0 #222831;">
                            <a target="_blank" href=${process.env.CLIENT_URL}/users/activate/${token} style="text-decoration: none; color: #222831">Activate<a/>
                          </button>
                          <hr>
                          <p>This email contains sensitive information</p>
                          <p>${process.env.CLIENT_URL}</p>
                        </div>
                    `,
          };

          transporter.sendMail(emailData, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);

              return res.json({
                message: `Email has been sent to ${email}`,
              });
            }
          });
        }
      });
  }
};

export { registerController };
