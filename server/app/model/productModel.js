const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    // pt_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    pr_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pr_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pr_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pr_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pr_sales: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Product;
};
