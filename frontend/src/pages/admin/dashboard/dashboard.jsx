/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react";
import Static from "../../../service/staticAPI";
// import Order from "../../../service/orderAPI";
import $ from "jquery";
import "datatables.net";
import "bootstrap-icons/font/bootstrap-icons.css";
const dashboard = () => {
  const [order, setOrder] = useState([]);
  const [date, setDate] = useState({
    total_revenue: 0,
    total_products_sold: 0,
    total_orders_today: 0,
  });
  const formatNumber = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  useEffect(() => {
    Static.getAllCheck()
      .then((response) => {
        setOrder(response);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);
  useEffect(() => {
    Static.getDate()
      .then((response) => {
        setDate(response);
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
  const handlePlaceOrder = async () => {
    try {
      await Static.updateStatus();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Quản lý</h1>
        </div>

        <div className="row">
          <div className="col-xl-4 col-md-6 mb-3">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Đơn đặt hàng
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {date.total_orders_today}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6 mb-3">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Sản phẩm bán được trong ngày
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {date.total_products_sold}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 mb-3">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Doanh thu ngày hiện tại
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {formatNumber(date.total_revenue)}
                    </div>
                  </div>
                  {/* <div className="col-auto">
                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <form>
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="row">
                <div className="">
                  <button
                    onClick={handlePlaceOrder}
                    className="btn btn-primary float-end"
                    style={{
                      marginBottom: "5px",
                      backgroundColor: "#4e73df",
                      color: "#fff",
                    }}
                  >
                    Duyệt đơn hàng
                  </button>
                </div>
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
                          </tr>
                        </thead>
                        <tbody>
                          {order.map((or, index) => (
                            <tr key={or.id}>
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
                                {or.order_status === "cxn"
                                  ? "chờ xác nhận"
                                  : ""}
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
        </form>
      </div>
    </div>
  );
};

export default dashboard;
