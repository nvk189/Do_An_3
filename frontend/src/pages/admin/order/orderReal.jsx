/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from "react";
import orderAPI from "../../../service/orderAPI";
import $ from "jquery";
import "datatables.net";
import "bootstrap-icons/font/bootstrap-icons.css";

const orderReal = () => {
  const [order, setOrder] = useState([]);
  //   const [selectedOrder, setSelectedOrder] = useState([]);

  const formatNumber = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  useEffect(() => {
    orderAPI
      .getReal()
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

  return (
    <div className="container-fluid pt-0 box">
      <div className="card shadow mb-4">
        <div className="card-body">
          <h3 className="">Danh sách đơn hàng thành công</h3>

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
                                {or.order_status === "ht" ? "thành công" : ""}
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

export default orderReal;
