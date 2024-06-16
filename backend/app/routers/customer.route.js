var customerController = require("../controllers/customer.controller");
module.exports = function (app) {
  app.get("/cus/list", customerController.get_list);
  app.get("/cus/detail/:id", customerController.detail);
  app.post("/cus/create", customerController.add);
  app.put("/cus/update/:id", customerController.update);
};
