import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import authRegister from "../../../service/authAPI";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await authRegister.register(data);
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng ký tài khoản:", error);
    }
  };

  return (
    <div className="container h-100 d-flex align-items-center justify-content-center  page-header">
      <div className="row d-flex justify-content-center align-items-center w-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{ borderRadius: "15px" }}>
            <div className="card-body p-5 card bg-dark text-white">
              <h2
                className="text-uppercase text-center mb-5"
                style={{ color: "white" }}
              >
                Đăng ký tài khoản
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-4">
                  <label className="form-label" htmlFor="form3Example1cg">
                    Họ và tên
                  </label>
                  <input
                    {...register("cus_name", { required: true })}
                    type="text"
                    id="form3Example1cg"
                    className="form-control form-control-lg"
                    placeholder="Nhập họ và tên"
                  />
                  {errors.cus_name && (
                    <span className="text-danger">
                      Họ và tên không được để trống
                    </span>
                  )}
                </div>

                <div className="form-group mb-4">
                  <label className="form-label" htmlFor="form3Example3cg">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    })}
                    type="email"
                    id="form3Example3cg"
                    className="form-control form-control-lg"
                    placeholder="Nhập email"
                  />
                  {errors.email && (
                    <span className="text-danger">Email không hợp lệ</span>
                  )}
                </div>

                <div className="form-group mb-4">
                  <label className="form-label" htmlFor="form3Example4cg">
                    Mật khẩu
                  </label>
                  <input
                    {...register("password", { required: true, minLength: 6 })}
                    type="password"
                    id="form3Example4cg"
                    className="form-control form-control-lg"
                    placeholder="Nhập mật khẩu"
                  />
                  {errors.password && (
                    <span className="text-danger">
                      Mật khẩu phải có ít nhất 6 ký tự
                    </span>
                  )}
                </div>

                <div className="form-check d-flex mb-4">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="form2Example3cg"
                    {...register("terms", { required: true })}
                  />
                  <label className="form-check-label" htmlFor="form2Example3cg">
                    Bạn đồng ý với những{" "}
                    <a href="#!" className="text-body">
                      <u>điều khoản</u>
                    </a>
                  </label>
                  {errors.terms && (
                    <span className="text-danger ms-2">
                      Bạn phải đồng ý với các điều khoản
                    </span>
                  )}
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg"
                    style={{ backgroundColor: " rgb(78, 115, 223)" }}
                  >
                    Đăng ký
                  </button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">
                  Bạn đã có tài khoản?{" "}
                  <a href="/login" className="fw-bold text-body">
                    <u>Đăng nhập</u>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
