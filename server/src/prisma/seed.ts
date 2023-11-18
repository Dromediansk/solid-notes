import { testNotes } from "./testData";
import { prisma } from "./db";

async function main() {
  testNotes.forEach(async (note) => {
    await prisma.note.create({ data: note });
  });

  // Add more test data

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
