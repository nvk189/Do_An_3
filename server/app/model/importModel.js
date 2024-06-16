const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Import = sequelize.define("import", {
    // sl_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    pp_start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pp_amonut: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pp_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Import;
};
