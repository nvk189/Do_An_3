const db = require("../model");

//create

const Category = db.category;

const add = async (req, res) => {
  let info = {
    pr_id: req.body.pr_id,
    ct_des1: req.body.ct_des1,
  };

  const category = await Category.create(info);
  res.status(200).send(category);
};

const getAll = async (req, res) => {
  let category = await Category.findAll({});
  res.status(200).send(category);
};

const getByID = async (req, res) => {
  let id = req.params.id;
  let category = await Category.findOne({ where: { id: id } });
  res.status(200).send(category);
};

const update = async (req, res) => {
  let id = req.params.id;
  let category = await Category.update(req.body, { where: { id: id } });
  res.status(200).send(category);
};

module.exports = {
  add,
  getAll,
  getByID,
  update,
};
