import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { INTERNAL_SERVER_ERROR_STATUS, OK_STATUS } from "../../const.js";

const model = initModels(sequelize);

const getListVideos = async (req, res) => {
  try {
    const videos = await model.video.findAll();

    res.status(OK_STATUS).json(videos);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: error.message });
  }
};

export { getListVideos };
