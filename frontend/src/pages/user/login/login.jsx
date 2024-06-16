import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/login", values, {
        withCredentials: true,
      });
      if (res.data.Status === "ok") {
        navigate("/home ");
      } else {
        toast.warning("Tài khoản không tồn tại");
      }
    } catch (err) {
      console.log(err);
      toast.warning("Tài khoản hoặc mật khật không đúng");
    }
  };

  return (
    <div
      className="container h-100 d-flex align-items-center justify-content-center page-header "
      style={{ backgroundColor: "transparent " }}
    >
      <ToastContainer />
      <div className="col-12 col-md-9 col-lg-7 col-xl-6 py-10">
        <div
          className="card bg-dark text-white"
          style={{ borderRadius: "15px" }}
        >
          <div className="card-body p-5">
            <h2
              className="text-uppercase text-center mb-5"
              style={{ color: "white" }}
            >
              Đăng Nhập
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  type="email"
                  name="email"
                  id="email"
                  className="form-control form-control-lg"
                  placeholder="Nhập Email"
                  required
                />
              </div>

              <div className="form-group mb-4">
                <div className="d-flex justify-content-between">
                  <label className="form-label" htmlFor="password">
                    Mật khẩu :
                  </label>
                  <a href="#" className="text-muted">
                    Quên mật khẩu?
                  </a>
                </div>
                <input
                  onChange={(e) =>
                    setValues({ ...values, pass: e.target.value })
                  }
                  type="password"
                  name="pass"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success btn-block btn-lg"
                  style={{ backgroundColor: " rgb(78, 115, 223" }}
                >
                  Đăng nhập
                </button>
              </div>

              <p className="text-center text-muted mt-5 mb-0">
                Bạn chưa có tài khoản?{" "}
                <a
                  href="/register"
                  className="fw-bold text-body"
                  style={{ color: "white" }}
                >
                  <u>Đăng ký</u>
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
