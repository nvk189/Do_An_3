const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Cart;
};
