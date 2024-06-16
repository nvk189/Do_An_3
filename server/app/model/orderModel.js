const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    // cs_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Order;
};
