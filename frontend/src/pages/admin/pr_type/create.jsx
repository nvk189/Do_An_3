/* eslint-disable react-hooks/rules-of-hooks */
// import axios from "axios";
import { useState } from "react";
import typeAPI from "../../../service/protypeAPI";

const create = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [protype, setProtype] = useState({
    pt_name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await typeAPI.create(protype);
      setSuccessMessage("Thêm  thành công");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setSuccessMessage("Lỗi khi danh mục sản phẩm");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };
  return (
    <div>
      <div className="container-fluid pt-0 ">
        <h1 className="h3 mb-2 text-gray-800">Thêm Danh mục</h1>

        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <div
                id="dataTable_wrapper"
                className="dataTables_wrapper dt-bootstrap4"
              >
                <div className="container">
                  <div className="row ">
                    <div className="col-md-6 offset-md-3">
                      {successMessage && (
                        <div className="alert alert-success" role="alert">
                          {successMessage}
                        </div>
                      )}
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="pt_name">Tên danh mục:</label>
                          <input
                            onChange={(e) =>
                              setProtype({
                                ...protype,
                                pt_name: e.target.value,
                              })
                            }
                            type="text"
                            className="form-control"
                            id="pt_name"
                            name="pt_name"
                            placeholder="Nhập tên danh mục"
                          />
                        </div>

                        <div className="m-3">
                          <button type="submit" className="btn btn-success">
                            Lưu
                          </button>
                          <a className="btn btn-primary" href="/protype">
                            Thoát
                          </a>
                        </div>
                      </form>
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

export default create;
