import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { AUTH_STRATEGY } from "./types";

export const authWithGoogle = passport.authenticate(AUTH_STRATEGY.Google, {
  failureRedirect: "/failure",
  successRedirect: "/",
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
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};