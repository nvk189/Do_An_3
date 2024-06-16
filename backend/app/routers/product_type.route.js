var protype = require("../controllers/product_type.controller");
module.exports = function (app) {
  app.get("/protype/list", protype.get_list);
  app.get("/protype/detail/:id", protype.detail);
  app.post("/protype/create", protype.add);
  app.put("/protype/update/:id", protype.update);
};
