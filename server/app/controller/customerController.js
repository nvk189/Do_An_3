const db = require("../model");

//create

const Customer = db.customer;

const addCus = async (req, res) => {
  let info = {
    cus_name: req.body.cus_name,
    cus_email: req.body.cus_email,
    cus_phone: req.body.cus_phone,
    cus_address: req.body.cus_address,
  };

  const customer = await Customer.create(info);
  res.status(200).send(customer);
};

const getAllCus = async (req, res) => {
  let customer = await Customer.findAll({
    order: [["id", "desc"]],
  });
  res.status(200).send(customer);
};

const getByID = async (req, res) => {
  let id = req.params.id;
  let customer = await Customer.findOne({ where: { id: id } });
  res.status(200).send(customer);
};

const update = async (req, res) => {
  let id = req.params.id;
  try {
    console.log(req.body);
    let customer = await Customer.update(req.body, { where: { id: id } });
    res.status(200).send(customer);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "lỗi khi cập nhật." });
  }
};

module.exports = {
  addCus,
  getAllCus,
  getByID,
  update,
};
