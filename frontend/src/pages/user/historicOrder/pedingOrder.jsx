/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import orderAPI from "../../../service/orderAPI";
import useAuth from "../../../auth/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import usePagination from "../../../components/pagination/usePagination";
import Pagination from "../../../components/pagination/paginations";
const PendingOrder = () => {
  const { id } = useAuth();
  const [orders, setOrders] = useState([]);
  const itemsPerPage = 9;
  const navigate = useNavigate();
  const formatNumber = (value) => {
    if (value == null) return "";
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    orderAPI
      .getCusID(id)
      .then((response) => {
        console.log(response);
        setOrders(response.cxn);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleFailOrder = (orderId) => {
    orderAPI
      .updateStatus(orderId)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
    navigate("/notificationFail", { state: { orderId } });
  };
  const { currentItems, pageCount, handlePageClick } = usePagination(
    orders,
    itemsPerPage
  );
  return (
    <div className="container mt-5">
      {orders.length > 0 ? (
        <div className="row">
          <ToastContainer />
          <div className="col-md-12">
            {currentItems.map((order) => (
              <div key={order.id} className="card mb-4">
                <div className="card-header">
                  <div className="float-start">
                    <p>
                      Ngày đặt hàng:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="">
                    <a
                      onClick={() => handleFailOrder(order.id)}
                      href=""
                      className="btn border-secondary   text-primary float-end"
                    >
                      Hủy đơn hàng
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tổng tiền</th>
                      </tr>
                    </thead>

                    <tbody>
                      {order.orderdetail.map((detail) => (
                        <tr key={detail.id}>
                          <td style={{ width: "15%" }}>
                            <img
                              src={`http://localhost:8081/public/image/${detail.detailproduct.pr_image}`}
                              alt={detail.detailproduct.pr_name}
                              className="img-fluid"
                              style={{ maxWidth: "100px", maxHeight: "100px" }}
                            />
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {detail.detailproduct.pr_name}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {formatNumber(detail.od_price)}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {detail.od_quanlity}
                          </td>
                          <td style={{ verticalAlign: "middle" }}>
                            {formatNumber(detail.od_price * detail.od_quanlity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer">
                  <p className="text-end">
                    Tổng thanh toán: {formatNumber(order.total)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="d-flex justify-content-center align-content-center "
            style={{ marginTop: "20px" }}
          >
            <Pagination
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
      ) : (
        <div className="text-center">Không có đơn hàng nào.</div>
      )}
    </div>
  );
};

export default PendingOrder;
