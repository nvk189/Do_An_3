const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Supp = sequelize.define("supp", {
    sl_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sl_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sl_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sl_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Supp;
};
