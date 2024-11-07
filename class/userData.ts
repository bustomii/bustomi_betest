import prisma from "../prisma/client";

export class UserDataClass {
    private userName: string;
    private accountNumber: string;
    private emailAddress: string;
    private identityNumber: string;
    
    constructor( userName: string, accountNumber: string, emailAddress: string, identityNumber: string) {
        this.userName = userName;
        this.accountNumber = accountNumber;
        this.emailAddress = emailAddress;
        this.identityNumber = identityNumber;
    }

    // // crud
    public async create(): Promise<void> {
        // create
        const data = await prisma.userData.create({
            data: {
                userName: this.userName,
                accountNumber: this.accountNumber,
                emailAddress: this.emailAddress,
                identityNumber: this.identityNumber
            }
        });

        Promise.resolve(data);
    }

    public async read(): Promise<void> {
        // read
        const data = await prisma.userData.findUnique({
            where: {
                userName: this.userName
            }
        });

        Promise.resolve(data);
    }

    public async update(): Promise<void> {
        // update
        const data = await prisma.userData.update({
            where: {
                userName: this.userName
            },
            data: {
                userName: this.userName,
                accountNumber: this.accountNumber,
                emailAddress: this.emailAddress,
                identityNumber: this.identityNumber
            }
        });

        Promise.resolve(data);

    }

    public async delete(): Promise<void> {
        // delete
        await prisma.userData.delete({
            where: {
                userName: this.userName
            }
        });
    }

    public async getAll(): Promise<void> {
        // get all
        const data = await prisma.userData.findMany();

        Promise.resolve(data);
    }

}