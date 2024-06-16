const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Customer = require("../models/customer.model");

const saltRounds = 10;

exports.register = (req, res) => {
  bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
    if (err) return res.json({ Error: "lỗi mã hóa mật khẩu" });

    const newUser = [cus_id, req.body.email, hash];
    User.create(newUser, (err, result) => {
      if (err) return res.json({ Error: err });
      return res.json(result);
    });
  });
};

exports.login = (req, res) => {
  User.findByEmail(req.body.email, (err, data) => {
    if (err) return res.status(500).json({ Error: "lỗi" });

    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.status(500).json({ Error: "mật khẩu lỗi" });
          if (response) {
            const cus_id = data[0].cus_id;
            const token = jwt.sign({ cus_id }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token);
            return res.status(200).json({ Status: "ok" });
          } else {
            return res.status(401).json({ Error: "sai mật khẩu" });
          }
        }
      );
    } else {
      return res.status(404).json({ Error: "không tồn tại tài khoản" });
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ Status: "ok" });
};

exports.verifyUser = (req, res) => {
  return res.json({ Status: "ok", cus_id: req.cus_id });
};
