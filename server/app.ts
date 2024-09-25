require("dotenv").config();
import express, { NextFunction, Request, Response } from 'express';
export const app = express();

import cors from 'cors';
import cookieParser from "cookie-parser"

app.use(cors({
    origin: process.env.ORIGIN,
}));

app.use(express.json({limit: "50mb"}));

app.use(cookieParser())

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Test endpoint",
    })
    })

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} is not available`) as any;
    err.status = 404;
    next(err);
});
