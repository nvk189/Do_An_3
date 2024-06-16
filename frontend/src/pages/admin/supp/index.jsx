import { useEffect, useState } from "react";
import suppAPI from "../../../service/suppAPI";
import $ from "jquery";
import "datatables.net";
import "bootstrap-icons/font/bootstrap-icons.css";
// import usePagination from "../../../components/pagination/usePagination";
// import Pagination from "../../../components/pagination/paginations";

const Index = () => {
  const [supp, setSupp] = useState([]);
  // const itemsPerPage = 2;

  useEffect(() => {
    suppAPI
      .getAll()
      .then((response) => {
        setSupp(response);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);
  // const { currentItems, pageCount, handlePageClick } = usePagination(
  //   cus,
  //   itemsPerPage
  // );

  useEffect(() => {
    if (supp.length > 0) {
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
  }, [supp]);

  return (
    <div className="container-fluid pt-0 box">
      <div className="card shadow mb-4">
        <div className="card-body">
          <h3 className="">Danh sách nhà cung cấp</h3>
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="row">
                <div className="">
                  <a
                    href="/supp/create"
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
                            Họ và tên
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
                            Điện thoại
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
                            Tác vụ
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {supp.map((spp, index) => (
                          <tr key={spp.id}>
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
                              {spp.sl_name}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {spp.sl_email}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {spp.sl_phone}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {spp.sl_address}
                            </td>
                            <td className="d-flex justify-content-center align-content-center">
                              <a
                                href={`/supp/update/${spp.id}`}
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
