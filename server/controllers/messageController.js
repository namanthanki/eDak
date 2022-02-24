import schedule from "node-schedule";
import dotenv from "dotenv";
dotenv.config({
    path: "./config/config.env"
});

import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

const date = new Date(2022, 1, 22, 15, 45, 0);

const sendMessagesController = async (req, res) => {
    const sender_id = req.params.id;
    const { chat_id, content } = req.body;

    if(!content || !chat_id) {
        console.log("Invalid Data Passed into Request");
        return res.status(400);
    }

    let newMessage = {
        sender: sender_id,
        content: content,
        chat: chat_id
    };

    schedule.scheduleJob(date, async () => {
        try {
            let message = await Message.create(newMessage);
            message = await message.populate("sender", "username userProfileImage").execPopulate();
            message = await message.populate("chat").execPopulate();
            message = await User.populate(message, {
                path: "chat.users",
                select: "username userProfilePicture email"
            });
    
            await Chat.findByIdAndUpdate(req.body.chat_id, {
                latestMessage: message
            });
    
            res.json(message);
        } catch(err) {
            res.status(400);
            throw new Error(err.message);
        }
    });
    // try {
    //     let message = await Message.create(newMessage);
    //     message = await message.populate("sender", "username userProfileImage").execPopulate();
    //     message = await message.populate("chat").execPopulate();
    //     message = await User.populate(message, {
    //         path: "chat.users",
    //         select: "username userProfilePicture email"
    //     });

    //     await Chat.findByIdAndUpdate(req.body.chat_id, {
    //         latestMessage: message
    //     });

    //     res.json(message);
    // } catch(err) {
    //     res.status(400);
    //     throw new Error(err.message);
    // }
}

const getMessagesController = async (req, res) => {
    try {
        const messages = await 
                            Message
                            .find({ chat: req.params.chat_id })
                            .populate("sender", "username userProfilePicture email")
                            .populate("chat")
                            .sort({ updatedAt: -1 });

        res.json(messages);
    } catch(err) {
        res.status(400);
        throw new Error(err.message);
    }
}

const getMessageController = async (req, res) => {
    try {
        const message = await 
                            Message
                            .findOne({ _id: req.params.msg_id })
                            .populate("sender", "username userProfilePicture email")
                            .populate("chat")
        res.json(message);
    } catch(err) {
        res.status(400);
        throw new Error(err.message);
    }

}

export { sendMessagesController, getMessagesController, getMessageController };
