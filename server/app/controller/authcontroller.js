const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../model");

const saltRounds = 10;

const Customer = db.customer;
const User = db.use;

const register = async (req, res) => {
  const { cus_name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password.toString(), saltRounds);

    const newCustomer = {
      cus_name,
      cus_email: email,
    };

    const customerResult = await Customer.create(newCustomer);
    const cus_id = customerResult.id;

    const newUser = { cus_id: cus_id, email, pass: hash, user_status: 1 };
    const userResult = await User.create(newUser);

    return res.json({ customer: customerResult, user: userResult });
  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json({ Error: "Error during registration process" });
  }
};
const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.pass) {
      return res.status(400).json({ Error: "Thiếu email hoặc mật khẩu" });
    }

    const user = await User.findOne({
      where: { email: req.body.email, user_status: 1 },
    });

    if (!user) {
      return res.status(404).json({ Error: "Không tồn tại tài khoản" });
    }
    const match = await bcrypt.compare(req.body.pass.toString(), user.pass);
    if (!match) {
      return res.status(401).json({ Error: "Sai mật khẩu" });
    }

    // Tạo token JWT và lưu vào cookie
    const cus_id = user.cus_id;
    const token = jwt.sign({ cus_id }, "jwt-secret-key", { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true });
    console.log(token);

    return res.status(200).json({ Status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Error: "Lỗi server" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ Status: "ok" });
};
const verifyUser = (req, res) => {
  return res.json({ Status: "ok", cus_id: req.cus_id });
};
module.exports = {
  register,
  login,
  logout,
  verifyUser,
};
