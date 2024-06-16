const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connection ...");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

const db = {};
db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.customer = require("./customerModel.js")(sequelize, DataTypes);
db.product = require("./productModel.js")(sequelize, DataTypes);
db.protype = require("./protypeModel.js")(sequelize, DataTypes);
db.supp = require("./suppModel.js")(sequelize, DataTypes);

db.category = require("./categoryModel.js")(sequelize, DataTypes);
db.order = require("./orderModel.js")(sequelize, DataTypes);
db.orderDetail = require("./orderDetailModel.js")(sequelize, DataTypes);
db.import = require("./importModel.js")(sequelize, DataTypes);
db.importDetail = require("./importDetailModel.js")(sequelize, DataTypes);
db.use = require("./useModel.js")(sequelize, DataTypes);
db.cart = require("./cartModel.js")(sequelize, DataTypes);

// bảng review product
// db.review = require("./reviewModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes");
});

// tạo các mối liên hệ giữa các bảng
db.customer.hasMany(db.cart, {
  foreignKey: "cus_id",
  as: "cartcus",
});
db.product.hasMany(db.cart, {
  foreignKey: "pr_id",
  as: "cartproduct",
});
db.order.hasMany(db.orderDetail, {
  foreignKey: "order_id",
  as: "orderdetail",
});
db.customer.hasMany(db.order, {
  foreignKey: "cus_id",
  as: "cusorder",
});
db.product.hasOne(db.category, {
  foreignKey: "pr_id",
  as: "category",
});
db.protype.hasMany(db.product, {
  foreignKey: "pt_id",
  as: "producttype",
});
db.product.hasMany(db.orderDetail, {
  foreignKey: "pr_id",
  as: "productorder",
});
db.orderDetail.belongsTo(db.product, {
  foreignKey: "pr_id",
  as: "detailproduct",
});

db.product.hasMany(db.importDetail, {
  foreignKey: "pr_id",
  as: "productimport",
});
db.importDetail.belongsTo(db.product, {
  foreignKey: "pr_id",
  as: "importproduct",
});
db.import.hasMany(db.importDetail, {
  foreignKey: "pp_id",
  as: "importdetail",
});
db.supp.hasMany(db.import, {
  foreignKey: "sl_id",
  as: "supp",
});

db.customer.hasOne(db.use, {
  foreignKey: "cus_id",
  as: "customer",
});
db.use.belongsTo(db.customer, {
  foreignKey: "cus_id",
  as: "usecus",
});

module.exports = db;
module.exports.sequelize = sequelize;
