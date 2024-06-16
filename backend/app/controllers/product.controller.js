var Product = require("../models/product.model");

exports.get_list = function (req, res) {
  Product.getAll(function (err, data) {
    if (err) {
      res.status(500).send({ error: "Error fetching customers" });
    } else {
      res.status(200).send({ result: data });
    }
  });
};
exports.detail = function (req, res) {
  const id = req.params.id;
  Product.getById(id, function (err, data) {
    if (err) {
      res.status(500).send({ error: "Error fetching customers" });
    } else {
      res.status(200).send({ result: data });
    }
  });
};
exports.add = function (req, res) {
  var data = req.body;
  Product.create(data, function (err, data) {
    if (err) {
      res.status(500).send({ error: "Error fetching product" });
    } else {
      res.status(200).send({ result: data });
    }
  });
};
exports.update = function (req, res) {
  const id = req.params.id;
  var newData = {
    pt_id: req.body.pt_id,
    pr_name: req.body.pr_name,
    pr_image: req.body.pr_image,
    pr_amount: req.body.pr_amount,
    pr_price: req.body.pr_price,
    pr_sales: req.body.pr_sales,
    pr_status: req.body.pr_status,
  };

  Product.update(id, newData, function (err, data) {
    if (err) {
      res.status(500).send({ error: "Error fetching customers" });
    } else {
      res.status(200).send({ result: data });
    }
  });
};
