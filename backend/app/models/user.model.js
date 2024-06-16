const db = require("../common/connect");

const User = {
  create: (user, callback) => {
    const sql = "INSERT INTO user (`cus_id`, `email`, `password`) VALUES (?)";
    db.query(sql, [user], callback);
  },

  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [email], callback);
  },
};

module.exports = User;
