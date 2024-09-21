import express from "express";
import userRoutes from "./user.router.js";
import videoRoutes from "./video.router.js";

// Creating root router object
const rootRoutes = express.Router();

rootRoutes.use("/users", userRoutes);
rootRoutes.use("/videos", videoRoutes);

// export root router for index.js
export default rootRoutes;
