const db = require("../model");

//create

const Protype = db.protype;

const add = async (req, res) => {
  let info = {
    pt_name: req.body.pt_name,
    pt_status: 1,
  };

  const protype = await Protype.create(info);
  res.status(200).send(protype);
};

const getAll = async (req, res) => {
  let protype = await Protype.findAll({
    order: [["id", "desc"]],
    where: { pt_status: 1 },
  });
  res.status(200).send(protype);
};

const getByID = async (req, res) => {
  let id = req.params.id;
  let protype = await Protype.findOne({ where: { id: id } });
  res.status(200).send(protype);
};

const update = async (req, res) => {
  let id = req.params.id;
  let protype = await Protype.update(req.body, { where: { id: id } });
  res.status(200).send(protype);
};

module.exports = {
  add,
  getAll,
  getByID,
  update,
};
