import express from "express";
import { getListVideos } from "../controllers/video.controller.js";

const videoRoutes = express.Router();
videoRoutes.get("/get-videos", getListVideos);

export default videoRoutes;
