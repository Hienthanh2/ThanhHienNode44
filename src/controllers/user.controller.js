import { INTERNAL_SERVER_ERROR_STATUS, OK_STATUS } from "../../const.js";
import pool from "../../db.js";

const createUser = (req, res) => {
  const params = req.params;
  const body = req.body;

  const { id, username } = params;

  res.send({ id, username });
};

const getAllUsers = async (req, res) => {
  try {
    const [data, additionalInfo] = await pool.query("SELECT * FROM users");

    res.status(OK_STATUS).json({ data, additionalInfo });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("START TRANSACTION");
    await pool.query(`
        DELETE FROM user_like
        WHERE user_id = ${id};
      `);
    await pool.query(`
        DELETE FROM users
        WHERE user_id = ${id};
      `);
    await pool.query("COMMIT");
    await pool.query("ROLLBACK");

    res
      .status(OK_STATUS)
      .json({ message: `User with ID ${id} deleted successfully` });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: err });
  }
};

export { createUser, getAllUsers, deleteUser };
