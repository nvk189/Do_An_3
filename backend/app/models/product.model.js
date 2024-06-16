const db = require("../common/connect");

const Product = {
  getAll: (callBack) => {
    const sql =
      "select pr_id, pr_name, pr_image, pr_price, pr_sales  from products ";
    db.query(sql, callBack);
  },

  getById: (id, callBack) => {
    const sql = "select *from products where pr_id =?";
    db.query(sql, [id], callBack);
  },

  create: (newProduct, callBack) => {
    const sql =
      "insert into products (`pt_id`, `pr_name`, `pr_image`, `pr_amount` , `pr_price` , `pr_sales` )  values (?)";
    db.query(sql, [newProduct], callBack);
  },

  update: (id, newProduct, callBack) => {
    const sql =
      "update products set pt_id =?, pr_name =?, pr_image =?, pr_amount =?, pr_price =?, pr_sales =?, pr_status =? where pr_id =?";
    db.query(sql, [id, ...newProduct], callBack);
  },
};

module.exports = Product;
