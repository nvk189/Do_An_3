var Cus = require("../models/customer.model");

exports.get_list = function (req, res) {
  Cus.getAll(function (err, data) {
    if (err) {
      res.status(500).send({ error: "Error fetching customers" });
    } else {
      res.status(200).send({ result: data });
    }
  });
};

exports.detail = function (req, res) {
  var id = req.params.id;
  Cus.getById(id, function (err, data) {
    if (err) {
      res.status(500).send({ error: "Error fetching customers" });
    } else {
      res.status(200).send({ result: data });
    }
  });
};

exports.add = (req, res) => {
  var data = {
    cus_name: req.body.cus_name,
    cus_email: req.body.cus_email,
    cus_phone: req.body.cus_phone,
    cus_address: req.body.cus_address,
  };

  Cus.create(data, function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Error fetching customers" });
    } else {
      res.status(200).send({ result: data });
    }
  });
};

exports.update = (req, res) => {
  var id = req.params.id;

  var newData = req.body;
  console.log(id, newData);
  Cus.update(id, newData, function (err, data) {
    if (err) {
      res.status(500).send({ error: "Error updating customer" });
    } else {
      res.status(200).send({ result: data });
    }
  });
};
