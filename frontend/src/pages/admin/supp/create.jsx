import { useState } from "react";
import suppAPI from "../../../service/suppAPI";

const CreateSupp = () => {
  // Khởi tạo state để lưu thông tin nhập từ form
  const [successMessage, setSuccessMessage] = useState("");
  const [supp, setSupp] = useState({
    sl_name: "",
    sl_email: "",
    sl_phone: "",
    sl_address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupp({ ...supp, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(supp);
    try {
      await suppAPI.create(supp);
      setSuccessMessage("Thêm  thành công");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Lỗi khi thêm nhà cung cấp:", error);
    }
  };

  return (
    <div className="container-fluid pt-0">
      <h1 className="h3 mb-2 text-gray-800">Thêm nhà cung cấp</h1>
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    {successMessage && (
                      <div className="alert alert-success" role="alert">
                        {successMessage}
                      </div>
                    )}
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="cus_name">tên nhà cung cấp:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="sl_name"
                          name="sl_name"
                          placeholder="tên nhà cung cấp"
                          onChange={handleChange}
                          // value={supp.sl_name}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cus_email">Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          id="sl_email"
                          name="sl_email"
                          placeholder="Nhập email"
                          onChange={handleChange}
                          // value={supp.sl_email}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cus_phone">Điện thoại:</label>
                        <input
                          type="number"
                          className="form-control"
                          id="sl_phone"
                          name="sl_phone"
                          placeholder="Nhập số điện thoại"
                          onChange={handleChange}
                          // value={supp.sl_phone}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cus_address">Địa chỉ:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="sl_address"
                          name="sl_address"
                          placeholder="Nhập địa chỉ"
                          onChange={handleChange}
                          // value={supp.sl_address}
                        />
                      </div>
                      <div className="m-3">
                        <button type="submit" className="btn btn-success">
                          Lưu
                        </button>
                        <a className="btn btn-primary" href="/supp">
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
  );
};

export default CreateSupp;
