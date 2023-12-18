import RedisStore from "connect-redis";
import { createClient } from "redis";
import expressSession from "express-session";

if (!process.env.SESSION_SECRET) {
  throw new Error("Environment variable secret is missing!");
}

export const redisClient = createClient();

export const redisStore = new RedisStore({
  client: redisClient,
  prefix: "solid-notes:",
});

export const session = expressSession({
  store: redisStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 86400000 }, // 1 day
});
