import { Router } from "express";
import {
  authWithGoogle,
  redirectToGoogleLogin,
  loginFailed,
  logout,
  getAuthStatus,
} from "./controllers";

const authRouter = Router();

authRouter.get("/google", redirectToGoogleLogin);
authRouter.get("/google/callback", authWithGoogle);
authRouter.get("/failure", loginFailed);
authRouter.get("/logout", logout);
authRouter.get("/status", getAuthStatus);

export default authRouter;
