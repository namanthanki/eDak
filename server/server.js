import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import authRouter from "./routes/auth.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import profileRouter from "./routes/profile.js";
import chatRouter from "./routes/chat.js";
import messageRouter from "./routes/message.js";

import { connectDatabase } from "./config/db.js";

dotenv.config({
    path: "./config/config.env"
});

const app = express();
connectDatabase();

app.use(bodyParser.json());
app.enable("etag");
app.set("etag", "strong");

if(process.env.NODE_ENV === "development") {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }));

    app.use(morgan("dev"));
}

app.use("/api", authRouter);
app.use("/user", profileRouter);
app.use("/user/chat/", chatRouter);
app.use("/user/message", messageRouter)

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page not found"
    })
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}`);
});

const io = require("socket.io")(server, {
    pingTimeout: 5000,
    cors: {
        origin: `http://localhost:3000`
    }
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (user) => {
        socket.join(user._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log(`User Joined Room: ${room}`);
    })

    socket.on("new message", (new_msg_received) => {
        let chat = new_msg_received.chat;
        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach(user => {
            if(user._id == new_msg_received.sender._id) return;
            
            socket.in(user._id).emit("message received", new_msg_received);
        })
    })

    socket.off("setup", () => {
        console.log("User Disconnected");
        socket.leave(user._id);
    })
})