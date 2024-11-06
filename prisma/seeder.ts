import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  await prisma.userAuth.create({
    data: {
        userName: "admin",
        password: await bcrypt.hash("admin", 10),
    }});
}

const run = async () => {
    await main();
  };

run()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });