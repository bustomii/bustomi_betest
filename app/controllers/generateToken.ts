import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/client";
const jwt = require("jsonwebtoken");

export const GenerateToken = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
          res.status(400).send("All input is required");
        }

        const user = await prisma.userAuth.findUnique({ where: { userName:username } });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          const generateToken:string = jwt.sign(
            { user: user.id, username: user.userName },
            process.env.TOKEN_KEY!,
            {
              expiresIn: "1d",
            }
          );
    
          res.status(200).json({
            status: true,
            message: "Login success",
            data: {
              token: generateToken,
              user: {
                id: user.id,
                username: user.userName
              },
            },
          });
        }

        res.status(200).send({
            status: false,
            message: "Invalid credentials",
        });
      } catch (err) {
        res.status(500).send(err);
      }
};