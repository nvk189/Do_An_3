var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "banhoa",
});

connection.connect(function (err) {
  if (err) console.log(err);
});

module.exports = connection;
