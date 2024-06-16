const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("category", {
    // pr_id: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    ct_des1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ct_des1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Category;
};
