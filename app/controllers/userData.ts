import { Request, Response } from "express";
import prisma from "../../prisma/client";

// crud userData
export const CreateUserData = async (req: Request, res: Response) => {
    try {
        const { userName, accountNumber, emailAddress, identityNumber } = req.body;
        if (!(userName && accountNumber && emailAddress && identityNumber)) {
            res.status(400).send("All input is required");
        }

        await prisma.userData.create({
            data: {
                userName: userName,
                accountNumber: accountNumber,
                emailAddress: emailAddress,
                identityNumber: identityNumber,
                createdBy: {
                    connect: {
                        id: req.body.user.id,
                    },
                },
            }
        });
        res.status(200).send({
            status: true,
            message: "Data created",
        });
    } catch (err) {
        res.status(500).send(err);
    }
}