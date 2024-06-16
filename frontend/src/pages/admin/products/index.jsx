/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from "react";
import productAPI from "../../../service/productApi";
import $ from "jquery";
import "datatables.net";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
const index = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  const formatNumber = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  useEffect(() => {
    productAPI
      .getAll()
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
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
  }, [products]);

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.some((p) => p.id === product.id)) {
        return prevSelectedProducts.filter((p) => p.id !== product.id);
      } else {
        return [...prevSelectedProducts, product];
      }
    });
  };

  const handleImportClick = () => {
    navigate("/import/create", { state: { selectedProducts } });
  };

  return (
    <div className="container-fluid pt-0">
      <h1 className="h3 mb-2 text-gray-800">Danh sách sản phẩm</h1>

      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="row">
                <div className="">
                  <button
                    onClick={handleImportClick}
                    className="btn btn-primary float-end"
                    style={{
                      marginBottom: "5px",
                      backgroundColor: "#4e73df",
                      color: "#fff",
                    }}
                  >
                    Nhập
                  </button>
                  <Link
                    to="/products/create"
                    className="btn btn-primary float-end"
                    style={{
                      marginBottom: "5px",
                      backgroundColor: "#4e73df",
                      color: "#fff",
                    }}
                  >
                    +Thêm mới
                  </Link>
                </div>
                <div className="col-sm-12">
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
                          <input type="checkbox" name="" id="" />
                        </th>
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
                      {products.map((pr, index) => (
                        <tr key={pr.id} className="odd">
                          <td style={{ textAlign: "center" }}>
                            <input
                              type="checkbox"
                              onChange={() => handleCheckboxChange(pr)}
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
                            <a className="mx-2 btn btn-success">
                              <i className="bi bi-trash"></i>
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
  );
};

export default index;
