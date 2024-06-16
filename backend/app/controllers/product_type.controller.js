const Protype = require("../models/product_type.model");

exports.get_list = function (req, res) {
  Protype.getAll(function (err, data) {
    if (err) {
      res.status(500).send({ error: "Error fetching customers" });
    } else {
      res.status(200).send({ result: data });
    }
  });
};
exports.detail = function (req, res) {
  const id = req.params.id;
  Protype.getById(id, function (err, data) {
    if (err) {
      res.status(500).send({ error: "Error fetching customers" });
    } else {
      res.status(200).send({ result: data });
    }
  });
};

exports.add = function (req, res) {
  var data = req.body;
  console.log(data);
  Protype.create(data, function (err, data) {
    if (err) {
      res.status(500).send({ error: "Error fetching product" });
    } else {
      res.status(200).send({ result: data });
    }
  });
};
exports.update = function (req, res) {
  const id = req.params.id;
  var newData = req.body;

  Protype.update(id, newData, function (err, data) {
    if (err) {
      res.status(500).send({ error: "Error fetching customers" });
    } else {
      res.status(200).send({ result: data });
    }
  });
};
