import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import typeAPI from "../../../service/protypeAPI";

const Edit = () => {
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    typeAPI
      .getById(id)
      .then((response) => {
        setValue("pt_name", response.pt_name);
        setValue("pt_status", response.pt_status.toString());
      })
      .catch((error) => {
        console.error("Error fetching customer:", error);
      });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const newtype = {
      pt_name: data.pt_name,
      pt_status: data.pt_status === "true",
    };
    try {
      await typeAPI.update(id, newtype);
      setSuccessMessage("Cập nhật thành công");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setSuccessMessage("Cập nhật thất bại");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div>
      <div className="container-fluid pt-0">
        <h1 className="h3 mb-2 text-gray-800">Sửa thông tin</h1>
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
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                          <label htmlFor="pt_name">Tên danh mục:</label>
                          <input
                            {...register("pt_name", {
                              required: "Tên danh mục là bắt buộc",
                            })}
                            type="text"
                            className="form-control"
                            id="pt_name"
                            placeholder="Nhập tên danh mục"
                          />
                          {errors.pt_name && <p>{errors.pt_name.message}</p>}
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="sl_status"
                            style={{ marginRight: "20px" }}
                          >
                            Trạng thái:
                          </label>
                          <div className="form-check form-check-inline">
                            <input
                              {...register("pt_status")}
                              className="form-check-input"
                              type="radio"
                              value="true"
                              id="status_true"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="status_true"
                            >
                              Hiện
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              {...register("pt_status")}
                              className="form-check-input"
                              type="radio"
                              value="false"
                              id="status_false"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="status_false"
                            >
                              Ẩn
                            </label>
                          </div>
                        </div>
                        <div className="m-3">
                          <button
                            type="submit"
                            className="btn btn-success"
                            style={{ marginRight: "20px" }}
                          >
                            Cập nhật
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

export default Edit;
