import { testNotes, testUsers } from "./testData";
import { prisma } from "./db";

async function main() {
  testUsers.forEach(async (user) => {
    await prisma.user.create({ data: user });
  });

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
