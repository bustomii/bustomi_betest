const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
import verifyToken from "../middleware/verifyJWT";
import prisma from "../../prisma/client";

router.all('/', (req:Request, res:Response) => {
        const connection = prisma.$connect();
        res.status(200).send({
            message: "Welcome to the API",
            status: 200,
            connection: connection,
        });
    }
);

router.post("/users", verifyToken,  (req:Request, res:Response) => {
    res.status(200).send({
        message: "Welcome to the videos",
        status: 200,
    });
});

export default router;