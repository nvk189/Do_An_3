/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router-dom";
const notificationOrder = () => {
  const location = useLocation();
  const orderId = location.state || { orderId: [] };
  console.log(orderId.orderId);
  return (
    <div>
      <div
        className="container-fluid  page-header "
        style={{ backgroundColor: "#ccc" }}
      >
        <div className="container py-5 d-flex justify-content-center  align-content-center ">
          <div className="shadow-lg p-3 mb-5 bg-white rounded py-10">
            <div className="d-flex justify-content-center">
              <i
                className="bi bi-check-circle"
                style={{ fontSize: "80px", color: "rgba(54,122,50,1)" }}
              ></i>
            </div>
            <div className="">
              <h4> Đơn hàng đã gửi yêu cầu hủy</h4>
            </div>
            <div className="d-flex justify-content-center">
              <a
                href="/home"
                className="btn border-secondary   text-primary "
                style={{ marginRight: "20px" }}
              >
                Trang chủ
              </a>
              <a
                href={`/detailOrder/${orderId.orderId}`}
                className="btn border-secondary   text-primary"
              >
                Đơn hàng
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default notificationOrder;
