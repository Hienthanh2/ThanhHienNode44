import express from "express";
import userRoutes from "./user.router.js";
import videoRoutes from "./video.router.js";
import authRouter from "./auth.router.js";

// Creating root router object
const rootRoutes = express.Router();

rootRoutes.use("/users", userRoutes);
rootRoutes.use("/videos", videoRoutes);
rootRoutes.use("/auth", authRouter);

// export root router for index.js
export default rootRoutes;
