import authRouter from "./routes/auth.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import profileRouter from "./routes/profile.js";

import { connectDatabase } from "./config/db.js";

dotenv.config({
    path: "./config/config.env"
});

const app = express();
connectDatabase();

app.use(bodyParser.json());

if(process.env.NODE_ENV === "development") {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }));

    app.use(morgan("dev"));
}

app.use("/api", authRouter);
app.use("/user", profileRouter);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page not found"
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}`);
});