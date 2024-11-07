const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
import verifyToken from "../middleware/verifyJWT";
import { GenerateToken } from "../controllers/generateToken";
import { CreateUserData } from "../controllers/userData";

router.all('/', (req:Request, res:Response) => {
        res.status(200).send({
            message: "Welcome to the API",
            status: 200,
        });
    }
);

router.post("/auth", GenerateToken);
router.post("/user/create", verifyToken, CreateUserData);
router.put("/user/update", verifyToken, CreateUserData);

export default router;