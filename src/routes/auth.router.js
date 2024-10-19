import express from "express";
import {
  login,
  loginFacebook,
  register,
  extendToken,
  loginAsyncKey,
  extendTokenAsyncKey,
  forgotPass,
  changePassword,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login); // login bằng khoá đối xứng
authRouter.post("/login-face", loginFacebook);
authRouter.post("/extend-token", extendToken);
authRouter.post("/extend-token-async-key", extendTokenAsyncKey);
authRouter.post("/login-async-key", loginAsyncKey); // login bằng khoá bất đối xứng
authRouter.post("/forgot-password", forgotPass);
authRouter.post("/change-password", changePassword);

export default authRouter;
