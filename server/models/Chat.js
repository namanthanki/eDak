import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatName: { 
        type: String,
        trim: true 
    },
    latestMessage: {    
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;