const db = require("../common/connect");

const Protype = {
  getAll: (callBack) => {
    const sql = "select * from pr_type ";
    db.query(sql, callBack);
  },

  getById: (id, callBack) => {
    const sql = "select * from pr_type where pt_id =?";
    db.query(sql, [id], callBack);
  },

  create: (newProduct, callBack) => {
    const sql = "INSERT INTO pr_type (`pt_name`, `pt_status`) VALUES (?, ?)";
    const values = [newProduct.pt_name, newProduct.pt_status];
    db.query(sql, values, callBack);
  },

  update: (id, newProduct, callBack) => {
    console.log(newProduct);
    const sql = "update pr_type set pt_name =?, pt_status =? where pt_id =?";
    db.query(sql, [id, ...newProduct], callBack);
  },
};

module.exports = Protype;
