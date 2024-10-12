import {
  CLIENT_ERROR_STATUS,
  CREATED_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  NOT_FOUND_STATUS,
  OK_STATUS,
} from "../../const.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import transporter from "../config/transporter.js";
import { createRefreshToken, createToken } from "../config/jwt.js";

const model = initModels(sequelize);

export const register = async (req, res) => {
  try {
    const { full_name, email, pass_word } = req.body;
    console.log({ full_name, email, pass_word });

    // check if email existed
    const existUser = await model.users.findOne({ where: { email } });

    if (existUser) {
      return res
        .status(CLIENT_ERROR_STATUS)
        .json({ message: "User email already exist!", data: existUser });
    }

    // create new user
    const newUser = await model.users.create({
      full_name,
      email,
      pass_word: bcrypt.hashSync(pass_word, 10),
    });

    const mailOption = {
      from: "hienthanhh013@gmail.com",
      to: email,
      subject: "Welcome to our service!",
      text: `Hello ${full_name}`,
    };

    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        return res
          .status(INTERNAL_SERVER_ERROR_STATUS)
          .json({ message: "Sending email error!" });
      }

      return res
        .status(OK_STATUS)
        .json({ message: "Register successfully!", data: newUser });
    });

    return res
      .status(OK_STATUS)
      .json({ message: "Register successfully!", data: newUser });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    // Step 1: get email and password from req body
    let { email, pass_word } = req.body;
    // Step 2: Check user by email from db
    let user = await model.users.findOne({
      where: {
        email,
      },
    });
    //    Step 2.1: If the user is not exist => throw 404 user not found error
    if (!user) {
      return res.status(NOT_FOUND_STATUS).json({ message: "User not found!" });
    }
    //    Step 2.2: If the user is exist => check password
    let checkPass = bcrypt.compareSync(pass_word, user.pass_word);
    //      Step 2.2.1: If password is not correct => throw error password is wrong
    if (!checkPass) {
      return res
        .status(CLIENT_ERROR_STATUS)
        .json({ message: "Password is wrong!" });
    }
    //      Step 2.2.2: If password is correct => create access token
    // access token - refresh token

    // 3 params
    // 1. create payload and save to token
    // 2. key to create token
    // 3. setting life time for token and the algorithm to encrypt the token
    let payload = {
      userId: user.user_id,
    };

    let accessToken = createToken(payload);
    // create refresh token and save to db
    let refreshToken = createRefreshToken(payload);

    await model.users.update(
      {
        refresh_token: refreshToken,
      },
      { where: { user_id: user.user_id } }
    );

    // save refresh token into cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true, // Cookie không thể truy cập từ javascript (FE)
      secure: false, // để chạy dưới localhost
      sameSite: "Lax", // đảm bảo cho cookie được gửi trong các domain khác nhau
      maxAge: 7 * 24 * 60 * 60 * 1000, // thời gian tồn tại cookie trong browser 7 days
    });

    return res.status(OK_STATUS).json({
      message: "Login successful",
      data: accessToken,
    });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: error.message });
  }
};

export const loginFacebook = async (req, res) => {
  try {
    // get id, email and name from request
    const { id, email, name } = req.body;
    // check id (app_face_id) in db
    let user = await model.users.findOne({ where: { face_app_id: id } });
    // if not have app_face_id => create new user => create access token => send back to FE
    if (!user) {
      const newUser = {
        full_name: name,
        face_app_id: id,
        email,
      };

      user = await model.users.create(newUser);
    }

    // if have app_face_id => create access token and send back to FE
    let accessToken = createToken({ userId: user.user_id });

    return res.status(OK_STATUS).json({
      message: "Login successful",
      data: accessToken,
    });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: error.message });
  }
};

export const extendToken = async (req, res) => {
  // Lấy refresh token từ cookie request
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401);
  }

  const checkRefreshToken = await model.users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!checkRefreshToken) {
    return res.status(401);
  }

  const newToken = createToken({ userId: checkRefreshToken.user_id });

  return res
    .status(200)
    .json({ message: "extend token successful", data: newToken });
};
