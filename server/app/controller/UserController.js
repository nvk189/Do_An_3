const db = require("../model");

const User = db.use;
const Customer = db.customer;

const getAll = async (req, res) => {
  const data = await User.findAll({
    include: [
      {
        model: Customer,
        as: "usecus",
        attributes: ["cus_name"],
      },
    ],
  });

  res.status(200).send(data);
};

module.exports = {
  getAll,
};
