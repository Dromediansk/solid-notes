import { PrismaClient } from "@prisma/client";

export const prisma = (() => {
  try {
    const client = new PrismaClient();
    client.$connect();
    return client;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
})();
