const db = require("../model");

//create

const Supp = db.supp;

const add = async (req, res) => {
  let info = {
    sl_name: req.body.sl_name,
    sl_address: req.body.sl_address,
    sl_phone: req.body.sl_phone,
    sl_email: req.body.sl_email,
  };

  console.log(req.body);
  const supp = await Supp.create(info);
  res.status(200).send(supp);
};

const getAll = async (req, res) => {
  let supp = await Supp.findAll({
    order: [["id", "desc"]],
  });
  res.status(200).send(supp);
};

const getByID = async (req, res) => {
  let id = req.params.id;
  let supp = await Supp.findOne({ where: { id: id } });
  res.status(200).send(supp);
};

const update = async (req, res) => {
  let id = req.params.id;
  let supp = await Supp.update(req.body, { where: { id: id } });
  res.status(200).send(supp);
};

module.exports = {
  add,
  getAll,
  getByID,
  update,
};
