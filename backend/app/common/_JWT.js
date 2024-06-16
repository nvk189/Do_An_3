const jwt = require("jsonwebtoken");
const _APP = require("./_APP");

// make =>tạo mã
let make = function (user) {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      { data: user },
      _APP.ACCESS_TOKEN,
      {
        algorithm: "HS256",
        expiresIn: _APP.TOKEN_TIME_LIFE,
      },
      function (err, _token) {
        if (err) {
          reject(err);
        }
        resolve(_token);
      }
    );
  });
};

// check=> check mã
let check = function check(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, _APP.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    });
  });
};

module.exports = {
  make: make,
  check: check,
};
