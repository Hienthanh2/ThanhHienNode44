import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";

const privateAccessTokenKey = fs.readFileSync("access_token.private.key");
const publicAccessTokenKey = fs.readFileSync("access_token.public.key");

const privateRefreshTokenKey = fs.readFileSync("refresh_token.private.key");
const publicRefreshTokenKey = fs.readFileSync("refresh_token.public.key");

// đọc file .env
dotenv.config();

// create function createToken
export const createToken = (data) => {
  return jwt.sign({ payload: data }, process.env.ACCESS_TOKEN_KEY, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
};

export const createTokenAsyncKey = (data) => {
  return jwt.sign({ payload: data }, privateAccessTokenKey, {
    algorithm: "RS256",
    expiresIn: "1d",
  });
};

// create token middleware
export const middlewareToken = (req, res, next) => {
  let { token } = req.headers;
  let checkToken = verifyToken(token);

  if (checkToken) {
    // if token is verified => pass to router
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const middlewareTokenAsyncKey = (req, res, next) => {
  let { token } = req.headers;
  let checkToken = verifyTokenAsyncKey(token);

  console.log("token: ", token);
  console.log("check token?: ", checkToken);

  if (checkToken) {
    // if token is verified => pass to router
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const verifyToken = (token) => {
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    return true;
  } catch (err) {
    // cannot verify token
    return false;
  }
};

export const verifyTokenAsyncKey = (token) => {
  try {
    jwt.verify(token, publicAccessTokenKey);
    return true;
  } catch (err) {
    // cannot verify token
    return false;
  }
};

export const createRefreshToken = (data) => {
  return jwt.sign({ payload: data }, process.env.REFRESH_TOKEN_KEY, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
};

export const createAsyncRefreshToken = (data) => {
  return jwt.sign({ payload: data }, privateRefreshTokenKey, {
    algorithm: "RS256",
    expiresIn: "7d",
  });
};
