import $ from "jquery";
import "datatables.net";
import Protype from "../../../service/protypeAPI";
import { useEffect, useState } from "react";

// // import { useEffect } from "react"
const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [protype, SetProtype] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    Protype.getAll()
      .then((response) => {
        SetProtype(response);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (protype.length > 0) {
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
  }, [protype]);
  return (
    <div className="container-fluid pt-0">
      <h1 className="h3 mb-2 text-gray-800">Danh mục sản phẩm</h1>

      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="row">
                <div className="">
                  <a
                    href="/protype/create"
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
                          Tên danh mục{" "}
                        </th>
                        <th
                          rowSpan="1"
                          colSpan="1"
                          style={{ textAlign: "center" }}
                        >
                          trạng thái
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
                      {protype.map((pr, index) => (
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
                            {pr.pt_name}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {pr.pt_status == true ? "hoạt động" : "ẩn"}
                          </td>

                          <td className="d-flex justify-content-center ">
                            <a
                              href={`protype/update/${pr.id}`}
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
  );
};

export default index;
