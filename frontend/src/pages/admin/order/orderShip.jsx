/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from "react";
import orderAPI from "../../../service/orderAPI";
import $ from "jquery";
import "datatables.net";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const orderShip = () => {
  const [order, setOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);

  const formatNumber = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  useEffect(() => {
    orderAPI
      .getShip()
      .then((response) => {
        setOrder(response);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  useEffect(() => {
    if (order.length > 0) {
      const table = $("#example1").DataTable({
        paging: true,
        searching: true,
        info: true,
        autoWidth: false,
        responsive: true,
      });

      return () => {
        table.destroy();
      };
    }
  }, [order]);
  useEffect(() => {
    console.log(selectedOrder);
  }, [selectedOrder]);

  const handleCheckboxChange = (order) => {
    setSelectedOrder((prevSelectedOrder) => {
      if (prevSelectedOrder.some((p) => p.id === order.id)) {
        return prevSelectedOrder.filter((p) => p.id !== order.id);
      } else {
        return [...prevSelectedOrder, order];
      }
    });
  };
  const handlePlaceOrder = async () => {
    try {
      await orderAPI.updateReal();
      toast.success("Đơn hàng giao thành công!");
      window.location.reload;
    } catch (error) {
      toast.success("Đơn hàng bị lỗi !");
      console.error("Error placing order:", error);
    }
  };

  const handleOrderFail = async () => {
    try {
      const response = await orderAPI.updateFail(selectedOrder);
      toast.success("Đơn hàng bị hủy!");
      console.log("Update response:", response);
    } catch (error) {
      toast.success("Đơn hàng lỗi cửa hàng!");
      console.error("Error updating orders:", error);
    }
  };
  return (
    <div className="container-fluid pt-0 box">
      <div className="card shadow mb-4">
        <div className="card-body">
          <ToastContainer />
          <h3 className="">Danh sách đơn hàng đang giao</h3>

          <button
            onClick={handleOrderFail}
            className="btn btn-primary float-end"
            style={{
              margin: "0 20px 5px ",
              backgroundColor: "red",
              color: "#fff",
            }}
          >
            Trả hàng
          </button>
          <button
            onClick={handlePlaceOrder}
            className="btn btn-primary float-end"
            style={{
              margin: "0 5px 5px 0",
              backgroundColor: "#4e73df",
              color: "#fff",
            }}
          >
            Thành công
          </button>
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="row">
                <div className="">
                  <div className="col-sm-12">
                    <div className="box-body">
                      <table
                        id="example1"
                        className="table table-bordered table-hover"
                      >
                        <thead>
                          <tr>
                            <th
                              rowSpan="1"
                              colSpan="1"
                              style={{ textAlign: "center" }}
                            ></th>
                            <th
                              rowSpan="1"
                              colSpan="1"
                              style={{ textAlign: "center" }}
                            >
                              STT
                            </th>
                            <th
                              rowSpan="1"
                              colSpan="1"
                              style={{ textAlign: "center" }}
                            >
                              khách hàng
                            </th>
                            <th
                              rowSpan="1"
                              colSpan="1"
                              style={{ textAlign: "center" }}
                            >
                              Số điện thoại
                            </th>
                            <th
                              rowSpan="1"
                              colSpan="1"
                              style={{ textAlign: "center" }}
                            >
                              Địa chỉ
                            </th>
                            <th
                              rowSpan="1"
                              colSpan="1"
                              style={{ textAlign: "center" }}
                            >
                              tổng tiền
                            </th>
                            <th
                              rowSpan="1"
                              colSpan="1"
                              style={{ textAlign: "center" }}
                            >
                              Trạng thái
                            </th>
                            <th
                              rowSpan="1"
                              colSpan="1"
                              style={{ textAlign: "center" }}
                            >
                              Tác vụ
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.map((or, index) => (
                            <tr key={or.id}>
                              <td style={{ textAlign: "center" }}>
                                <input
                                  type="checkbox"
                                  name=""
                                  id=""
                                  onChange={() => handleCheckboxChange(or)}
                                />
                              </td>
                              <td
                                className="sorting_1"
                                style={{ textAlign: "center" }}
                              >
                                {index + 1}
                              </td>
                              <td
                                className="sorting_1"
                                style={{ textAlign: "center" }}
                              >
                                {or.name}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {or.phone}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {or.address}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {formatNumber(or.total)}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {or.order_status === "dg"
                                  ? "Đang giao hàng"
                                  : ""}
                              </td>
                              <td className="d-flex justify-content-center align-content-center">
                                <a
                                  href={`/order/edit/${or.id}`}
                                  className="mx-2 btn btn-success"
                                >
                                  <i className="bi bi-eye-fill"></i>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default orderShip;
