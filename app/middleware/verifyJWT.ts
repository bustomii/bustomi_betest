const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/client";

const config = process.env;

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token:string = req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
        status: false,
        message: "A token is required for authentication",
    });
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY!);
    const user = await prisma.userAuth.findUnique({ where: { id: decoded.user } });
    req.body.user = user;
    
  } catch (err) {
    return res.status(401).send({
        status: false,
        message: "Invalid Token",
    });
  }
  
  return next();
};

export default verifyToken;