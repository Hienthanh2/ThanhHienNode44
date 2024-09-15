import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/:id/:username", createUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
