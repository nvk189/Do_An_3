let isAuth = async function (req, res, next) {
  var _JWT = require("../common/_JWT");
  var _token = req.headers.authorization;
  if (_token) {
    try {
      var auhData = await _JWT.check(_token);

      req.auth = auhData;
      //   console.log(req.auth);
      next();
    } catch (error) {
      return res.send({ data: " mã token không hợp lệ" });
    }
  } else {
    return res.send({ data: "chưa có mã token" });
  }
};

module.exports = {
  isAuth: isAuth,
};
