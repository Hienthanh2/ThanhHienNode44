import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "node44",
  username: "root",
  password: "123456",
  host: "localhost",
  port: 3307,
  dialect: "mysql",
});

export default sequelize;
