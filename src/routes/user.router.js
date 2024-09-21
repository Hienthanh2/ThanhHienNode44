import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/create-user", createUser);
userRoutes.delete("/:user_id", deleteUser);
userRoutes.put("/update-user/:user_id", updateUser);

export default userRoutes;
