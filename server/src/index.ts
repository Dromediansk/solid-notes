import http from "http";
import app from "./app";
import { prisma } from "./prisma/db";
import { redisClient } from "./services/redis";

const server = http.createServer(app);
const port = process.env.PORT;

const checkDbConnection = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};

const checkRedisConnection = async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected");
  } catch (error) {
    console.error("Redis connection failed", error);
  }
};

// Start the server and check for database connection
server.listen(port, async () => {
  await checkDbConnection();
  await checkRedisConnection();
  console.log(`Server is running on http://localhost:${port}`);
});
