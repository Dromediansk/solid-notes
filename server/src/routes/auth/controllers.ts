import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { AUTH_STRATEGY } from "./types";
import { User } from "@prisma/client";

type UserForClient = Pick<
  User,
  "id" | "firstName" | "lastName" | "email"
> | null;

export const authWithGoogle = passport.authenticate(AUTH_STRATEGY.Google, {
  failureRedirect: "/failure",
  successRedirect: `${process.env.CLIENT_ORIGIN}/`,
});

export const handleGoogleCallbackSuccess = (req: Request, res: Response) => {
  res.status(200).json({ message: "Login successful!" });
};

export const loginFailed = (req: Request, res: Response) => {
  res.send("Failed to log in!");
};

export const redirectToGoogleLogin = passport.authenticate(
  AUTH_STRATEGY.Google,
  { scope: ["profile", "email"] }
);

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("connect.sid");
  req.logout((err) => {
    console.log(err);
    req.session.destroy(() => {
      res.redirect(`${process.env.CLIENT_ORIGIN}/login`);
    });
  });
};

export const getAuthStatus = async (req: Request, res: Response) => {
  try {
    const isLoggedIn = req.user && req.isAuthenticated();
    const user: UserForClient = req.user
      ? {
          id: req.user.id,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
        }
      : null;
    res.status(200).json({ isAuthenticated: isLoggedIn, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to check auth status" });
  }
};
