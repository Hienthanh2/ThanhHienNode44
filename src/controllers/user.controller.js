import {
  CLIENT_ERROR_STATUS,
  CREATED_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  NOT_FOUND_STATUS,
  OK_STATUS,
} from "../../const.js";

import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize"; // operator: LIKE, AND, IN, OR
import { PrismaClient } from "@prisma/client";

const model = initModels(sequelize);
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  // const params = req.params;
  // const body = req.body;

  // const { id, username } = params;

  // res.send({ id, username });

  // get data from request body
  try {
    const { full_name, email, pass_word } = req.body;

    // let newUser = await model.users.create({
    //   full_name,
    //   email,
    //   pass_word,
    // });

    const newUser = await prisma.users.create({
      data: {
        full_name,
        email,
        pass_word,
      },
    });

    return res
      .status(CREATED_STATUS)
      .json({ message: "created successful", data: newUser });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: "error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // const [data, additionalInfo] = await pool.query("SELECT * FROM users");
    // res.status(OK_STATUS).json({ data, additionalInfo });

    const { full_name = "" } = req.query;

    // Get users using ORM
    let data = await model.users.findAll({
      where: {
        full_name: {
          [Op.like]: `%${full_name}%`,
        },
      },
      attributes: ["full_name"],
      // join table
      include: [
        {
          model: model.video, // chọn model muốn join
          as: "videos",
          attributes: ["video_name", "user_id"], // chỉ định những columns nào sẽ hiện thị
          required: true, // default sẽ dùng left join -> dùng inner join xài required: true
          include: [
            {
              model: model.video_comment,
              as: "video_comments",
            },
          ],
        },
      ],
    });
    return res.status(OK_STATUS).json(data);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await prisma.users.findFirst({
      where: { user_id: Number(user_id) },
    });

    if (!user) {
      return res.status(NOT_FOUND_STATUS).json({ message: "User not found!" });
    }

    const deleteInfo = await prisma.users.delete({
      where: { user_id: Number(user_id) },
    });

    return res
      .status(OK_STATUS)
      .json({ message: "User deleted successfully!", data: deleteInfo });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: err });
  }
};

const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { full_name, pass_word } = req.body;

    // check user có tồn tại trong database hay không
    // let user = await model.users.findByPk(user_id);
    const user = await prisma.users.findFirst({
      where: {
        user_id: Number(user_id),
      },
    });
    if (!user) {
      return res.status(NOT_FOUND_STATUS).json({ message: "User not found!" });
    }

    // C1: use update method
    const data = await prisma.users.update({
      data: { full_name, pass_word },
      where: { user_id: Number(user_id) },
    });

    return res.status(OK_STATUS).json({
      data,
    });
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: err.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const { user_id } = req.body;
    const file = req.file;

    const user = await prisma.users.findFirst({
      where: { user_id: Number(user_id) },
    });

    if (!user) {
      return res
        .status(CLIENT_ERROR_STATUS)
        .json({ message: "User not found!" });
    }

    // update column avatar in table users
    const avatarPath = `/public/imgs/${file.filename}`;
    await prisma.users.update({
      data: {
        avatar: avatarPath,
      },
      where: {
        user_id: Number(user_id),
      },
    });

    return res
      .status(200)
      .json({ message: "Upload avatar successfully!", data: avatarPath });
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: err.message });
  }
};

export { createUser, getAllUsers, deleteUser, updateUser, uploadAvatar };
