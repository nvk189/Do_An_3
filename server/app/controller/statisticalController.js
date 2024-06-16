const db = require("../model").sequelize;
const db1 = require("../model");

const order = db1.order;

// thống kê tổng quát
const callStoredProcedure = async (req, res) => {
  try {
    const results = await db.query("CALL total()");
    res.status(200).send(results);
  } catch (error) {
    console.error("Lỗi khi gọi stored procedure:", error);
    res.status(500).send("Lỗi khi gọi stored procedure");
  }
};

// thống kê ngày hiện tại
const callTotalDate = async (req, res) => {
  try {
    const results = await db.query("CALL totalDate()");
    res.status(200).send(results);
  } catch (error) {
    console.error("Lỗi khi gọi stored procedure:", error);
    res.status(500).send("Lỗi khi gọi stored procedure");
  }
};

// lấy tất cả đơn hàng chờ xác nhận
const getAllcheck = async (req, res) => {
  try {
    const check = await order.findAll({
      where: {
        order_status: "cxn",
      },
    });
    res.status(200).send(check);
  } catch (error) {
    console.error("Lỗi khi gọi stored procedure:", error);
    res.status(500).send("Lỗi khi gọi stored procedure");
  }
};
// cập nhật trạng  thái cho đơn hàng
const updateStatus = async (req, res) => {
  try {
    const updatedOrder = await order.update(
      { order_status: "dg" },
      { where: { order_status: "cxn" } }
    );

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ success: false, error: "Error updating order status" });
  }
};

// lấy ra danh sách sản phẩm bán chạy
const callProductHot = async (req, res) => {
  try {
    const results = await db.query("CALL getproduct()");
    res.status(200).send(results);
  } catch (error) {
    console.error("Lỗi khi gọi stored procedure:", error);
    res.status(500).send("Lỗi khi gọi stored procedure");
  }
};
// sản phẩm giảm giá
const callProductSales = async (req, res) => {
  try {
    const results = await db.query("CALL getsalesproduct()");
    res.status(200).send(results);
  } catch (error) {
    console.error("Lỗi khi gọi stored procedure:", error);
    res.status(500).send("Lỗi khi gọi stored procedure");
  }
};
module.exports = {
  callStoredProcedure,
  getAllcheck,
  updateStatus,
  callProductHot,
  callTotalDate,
  callProductSales,
};
