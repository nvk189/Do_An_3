import { Link } from "react-router-dom";
const footerUser = () => {
  return (
    <div>
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 w-100%">
        <div className="container py-5">
          <div
            className="pb-4 mb-4"
            style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}
          >
            <div className="row g-4">
              <div className="col-lg-6">
                <Link to="/home" className="navbar-brand">
                  <img
                    src="https://www.flowercorner.vn/image/catalog/common/shop-hoa-tuoi-flowercorner-logo.png.webp"
                    alt=""
                    style={{ width: "270px", height: "70px" }}
                  />
                </Link>
              </div>

              <div className="col-lg-6">
                <div className="d-flex justify-content-end pt-3">
                  <a
                    className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a
                    className="btn btn-outline-secondary btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">
                  Lý do bạn nên chọn chúng tôi ?
                </h4>
                <p className="mb-4">
                  Chúng tôi có tuổi đời từ năm 1960 tổn tại và phát triển sản
                  phẩm với nhiều mẫu mã , đa dạng, dịch vụ của chúng tôi luôn
                  được khách hàng hài lòng
                </p>
                <a
                  href=""
                  className="btn border-secondary py-2 px-4 rounded-pill text-primary"
                >
                  Đọc thêm
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Chăm sóc khách hàng</h4>
                <a className="btn-link" href="">
                  Giới Thiệu
                </a>
                <a className="btn-link" href="">
                  Liên hệ
                </a>
                <a className="btn-link" href="">
                  Chính sách vận chuyển
                </a>
                <a className="btn-link" href="">
                  Câu hỏi thường gặp
                </a>
                <a className="btn-link" href="">
                  Hình thức thanh toán
                </a>
                <a className="btn-link" href="">
                  Bảo mật thông tin
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Theo dõi</h4>
                <a className="btn-link" href="">
                  <i
                    className="bi bi-facebook"
                    style={{ paddingRight: "6px" }}
                  ></i>
                  Facebook
                </a>
                <a className="btn-link" href="">
                  <i
                    className="bi bi-instagram"
                    style={{ paddingRight: "6px" }}
                  ></i>
                  Instargram
                </a>
                <a className="btn-link" href="">
                  <i
                    className="bi bi-youtube"
                    style={{ paddingRight: "6px" }}
                  ></i>
                  Youtube
                </a>
                <a className="btn-link" href="">
                  <i
                    className="bi bi-twitter"
                    style={{ paddingRight: "6px" }}
                  ></i>
                  Twitter
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Địa chỉ</h4>
                <p>
                  Cửa hàng chính:: 142 Nguyễn Văn Cừ, Phường Nguyễn Cư Trinh,
                  Quận 1, TP.HCM
                </p>
                <p>
                  Cửa Hàng TP.HCM: 225/3 Nguyễn Đình Chiểu, Phường 5, Quận 3,
                  TP.HCM
                </p>
                <p>Chi nhánh Hà Nội: 65 Trần Phú, Ba Đình, Hà Nội</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default footerUser;
