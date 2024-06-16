/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import staticAPI from "../../../service/staticAPI";
import { Link } from "react-router-dom";

const Index = () => {
  const [count, setStatic] = useState({ total_revenue: 0 });
  const [product, setProduct] = useState([]);

  const formatNumber = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  useEffect(() => {
    staticAPI
      .getStatic()
      .then((response) => {
        setStatic(response);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);
  useEffect(() => {
    staticAPI
      .getProduct()
      .then((response) => {
        console.log(response);
        setProduct(response);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  return (
    <div className="container-fluid pt-0 box">
      <div className="card shadow mb-4">
        <div className="card-body">
          <h3 className="">Thống kê</h3>
          <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Tổng doanh thu
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {/* {count.total_revenue} */}
                        {formatNumber(count.total_revenue)}
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
                        Sản phẩm bán được
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {count.total_products_sold}
                      </div>
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
                        {count.total_orders_real}
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
                        {count.total_orders_fail}
                      </div>
                    </div>
                    <div className="col-auto">
                      <a href="" className="mx-2 btn btn-success">
                        <i className="bi bi-pencil-square"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <h3>Sản phẩm bán chạy</h3>
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="row">
                <div className="">
                  <div className="col-sm-12">
                    <div className="box-body">
                      <table
                        className="table table-bordered table-hover"
                        id="example1"
                        width="100%"
                        cellSpacing="0"
                        role="grid"
                        aria-describedby="dataTable_info"
                        style={{ width: "100%" }}
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
                              Số lượng bán
                            </th>
                            <th
                              rowSpan="1"
                              colSpan="1"
                              style={{ textAlign: "center" }}
                            >
                              Tên SP
                            </th>
                            <th
                              rowSpan="1"
                              colSpan="1"
                              style={{ textAlign: "center" }}
                            >
                              Hình ảnh
                            </th>
                            <th
                              rowSpan="1"
                              colSpan="1"
                              style={{ textAlign: "center" }}
                            >
                              Giá
                            </th>
                            <th
                              rowSpan="1"
                              colSpan="1"
                              style={{ textAlign: "center" }}
                            >
                              Giá giảm
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
                          {product.map((pr, index) => (
                            <tr key={pr.id} className="odd">
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
                                {pr.total_quantity_sold}
                              </td>
                              <td
                                className="sorting_1"
                                style={{ textAlign: "center" }}
                              >
                                {pr.pr_name}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <img
                                  style={{ width: "60px", height: "60px" }}
                                  src={`http://localhost:8081/public/image/${pr.pr_image}`}
                                  alt=""
                                />
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {formatNumber(pr.pr_price)}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {formatNumber(pr.pr_sales)}
                              </td>

                              <td className="d-flex justify-content-center ">
                                <Link
                                  to={`/products/update/${pr.id}`}
                                  className="mx-2 btn btn-success"
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </Link>
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

export default Index;
