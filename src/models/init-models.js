import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _employees from  "./employees.js";
import _user_like from  "./user_like.js";
import _users from  "./users.js";
import _videos from  "./videos.js";

export default function initModels(sequelize) {
  const employees = _employees.init(sequelize, DataTypes);
  const user_like = _user_like.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);
  const videos = _videos.init(sequelize, DataTypes);

  user_like.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_like, { as: "user_likes", foreignKey: "user_id"});
  user_like.belongsTo(videos, { as: "video", foreignKey: "video_id"});
  videos.hasMany(user_like, { as: "user_likes", foreignKey: "video_id"});

  return {
    employees,
    user_like,
    users,
    videos,
  };
}
