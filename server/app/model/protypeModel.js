const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Protype = sequelize.define("protype", {
    pt_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pt_status: {
      type: DataTypes.BOOLEAN,
    },
  });
  return Protype;
};
