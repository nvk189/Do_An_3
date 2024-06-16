const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const notification = require("./app/config/notification");
const path = require("path");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const server = http.createServer(app);
// khởi tạo socket và module thông báo
notification.initializeSocket(server);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Đảm bảo body-parser được sử dụng trước khi đến các tuyến đường cụ thể
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static(path.join(__dirname, "public")));

const customer = require("./app/router/customerRouter");
const product = require("./app/router/productRouter");
const protype = require("./app/router/protypeRouter");
const supp = require("./app/router/suppRouter");
const category = require("./app/router/categoryRouter");
const Import = require("./app/router/importRouter");
const auth = require("./app/router/authRouter");
const Order = require("./app/router/orderRouter");
const user = require("./app/router/useRouter");
const static = require("./app/router/statisticalRouter");

app.use("/customer", customer);
app.use("/product", product);
app.use("/protype", protype);
app.use("/supp", supp);
app.use("/category", category);
app.use("/import", Import);
app.use("/", auth);
app.use("/order", Order);
app.use("/user", user);
app.use("/static", static);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
