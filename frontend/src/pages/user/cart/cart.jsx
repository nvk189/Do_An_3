/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Cart = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [check, setCheck] = useState([]);
  const navigate = useNavigate();

  const formatNumber = (value) => {
    if (value == null) return "";
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("carts");
    if (storedCart) {
      const cart = JSON.parse(storedCart);
      setCart(cart);

      const initialQuantities = {};
      cart.forEach((item) => {
        initialQuantities[item.id] = item.quantity || 1;
      });
      setQuantities(initialQuantities);
    }
  }, []);

  const handleIncrement = (id) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [id]: prevQuantities[id] + 1,
      };
      updateCartInLocalStorage(newQuantities);
      return newQuantities;
    });
  };

  const handleDecrement = (id) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [id]: prevQuantities[id] > 1 ? prevQuantities[id] - 1 : 1,
      };
      updateCartInLocalStorage(newQuantities);
      return newQuantities;
    });
  };

  const handleQuantityChange = (id, value) => {
    if (value >= 1) {
      setQuantities((prevQuantities) => {
        const newQuantities = {
          ...prevQuantities,
          [id]: value,
        };
        updateCartInLocalStorage(newQuantities);
        return newQuantities;
      });
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("carts", JSON.stringify(newCart));

    setQuantities((prevQuantities) => {
      const { [id]: _, ...newQuantities } = prevQuantities;
      return newQuantities;
    });
  };

  const handlRemoveAll = () => {
    setCart([]);
    // localStorage.setItem("carts", JSON.stringify(cart));
    setQuantities({});
  };

  const updateCartInLocalStorage = (newQuantities) => {
    const updatedCart = cart.map((item) => ({
      ...item,
      quantity: newQuantities[item.id],
    }));
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlCheckbox = (product) => {
    setCheck((prevCheck) => {
      if (prevCheck.some((p) => p.id === product.id)) {
        return prevCheck.filter((p) => p.id !== product.id);
      } else {
        return [...prevCheck, product];
      }
    });
  };
  const handleOrder = () => {
    if (check.length > 0) {
      navigate("/order", { state: { check } });
    } else {
      toast.warning("Chọn sản phẩm cần mua ");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div
        className="container-fluid page-header py-5"
        style={{
          backgroundImage:
            "url(https://hoadecor.vn/wp-content/uploads/2021/08/cua-hang-hoa-17.jpg)",
        }}
      >
        <h1 className="text-center text-white display-6">Giỏ hàng</h1>
      </div>

      <div className="container-fluid ">
        <div className="container py-5">
          <div className="table-responsive">
            {cart.length > 0 ? (
              <div className="">
                <div className="">
                  <button
                    type="button"
                    onClick={handlRemoveAll}
                    className="btn border-secondary   text-primary float-end"
                  >
                    Xóa toàn bộ
                  </button>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" style={{ textAlign: "center" }}></th>
                      <th style={{ textAlign: "center" }} scope="col">
                        Hình ảnh
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Tên SP
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Giá
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Số lượng
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Tổng tiền
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <th style={{ textAlign: "center" }}>
                          <input
                            type="checkbox"
                            onChange={() => handlCheckbox(item)}
                            style={{ padding: "10px" }}
                          />
                        </th>
                        <th scope="row" className="text-center">
                          <Link to={`/detail/${item.id}`}>
                            <div className="image-container d-flex justify-content-center align-items-center">
                              <img
                                src={`http://localhost:8081/public/image/${item.image}`}
                                className="img-fluid rounded-circle"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                }}
                                alt=""
                              />
                            </div>
                          </Link>
                        </th>

                        <td style={{ textAlign: "center" }}>
                          <p className="mb-0 mt-4">{item.name}</p>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <p className="mb-0 mt-4">
                            {formatNumber(item.price)}
                          </p>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <div
                            className="input-group mt-4"
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignContent: "center",
                            }}
                          >
                            <div className="input-group-btn">
                              <button
                                className="btn btn-sm btn-minus rounded-circle bg-light border"
                                onClick={() => handleDecrement(item.id)}
                              >
                                <i className="fa fa-minus"></i>
                              </button>
                            </div>
                            <input
                              type="number"
                              className="form-control-sm border-0 bg-white w-50 text-center"
                              min={1}
                              value={quantities[item.id]}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  Number(e.target.value)
                                )
                              }
                              style={{ maxWidth: "60px", textAlign: "center" }}
                            />
                            <div className="input-group-btn">
                              <button
                                className="btn btn-sm btn-plus rounded-circle bg-light border"
                                onClick={() => handleIncrement(item.id)}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <p className="mb-0 mt-4">
                            {formatNumber(item.price * quantities[item.id])}
                          </p>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            className="btn btn-md rounded-circle bg-light border mt-4"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <i className="fa fa-times text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={5} className="text-end">
                        <p className="pt-3 mb-0">Tổng tiền:</p>
                      </td>
                      <td colSpan={2} className="text-center align-middle">
                        <p className="pt-3 mb-0">
                          {formatNumber(
                            cart.reduce(
                              (total, item) =>
                                total + item.price * quantities[item.id],
                              0
                            )
                          )}
                        </p>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div className="mt-5">
                  <button
                    onClick={handleOrder}
                    className="btn border-secondary rounded-pill px-4 py-3 text-primary float-end"
                    type="button"
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-content-center ">
                <h3 className="">Giỏ hàng trống</h3>
                <div className="mt-5">
                  <Link to="/home">
                    <button className="btn border-secondary rounded-pill px-4 py-3 text-primary float-end">
                      Tiếp tục mua sắm
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
