const db = require("../model");

//create

const OrderDetail = db.orderDetail;

const add = async (req, res) => {
  let info = {
    order_id: req.params.order_id,
    pr_id: req.body.pr_id,
    od_quanlity: req.body.od_quanlity,
    od_price: req.body.od_price,
  };

  const orderDetail = await OrderDetail.create(info);
  res.status(200).send(orderDetail);
};

const getAll = async (req, res) => {
  let orderDetail = await OrderDetail.findAll({});
  res.status(200).send(orderDetail);
};

const getByID = async (req, res) => {
  let id = req.params.id;
  let orderDetail = await OrderDetail.findOne({ where: { id: id } });
  res.status(200).send(orderDetail);
};

const update = async (req, res) => {
  let id = req.params.id;
  let orderDetail = await OrderDetail.update(req.body, { where: { id: id } });
  res.status(200).send(orderDetail);
};

module.exports = {
  add,
  getAll,
  getByID,
  update,
};
