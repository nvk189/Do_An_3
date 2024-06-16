const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define("orderDetail", {
    // pr_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    od_quanlity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    od_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return OrderDetail;
};
