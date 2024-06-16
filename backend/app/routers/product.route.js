// var express = require("express");
// var router = express.Router();

var productController = require("../controllers/product.controller");
module.exports = function (app) {
  app.get("/product/list", productController.get_list);
  app.get("/product/detail/:id", productController.detail);
  app.post("/product/create", productController.add);
  app.put("/product/update/:id", productController.update);
  // app.put("/product/delete/:id", productController.delete);
};
