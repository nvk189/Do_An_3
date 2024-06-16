import { useEffect, useState } from "react";
import importAPI from "../../../service/proImport";
import $ from "jquery";
import "datatables.net";
import "bootstrap-icons/font/bootstrap-icons.css";

const Index = () => {
  const [port, setImport] = useState([]);

  const formatNumber = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  useEffect(() => {
    importAPI
      .getAll()
      .then((response) => {
        setImport(response);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  useEffect(() => {
    if (port.length > 0) {
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
  }, [port]);

  return (
    <div className="container-fluid pt-0 box">
      <div className="card shadow mb-4">
        <div className="card-body">
          <h3 className="">Danh sách hóa đơn nhập</h3>
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="row">
                <div className="">
                  <a
                    href="/import/create"
                    className="btn btn-primary float-end"
                    style={{
                      marginBottom: "5px",
                      backgroundColor: "#4e73df",
                      color: "#fff",
                    }}
                  >
                    +Thêm mới
                  </a>
                </div>
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
                            Ngày nhập
                          </th>
                          <th
                            rowSpan="1"
                            colSpan="1"
                            style={{ textAlign: "center" }}
                          >
                            nhà cung cấp
                          </th>
                          <th
                            rowSpan="1"
                            colSpan="1"
                            style={{ textAlign: "center" }}
                          >
                            số lượng
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
                            Tác vụ
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {port.map((ip, index) => (
                          <tr key={ip.id}>
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
                              {ip.pp_start.split("T")[0]}
                            </td>
                            <td style={{ textAlign: "center" }}>{ip.sl_id}</td>
                            <td style={{ textAlign: "center" }}>
                              {ip.pp_amonut}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {formatNumber(ip.pp_price)}
                            </td>
                            <td className="d-flex justify-content-center align-content-center">
                              <a
                                href={`/import/getImport/${ip.id}`}
                                className="mx-2 btn btn-success"
                              >
                                <i className="bi bi-eye-fill"></i>
                              </a>
                              <a
                                href={`/import/getImport/${ip.id}`}
                                className="mx-2 btn btn-success"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </a>
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
    </div>
  );
};

export default Index;
