const { Model, DataTypes } = require("sequelize");
const db = require("../../config/conn");

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Insira o nome do produto"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3, 450],
        notNull: {
          msg: "Coloque uma descrição para seu produto de 3 a 450 caracteres!"
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: "Products",
    timestamps: true
  }
);

module.exports = Product;
