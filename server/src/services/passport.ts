import { NextFunction, Request, Response } from "express";
import passport from "passport";
import {
  StrategyOptions,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { prisma } from "../prisma/db";
import { User } from "@prisma/client";

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  throw new Error(
    "Environemnt variables CLIENT_ID or CLIENT_SERVER are missing!"
  );
}

export const AUTH_OPTIONS: StrategyOptions = {
  callbackURL: "/auth/google/callback",
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

/**
 * Wrapping up authorisation process:
 * Here we can verify credentials or user profile data with our db, etc.
 */
export const verifyCallback = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) => {
  const user = await prisma.user.upsert({
    where: {
      googleId: profile.id,
      email: profile.emails ? profile.emails[0].value : "",
    },
    update: {},
    create: {
      googleId: profile.id,
      firstName: profile.name?.givenName || "",
      lastName: profile.name?.familyName || "",
      email: profile.emails ? profile.emails[0].value : "",
    },
  });

  return done(null, user);
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: User, done) => {
  done(null, user);
});

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isLoggedIn = req.isAuthenticated() && req.user

  if (!isLoggedIn) {
    return res.status(401).json({
      message: "You must be logged in!",
    });
  }
  next();
};
