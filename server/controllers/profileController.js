import errorHandler from "../helpers/databaseErrorHandling.js";

import dotenv from "dotenv";
dotenv.config({
  path: "./config/config.env",
});

import User from "../models/User.js";
import Chat from "../models/Chat.js";

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

const updateUserInterests = async(req, res) => {
  const { id } = req.params;
  const { interests } = req.body;

  await User
    .findOneAndUpdate({ _id: id }, { $set: { interests: interests }}, { returnOriginal: false }, 
      (err, response) => {
        if(err) {
          console.log(err);
        } else {
          res.json(response);
        }
      }
    );
}

const updateUserLanguages = async(req, res) => {
  const { id } = req.params;
  const { languages } = req.body;

  await User
    .findOneAndUpdate({ _id: id }, { $set: { languages: languages }}, { returnOriginal: false }, 
      (err, response) => {
        if(err) {
          console.log(err);
        } else {
          res.json(response);
        }
      }
    );
}

const updateUserBio = async(req, res) => {
  const { id } = req.params;
  const { bio } = req.body;

  await User
    .findOneAndUpdate({ _id: id }, { $set: { bio: bio }}, { returnOriginal: false }, 
      (err, response) => {
        if(err) {
          console.log(err);
        } else {
          res.json(response);
        }
      }
    );
}

const deleteFriendChat = async(req, res) => {
  const { chat_id } = req.body;

  await Chat
  .findOneAndDelete({ _id: chat_id }, 
    (err, response) => {
      if(err) {
        console.log(err);
      } else {
        res.json(response);
      }
    }
  );  
}

export { profileController, searchUserController, updateUserInterests, updateUserLanguages, updateUserBio, deleteFriendChat };
