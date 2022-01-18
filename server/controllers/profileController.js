import errorHandler from "../helpers/databaseErrorHandling.js";

import dotenv from "dotenv";
dotenv.config({
    path: "./config/config.env"
});

import User from "../models/User.js";

const profileController = async (req, res) => {
    const { id } = req.params;
    await User
        .findById(id)
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'User does not exist, Please Create Account'
                });
            }

            const { userProfileImage } = user;

            return res.json({
                user: { userProfileImage }
            })
        });
}

export { profileController };