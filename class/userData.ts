import prisma from "../prisma/client";

export class UserData {
    private id: string;
    private userName: string;
    private accountNumber: string;
    private emailAddress: string;
    private identityNumber: string;
    
    constructor(id: string, userName: string, accountNumber: string, emailAddress: string, identityNumber: string) {
        this.id = id;
        this.userName = userName;
        this.accountNumber = accountNumber;
        this.emailAddress = emailAddress;
        this.identityNumber = identityNumber;
    }

    // crud
    public async create(): Promise<void> {
        // create
        await prisma.userData.create({
            data: {
                userName: this.userName,
                accountNumber: this.accountNumber,
                emailAddress: this.emailAddress,
                identityNumber: this.identityNumber
            }
        });
    }

    public async read(): Promise<void> {
        // read
        await prisma.userData.findUnique({
            where: {
                id: this.id
            }
        });
    }

    public async update(): Promise<void> {
        // update
        await prisma.userData.update({
            where: {
                id: this.id
            },
            data: {
                userName: this.userName,
                accountNumber: this.accountNumber,
                emailAddress: this.emailAddress,
                identityNumber: this.identityNumber
            }
        });
    }

    public async delete(): Promise<void> {
        // delete
        await prisma.userData.delete({
            where: {
                id: this.id
            }
        });
    }


}