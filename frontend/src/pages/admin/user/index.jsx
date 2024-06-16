import { useEffect, useState } from "react";
import userAPI from "../../../service/useAPI";
import $ from "jquery";
import "datatables.net";
import "bootstrap-icons/font/bootstrap-icons.css";

const Index = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    userAPI
      .getAll()
      .then((response) => {
        setUser(response);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  useEffect(() => {
    if (user.length > 0) {
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
  }, [user]);

  return (
    <div className="container-fluid pt-0 box">
      <div className="card shadow mb-4">
        <div className="card-body">
          <h3 className="">Danh sách tài khoản</h3>
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="row">
                <div className=""></div>
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
                            Chủ tài khoản
                          </th>
                          <th
                            rowSpan="1"
                            colSpan="1"
                            style={{ textAlign: "center" }}
                          >
                            Email
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
                        {user.map((us, index) => (
                          <tr key={us.id}>
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
                              {us.usecus.cus_name}
                            </td>
                            <td style={{ textAlign: "center" }}>{us.email}</td>
                            <td style={{ textAlign: "center" }}>
                              {us.user_status === true ? "hoạt động" : "hủy"}
                            </td>

                            <td className="d-flex justify-content-center align-content-center">
                              <a
                                href={`/supp/update/${us.id}`}
                                className="mx-2 btn btn-success"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* <div className="">
                <Pagination
                  pageCount={pageCount}
                  handlePageClick={handlePageClick}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
