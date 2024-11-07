import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { UserDataClass } from "../../class/userData";
import Redis from 'ioredis';

// create user data
const redis = new Redis({ host: 'localhost', port: 6379 });

export const CreateUserData = async (req: Request, res: Response) => {
    try {
        const { userName, accountNumber, emailAddress, identityNumber } = req.body;
        if (!(userName && accountNumber && emailAddress && identityNumber)) {
            return res.status(400).send("All input is required");
        }

        const thisClass = new UserDataClass(userName, accountNumber, emailAddress, identityNumber, req.body.user.id);
        const data = await thisClass.create().then((data) => data);

        // reset cache
        await redis.del('userData' + req.body.user.id);

        return res.status(200).send({
            status: true,
            message: "Data created",
            data: data,
        });
    } catch (err:any) {
        return res.status(500).send({
            status: false, 
            message: err?.meta?.cause ?? 'Internal server error',
        });
    }
}

// update user data
export const UpdateUserData = async (req: Request, res: Response) => {
    try {
        const { userName, accountNumber, emailAddress, identityNumber } = req.body;
        if (!(userName && accountNumber && emailAddress && identityNumber)) {
            return res.status(400).send("All input is required");
        }

       const data = await prisma.userData.update({
            where: {
                userName: userName,
            },
            data: {
                accountNumber: accountNumber,
                emailAddress: emailAddress,
                identityNumber: identityNumber,
            }
        });

        // reset cache
        await redis.del('userData' + req.body.user.id);

        return res.status(200).send({
            status: true,
            message: "Data updated",
            data : data,
        });
    } catch (err:any) {
        return res.status(500).send({
            status: false,
            message: err?.meta?.cause ?? 'Internal server error',
        });
    }
}

// delete user data
export const DeleteUserData = async (req: Request, res: Response) => {
    try {
        const { userName } = req.body;
        if (!userName) {
            return res.status(400).send("All input is required");
        }

        await prisma.userData.delete({
            where: {
                userName: userName,
            }
        });

        // reset cache
        await redis.del('userData' + req.body.user.id);

        return res.status(200).send({
            status: true,
            message: "Data deleted",
        });
    } catch (err:any) {
        return res.status(500).send({
            status: false,
            message: err?.meta?.cause ?? 'Internal server error',
        });
    }
}


// get user data
export const GetAllUserData = async (req: Request, res: Response) => {
    try {
        const cache = await redis.get('userData' + req.body.user.id);
        if (cache) {
            return res.status(200).send({
                status: true,
                message: "Data fetched",
                data: JSON.parse(cache),
                statusCache: 'hit',
            });
        }

        const data = await prisma.userData.findMany();
        await redis.set('userData' + req.body.user.id, JSON.stringify(data), 'EX', 60);

        return res.status(200).send({
            status: true,
            message: "Data fetched",
            data: data,
            statusCache: 'miss',
        });
    } catch (err:any) {
        return res.status(500).send({
            status: false,
            message: err?.meta?.cause ?? 'Internal server error',
        });
    }
}