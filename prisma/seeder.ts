import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function run() {
  await prisma.userAuth.create({
    data: {
      userName: "admin",
      password: await bcrypt.hash("admin", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
      
    },
  });
}

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });