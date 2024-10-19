import { Sequelize } from "sequelize";
import configDb from "../config/connect_db.js";

const sequelize = new Sequelize({
  database: configDb.database,
  username: configDb.user,
  password: configDb.pass,
  host: configDb.host,
  port: configDb.port,
  dialect: "mysql", // Error: Dialect needs to be explicitly supplied as of v4.0.0 => fix this error when running test
});

export default sequelize;
