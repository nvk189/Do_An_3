const { where } = require("sequelize");
const db = require("../model");
const db1 = require("../model").sequelize;

//create

const Order = db.order;
const OrderDetail = db.orderDetail;
const Product = db.product;

const add = async (req, res) => {
  const { cus_id, name, phone, address, total, order_status, products } =
    req.body;
  try {
    const create = await Order.create({
      cus_id,
      name,
      phone,
      address,
      total,
      order_status,
    });
    const orderDetail = await Promise.all(
      products.map(async (product) => {
        const { pr_id, od_quanlity, od_price } = product;
        return await OrderDetail.create({
          order_id: create.id,
          pr_id,
          od_quanlity,
          od_price,
        });
      })
    );
    res.status(200).json({ create, orderDetail });
  } catch (err) {
    console.error(err);
    res.status(500).json(error);
  }
};
// const updateFail = async (req, res) => {
//   const { orderID } = req.body;
//   try {
//     await Promise.all(
//       orderID.map(async (order) => {
//         const { id } = order;
//         return await Order.update(
//           { order_status: "huy" },
//           { where: { id: id } }
//         );
//       })
//     );
//     res.status(200).send("ok");
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(error);
//   }
// };
const updateFail = async (req, res) => {
  const { orderID } = req.body;
  try {
    await Promise.all(
      orderID.map(async (order) => {
        const { id } = order;
        return await Order.update(
          { order_status: "huy" },
          { where: { id: id } }
        );
      })
    );
    res.status(200).send("ok");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// const updateStatus = async (req, res) => {
//   try {
//     const updatedOrder = await Order.update(
//       { order_status: "dg" },
//       { where: { order_status: "cxn" } }
//     );

//     res.status(200).json({ success: true, data: updatedOrder });
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     res
//       .status(500)
//       .json({ success: false, error: "Error updating order status" });
//   }
// };

// lấy thoogn tin sản phẩm theo id hóa đơn
const getByID = async (req, res) => {
  const orderId = req.params.id;

  try {
    const data = await Order.findOne({
      where: {
        id: orderId,
      },
      include: [
        {
          model: OrderDetail,
          as: "orderdetail",
          include: [
            {
              model: Product,
              as: "detailproduct",
              attributes: ["pr_name", "pr_image"],
            },
          ],
        },
      ],
    });

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send({
        message: `Không tìm thấy đơn hàng với id=${orderId}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: `Đã xảy ra lỗi khi truy xuất đơn hàng với id=${orderId}`,
      error: error.message,
    });
  }
};

// update trạng thái đơn hàng đang giao thành hoàn th
const updateReal = async (req, res) => {
  try {
    const updatedOrder = await Order.update(
      { order_status: "ht" },
      { where: { order_status: "dg" } }
    );

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ success: false, error: "Error updating order status" });
  }
};

// lấy tất cả đơn hàng có trạng thái hoàn thành
const orderReal = async (req, res) => {
  try {
    const real = await Order.findAll(
      {
        order: [["id", "desc"]],
      },
      { where: { order_status: "ht" } }
    );

    res.status(200).send(real);
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ success: false, error: "Error updating order status" });
  }
};

// lấy tất cả đơn hàng có trạng thái hủy
const orderFail = async (req, res) => {
  try {
    const fail = await Order.findAll({ where: { order_status: "huy" } });

    res.status(200).send(fail);
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ success: false, error: "Error updating order status" });
  }
};
// lấy tất cả đơn hàng có trạng thái đang giao
const orderShip = async (req, res) => {
  try {
    const ship = await Order.findAll({ where: { order_status: "dg" } });

    res.status(200).send(ship);
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ success: false, error: "Error updating order status" });
  }
};

// hiển thị số lượng về trạng thái đơn hàng
const totalOrder = async (req, res) => {
  try {
    const results = await db1.query("CALL totalOrder()");
    res.status(200).send(results);
  } catch (error) {
    console.error("Lỗi khi gọi stored procedure:", error);
    res.status(500).send("Lỗi khi gọi stored procedure");
  }
};

// lấy tất cả đơn hàng của khách hàng
const getCusID = async (req, res) => {
  const cusId = req.params.id;

  try {
    const orders = await Order.findAll({
      where: {
        cus_id: cusId,
      },
      include: [
        {
          model: OrderDetail,
          as: "orderdetail",
          include: [
            {
              model: Product,
              as: "detailproduct",
              attributes: ["pr_name", "pr_image"],
            },
          ],
        },
      ],
    });

    if (!orders || orders.length === 0) {
      return res.status(404).send({
        message: `Không tìm thấy đơn hàng với id=${cusId}`,
      });
    }

    const groupedOrders = {
      cxn: [],
      ht: [],
      dg: [],
      huy: [],
    };

    orders.forEach((order) => {
      switch (order.order_status) {
        case "cxn":
          groupedOrders.cxn.push(order);
          break;
        case "ht":
          groupedOrders.ht.push(order);
          break;
        case "dg":
          groupedOrders.dg.push(order);
          break;
        case "huy":
          groupedOrders.huy.push(order);
          break;
        default:
          break;
      }
    });

    res.status(200).send(groupedOrders);
  } catch (error) {
    res.status(500).send({
      message: `Đã xảy ra lỗi khi truy xuất đơn hàng với id=${cusId}`,
      error: error.message,
    });
  }
};
/// update trang thái cho 1 đơn hàng
const updateOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedOrder = await Order.update(
      { order_status: "huy" },
      { where: { id: id } }
    );

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ success: false, error: "Error updating order status" });
  }
};
module.exports = {
  add,
  getByID,
  updateReal,
  updateFail,
  orderReal,
  orderFail,
  orderShip,
  totalOrder,
  getCusID,
  updateOrder,
};
