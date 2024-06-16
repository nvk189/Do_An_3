/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import orderAPI from "../../../service/orderAPI";
// import $ from "jquery";
// import "datatables.net";
// import "bootstrap-icons/font/bootstrap-icons.css";

const Index = () => {
  const [order, setOrder] = useState([]);

  // const formatNumber = (value) => {
  //   return value.toLocaleString("vi-VN", {
  //     style: "currency",
  //     currency: "VND",
  //   });
  // };
  useEffect(() => {
    orderAPI
      .getAll()
      .then((response) => {
        setOrder(response);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  // useEffect(() => {
  //   if (order.length > 0) {
  //     const table = $("#example1").DataTable({
  //       paging: true,
  //       searching: true,
  //       info: true,
  //       autoWidth: false,
  //       responsive: true,
  //     });

  //     return () => {
  //       table.destroy();
  //     };
  //   }
  // }, [order]);

  return (
    <div className="container-fluid pt-0 box">
      <div className="card shadow mb-4">
        <div className="card-body">
          <h3 className="">Tổng quan đơn hàng</h3>
          <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Tổng số đơn đặt hàng
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {order.total_order}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Đơn hàng đang giao
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {order.order_ship}
                      </div>
                    </div>
                    <div className="col-auto">
                      <a href="/orderShip" className="mx-2 btn btn-success">
                        <i className="bi bi-pencil-square"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Đơn hàng thành công
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {order.order_real}
                      </div>
                    </div>
                    <div className="col-auto">
                      <a href="/orderReal" className="mx-2 btn btn-success">
                        <i className="bi bi-pencil-square"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Đơn hàng bị hủy
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {order.order_fail}
                      </div>
                    </div>
                    <div className="col-auto">
                      <a href="/orderFail" className="mx-2 btn btn-success">
                        <i className="bi bi-pencil-square"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="table-responsive">
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
                                {or.order_status === "cxn"
                                  ? "chờ xác nhận"
                                  : ""}
                              </td>
                              <td className="d-flex justify-content-center align-content-center">
                                <a
                                  href={`/import/getImport/${or.id}`}
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
