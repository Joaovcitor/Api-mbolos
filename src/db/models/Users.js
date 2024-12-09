const { Model, DataTypes } = require("sequelize");
const db = require("../../config/conn");

class Users extends Model {}

Users.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("comum", "adm"),
      allowNull: false,
      defaultValue: "comum"
    }
  },
  {
    sequelize: db,
    modelName: "Users",
    timestamps: true
  }
);

module.exports = Users;
