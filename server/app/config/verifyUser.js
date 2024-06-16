const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Token is not valid, authorization denied" });
      } else {
        req.cus_id = decoded.cus_id;
        next();
      }
    });
  }
};

module.exports = verifyUser;
