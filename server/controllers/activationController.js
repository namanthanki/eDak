import errorHandler from "../helpers/databaseErrorHandling.js";

import dotenv from "dotenv";
dotenv.config({
    path: "./config/config.env"
});

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const activationController = (req, res) => {
    const { token } = req.body;
    if(token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, 
            (err, decoded) => {
                if(err) {
                    return res.status(401).json({
                        errors: "Expired Token. Try Again"
                    });
                } else {
                    const { 
                        username, 
                        email, 
                        password,
                        bio,
                        gender,
                        dateOfBirth,
                        languages,
                        interests 
                    } = jwt.decode(token);

                    const userProfileImage = `https://avatars.dicebear.com/api/bottts/${username}.svg`;
            
                    const user = new User({
                        userProfileImage,
                        username, 
                        email, 
                        password,
                        bio,
                        gender,
                        dateOfBirth,
                        languages,
                        interests
                    });
            
                    user.save((err, user) => {
                        if(err) {
                            return res.status(401).json({
                                errors: errorHandler(err)
                            });
                        } else {
                            return res.json({
                                success: true,
                                message: user,
                                message: "Sign Up Successful!"
                            });
                        }
                    })
                }
            }
        );
    } else {
        return res.json({
            message: 'Error occured, Please try again'
        });
    }
}

export { activationController };