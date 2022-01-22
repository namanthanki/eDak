import dotenv from "dotenv";
dotenv.config({
    path: "./config/config.env"
});

import Chat from "../models/Chat.js";
import User from "../models/User.js";

const createChatController = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    if(!userId) {
        console.log("Invalid User");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        $and: [
            {users: {$elemMatch: {$eq: id}}},
            {users: {$elemMatch: {$eq: userId}}}
        ]
    })
    .populate("users", "-hashed_password -resetPasswordLink -salt")
    .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username userProfileImage email",
    });

    if(isChat.length > 0 ) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            users: [id, userId]
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await 
                                Chat.findOne({ _id: createdChat._id })
                                .populate("users", "-hashed_password -resetPasswordLink");

            res.status(200).send(FullChat);
        } catch(err) {
            throw new Error(err.message);
        }
    }
}

const fetchChatController = async (req, res) => {
    const id = req.params.id;
    try {
        Chat.find({ users: {$elemMatch: {$eq: id }}})
            .populate("users", "-hashed_password -resetPasswordLink -salt")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "username userProfileImage email",
                });

                res.status(200).send(results);
            });
    } catch(err) {
        res.status(400);
        throw new Error(err.message);
    }
}

export { createChatController, fetchChatController };