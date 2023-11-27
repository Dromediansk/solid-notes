import { Router } from "express";
import {
  authWithGoogle,
  redirectToGoogleLogin,
  loginFailed,
  logout,
} from "./controllers";

const authRouter = Router();

authRouter.get("/google", redirectToGoogleLogin);
authRouter.get("/google/callback", authWithGoogle);
authRouter.get("/failure", loginFailed);
authRouter.get("/logout", logout);

export default authRouter;
