import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "node44_youtube",
  username: "root",
  password: "123456",
  host: "localhost",
  port: 3307,
  dialect: "mysql",
});

export default sequelize;
