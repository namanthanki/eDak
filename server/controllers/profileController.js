import errorHandler from "../helpers/databaseErrorHandling.js";

import dotenv from "dotenv";
dotenv.config({
  path: "./config/config.env",
});

import User from "../models/User.js";

const profileController = async (req, res) => {
  const { id } = req.params;
  await User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User does not exist, Please Create Account",
      });
    }

    res.send(user);
  });
};

const searchUserController = async (req, res) => {
  const { id } = req.params;
  const keyword = req.query.username
    ? {
        $or: [
          { username: { $regex: req.query.username, $options: "i" } },
          { email: { $regex: req.query.username, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: id } });
  res.send(users);
};

export { profileController, searchUserController };
