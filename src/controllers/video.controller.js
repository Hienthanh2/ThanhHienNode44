import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import {
  CLIENT_ERROR_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../../const.js";
import { PrismaClient } from "@prisma/client";

const model = initModels(sequelize); // sequelize
const prisma = new PrismaClient(); // prisma

const getListVideos = async (req, res) => {
  try {
    // const videos = await model.video.findAll();
    const videos = await prisma.video.findMany();

    return res.status(OK_STATUS).json(videos);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: error.message });
  }
};

const getListVideoTypes = async (req, res) => {
  try {
    // const videoTypes = await model.video_type.findAll();
    const videoTypes = await prisma.video.findMany();

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

    // let data = await model.video.findAll({
    //   where: {
    //     type_id,
    //   },
    // });

    const data = await prisma.video.findMany({
      where: {
        type_id: Number(type_id), // Với prisma, phải truyền đúng kiểu dữ liệu
      },
      include: {
        users: {
          select: {
            full_name: true,
            email: true,
          },
        },
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

    // let data = await model.video.findAll({
    //   offset: index,
    //   limit: size,
    // });

    const data = await prisma.video.findMany({
      skip: index,
      take: size,
    });

    return res.status(OK_STATUS).json(data);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: error.message });
  }
};

export { getListVideos, getListVideoTypes, getVideosByTypeId, getVideoPage };
