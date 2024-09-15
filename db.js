import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost", // địa chỉ host của mysql dưới local
  user: "root", // tên người dùng
  password: "123456",
  database: "node44", // database name
  port: 3307,
});

export default pool;
