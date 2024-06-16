import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import suppAPI from "../../../service/suppAPI";

const EditSupp = () => {
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sl_name: "",
      sl_email: "",
      sl_phone: "",
      sl_address: "",
    },
  });

  useEffect(() => {
    suppAPI
      .getByID(id)
      .then((response) => {
        setValue("sl_name", response.sl_name);
        setValue("sl_email", response.sl_email);
        setValue("sl_phone", response.sl_phone);
        setValue("sl_address", response.sl_address);
      })
      .catch((error) => {
        alert("lỗi hệ thống: " + error.message);
      });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await suppAPI.update(id, data);
      setSuccessMessage("Cập nhật thành công");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div className="container-fluid pt-0">
      <h1 className="h3 mb-2 text-gray-800">Sửa thông tin khách hàng</h1>
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
                    <form onSubmit={handleSubmit(onSubmit)} method="post">
                      <div className="form-group">
                        <label htmlFor="sl_name">Tên nhà SX:</label>
                        <input
                          {...register("sl_name", {
                            required: "Họ và tên không được để trống",
                          })}
                          type="text"
                          className={`form-control ${
                            errors.cus_name ? "is-invalid" : "is-valid"
                          }`}
                          id="sl_name"
                          placeholder="Họ và tên"
                        />
                        {errors.sl_name && (
                          <div className="invalid-feedback">
                            {errors.sl_name.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="sl_email">Email:</label>
                        <input
                          {...register("sl_email", {
                            required: "Email không được để trống",
                          })}
                          type="email"
                          className={`form-control ${
                            errors.sl_email ? "is-invalid" : "is-valid"
                          }`}
                          id="sl_email"
                        />
                        {errors.sl_email && (
                          <div className="invalid-feedback">
                            {errors.sl_email.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="sl_phone">Điện thoại:</label>
                        <input
                          {...register("sl_phone", {
                            required: "Số điện thoại không được để trống",
                            pattern: {
                              value: /^\d{10}$/,
                              message: "Số điện thoại không hợp lệ",
                            },
                          })}
                          type="text"
                          className={`form-control ${
                            errors.sl_phone ? "is-invalid" : "is-valid"
                          }`}
                          id="sl_phone"
                        />
                        {errors.cus_phone && (
                          <div className="invalid-feedback">
                            {errors.sl_phone.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="cus_address">Địa chỉ:</label>
                        <input
                          {...register("sl_address", {
                            required: "Địa chỉ không được để trống",
                          })}
                          type="text"
                          className={`form-control ${
                            errors.sl_address ? "is-invalid" : "is-valid"
                          }`}
                          id="sl_address"
                        />
                        {errors.cus_address && (
                          <div className="invalid-feedback">
                            {errors.sl_address.message}
                          </div>
                        )}
                      </div>
                      <div className="m-3">
                        <button type="submit" className="btn btn-success">
                          Cập nhật
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

export default EditSupp;
