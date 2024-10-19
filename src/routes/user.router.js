import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  uploadAvatar,
} from "../controllers/user.controller.js";
import { upload } from "../config/upload.js";
import { uploadCloud } from "../config/uploadCloud.js";

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/create-user", createUser);
userRoutes.delete("/:user_id", deleteUser);
userRoutes.put("/update-user/:user_id", updateUser);
userRoutes.post("/upload-avatar", upload.single("image"), uploadAvatar);
userRoutes.post(
  "/upload-avatar-cloud",
  uploadCloud.single("image"),
  (req, res) => {
    try {
      const file = req.file;

      return res.status(200).json(file);
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export default userRoutes;
