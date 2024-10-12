import express from "express";
import {
  login,
  loginFacebook,
  register,
  extendToken,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/login-face", loginFacebook);
authRouter.post("/extend-token", extendToken);

export default authRouter;
