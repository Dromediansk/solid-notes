import { PrismaClient } from "@prisma/client";
import { testNotes } from "./testData";

const prisma = new PrismaClient();

async function main() {
  testNotes.forEach(async (note) => {
    await prisma.note.create({ data: note });
  });
  console.log("Data added successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
