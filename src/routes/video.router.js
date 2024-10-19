import express from "express";
import {
  getListVideos,
  getListVideoTypes,
  getVideosByTypeId,
  getVideoPage,
} from "../controllers/video.controller.js";
import { middlewareToken, middlewareTokenAsyncKey } from "../config/jwt.js";

const videoRoutes = express.Router();
videoRoutes.get("/get-videos", getListVideos);
videoRoutes.get("/get-video-types", middlewareToken, getListVideoTypes);
videoRoutes.get("/get-video-by-type-id/:type_id", getVideosByTypeId);
videoRoutes.get("/get-video-page/:page/:size", getVideoPage);

export default videoRoutes;
