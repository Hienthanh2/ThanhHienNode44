import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import {
  CLIENT_ERROR_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../../const.js";

const model = initModels(sequelize);

const getListVideos = async (req, res) => {
  try {
    const videos = await model.video.findAll();

    return res.status(OK_STATUS).json(videos);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: error.message });
  }
};

const getListVideoTypes = async (req, res) => {
  try {
    const videoTypes = await model.video_type.findAll();

    return res.status(OK_STATUS).json(videoTypes);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: error.message });
  }
};

const getVideosByTypeId = async (req, res) => {
  try {
    let { type_id } = req.params;

    let data = await model.video.findAll({
      where: {
        type_id,
      },
    });

    return res.status(OK_STATUS).json(data);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: error.message });
  }
};

const getVideoPage = async (req, res) => {
  try {
    let { page, size } = req.params;

    page = parseInt(page, 10);
    size = parseInt(size, 10);

    if (isNaN(page) || page <= 0) {
      return res.status(CLIENT_ERROR_STATUS).json({ message: "page is wrong" });
    }

    if (isNaN(size) || size <= 0) {
      return res.status(CLIENT_ERROR_STATUS).json({ message: "page is wrong" });
    }

    let index = (page - 1) * size;

    let data = await model.video.findAll({
      offset: index,
      limit: size,
    });

    return res.status(OK_STATUS).json(data);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: error.message });
  }
};

export { getListVideos, getListVideoTypes, getVideosByTypeId, getVideoPage };
