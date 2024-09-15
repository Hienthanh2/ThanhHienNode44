import express from "express";
import userRoutes from "./user.router.js";

// Creating root router object
const rootRoutes = express.Router();

rootRoutes.use("/users", userRoutes);

// export root router for index.js
export default rootRoutes;
