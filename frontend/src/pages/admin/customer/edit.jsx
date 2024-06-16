import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import customerAPI from "../../../service/customerAPI";

const EditCustomer = () => {
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cus_name: "",
      cus_email: "",
      cus_phone: "",
      cus_address: "",
    },
  });

  useEffect(() => {
    customerAPI
      .getByID(id)
      .then((response) => {
        setValue("cus_name", response.cus_name);
        setValue("cus_email", response.cus_email);
        setValue("cus_phone", response.cus_phone);
        setValue("cus_address", response.cus_address);
      })
      .catch((error) => {
        alert("lỗi hệ thống: " + error.message);
      });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await customerAPI.update(id, data);
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
                        <label htmlFor="cus_name">Họ và tên:</label>
                        <input
                          {...register("cus_name", {
                            required: "Họ và tên không được để trống",
                          })}
                          type="text"
                          className={`form-control ${
                            errors.cus_name ? "is-invalid" : "is-valid"
                          }`}
                          id="cus_name"
                          placeholder="Họ và tên"
                        />
                        {errors.cus_name && (
                          <div className="invalid-feedback">
                            {errors.cus_name.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="cus_email">Email:</label>
                        <input
                          {...register("cus_email", {
                            required: "Email không được để trống",
                          })}
                          type="email"
                          className={`form-control ${
                            errors.cus_email ? "is-invalid" : "is-valid"
                          }`}
                          id="cus_email"
                        />
                        {errors.cus_email && (
                          <div className="invalid-feedback">
                            {errors.cus_email.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="cus_phone">Điện thoại:</label>
                        <input
                          {...register("cus_phone", {
                            required: "Số điện thoại không được để trống",
                            pattern: {
                              value: /^\d{10}$/,
                              message: "Số điện thoại không hợp lệ",
                            },
                          })}
                          type="text"
                          className={`form-control ${
                            errors.cus_phone ? "is-invalid" : "is-valid"
                          }`}
                          id="cus_phone"
                        />
                        {errors.cus_phone && (
                          <div className="invalid-feedback">
                            {errors.cus_phone.message}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="cus_address">Địa chỉ:</label>
                        <input
                          {...register("cus_address", {
                            required: "Địa chỉ không được để trống",
                          })}
                          type="text"
                          className={`form-control ${
                            errors.cus_address ? "is-invalid" : "is-valid"
                          }`}
                          id="cus_address"
                        />
                        {errors.cus_address && (
                          <div className="invalid-feedback">
                            {errors.cus_address.message}
                          </div>
                        )}
                      </div>
                      <div className="m-3">
                        <button type="submit" className="btn btn-success">
                          Cập nhật
                        </button>
                        <a className="btn btn-primary" href="/cus">
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

export default EditCustomer;
