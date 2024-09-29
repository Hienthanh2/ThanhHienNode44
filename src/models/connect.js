import { Sequelize } from "sequelize";
import configDb from "../config/connect_db.js";

const sequelize = new Sequelize({
  database: configDb.database,
  username: configDb.user,
  password: configDb.pass,
  host: configDb.host,
  port: configDb.port,
  dialect: configDb.dialect,
});

export default sequelize;
