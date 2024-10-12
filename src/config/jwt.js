import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// đọc file .env
dotenv.config();

// create function createToken
export const createToken = (data) => {
  return jwt.sign({ payload: data }, process.env.ACCESS_TOKEN_KEY, {
    algorithm: "HS256",
    expiresIn: "10s",
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

const verifyToken = (token) => {
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
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
