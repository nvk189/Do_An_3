// const db = require("../common/connect");

// const Cus = function (cs) {
//   this.cus_id = cs.cus_id;
//   this.cus_name = cs.cus_name;
//   this.cus_email = cs.cus_email;
//   this.cus_phone = cs.cus_phone;
//   this.cus_address = cs.cus_address;
// };

// Cus.get_all = function (result) {
//   db.query("SELECT * FROM customer order by cus_id desc", (err, cus) => {
//     if (err) {
//       result(err, null);
//     } else {
//       result(null, cus);
//     }
//   });
// };

// Cus.getById = function (id, result) {
//   db.query("select * from customer where cus_id = ?", id, (err, cus) => {
//     if (err || cus.length === 0) {
//       result(err, null);
//     } else {
//       result(cus[0]);
//     }
//   });
// };

// Cus.create = function (data, result) {
//   db.query("INSERT INTO customer  set ?", data, (err, cus) => {
//     if (err) {
//       result(err);
//     } else {
//       result(null, { id: cus.insertId, ...data });
//     }
//   });
// };

// Cus.update = function (id, newData, result) {
//   db.query(
//     "UPDATE customer SET cus_name = ?, cus_email = ?, cus_phone = ?, cus_address = ? WHERE cus_id = ?",
//     [
//       newData.cus_name,
//       newData.cus_email,
//       newData.cus_phone,
//       newData.cus_address,
//       id,
//     ],
//     (err, cus) => {
//       if (err) {
//         result(err);
//       } else {
//         result(cus);
//       }
//     }
//   );
// };
// Cus.remove = function (id, result) {
//   db.query("DELETE FROM customer where cus_id = ?", id, (err, cus) => {
//     if (err) {
//       result(err);
//     } else {
//       result(cus);
//     }
//   });
// };

// module.exports = Cus;

const db = require("../common/connect");

const Customer = {
  getAll: (callback) => {
    const sql = "SELECT * FROM customer order by cus_id desc ";
    db.query(sql, callback);
  },
  getById: (id, callback) => {
    const sql = "select * from customer where cus_id =?";
    db.query(sql, [id], callback);
  },
  create: (customer, callback) => {
    const sql = "INSERT INTO customer (`cus_name`,`cus_email`) VALUES (?)";
    db.query(sql, [customer], callback);
  },
  //   update: (id, customer, callback) => {
  //     const sql =
  //       "UPDATE customer SET cus_name =?, cus_email =?, cus_phone =? , cus_address =? WHERE cus_id =?";
  //     // const customerData = [
  //     //   customer.cus_name,
  //     //   customer.cus_email,
  //     //   customer.cus_phone,
  //     //   customer.cus_address,
  //     // ];

  //     db.query(sql, [id, customer], callback);
  //   },
  update: (id, customer, callback) => {
    const sql = `
  UPDATE customer 
  SET cus_name = ?, cus_email = ?, cus_phone = ?, cus_address = ?
  WHERE cus_id = ?
  `;
    const customerData = [
      customer.cus_name,
      customer.cus_email,
      customer.cus_phone,
      customer.cus_address,
      id,
    ];

    db.query(sql, customerData, callback);
  },
};

module.exports = Customer;
