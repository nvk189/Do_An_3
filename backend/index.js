var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Chỉ định origin chính xác
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true, // Cho phép gửi cookie từ frontend
  })
);

app.use(cookieParser());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

require("./app/routers/auth.route.js")(app);
require("./app/routers/customer.route.js")(app);
require("./app/routers/product.route.js")(app);
require("./app/routers/product_type.route.js")(app);
app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
