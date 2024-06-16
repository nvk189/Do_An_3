/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productApi from "../../../service/productApi";
import { useDispatch } from "react-redux";
import { addtoCart } from "../../../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import usePagination from "../../../components/pagination/usePagination";
import Pagination from "../../../components/pagination/paginations";
import { Link } from "react-router-dom";
const details = () => {
  const [product, setProduct] = useState([]);
  const [protype, setProtype] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const itemsPerPage = 4;
  const { id } = useParams();
  const formatNumber = (value) => {
    if (value == null) return "";
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await productApi.getById(id);
      console.log(result);
      setProduct(result.detail);
      setProtype(result.data);
    };
    fetchData();
  }, [id]);

  const handleAddToCart = (product) => {
    dispatch(
      addtoCart({
        id: product.id,
        name: product.pr_name,
        image: product.pr_image,
        quantity: 1,
        price: product.pr_sales ? product.pr_sales : product.pr_price,
      })
    );

    toast.success("Thêm vào giỏ hàng thành công!");
  };
  const handleAddToCartOne = () => {
    if (product) {
      dispatch(
        addtoCart({
          id: product.id,
          name: product.pr_name,
          image: product.pr_image,
          quantity: quantity,
          price: product.pr_sales ? product.pr_sales : product.pr_price,
        })
      );

      toast.success("Thêm vào giỏ hàng thành công!");
    } else {
      toast.warning("Thêm vào giỏ hàng thất bại!");
    }
  };
  const { currentItems, pageCount, handlePageClick } = usePagination(
    protype,
    itemsPerPage
  );
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
        <h1 className="text-center text-white display-6">Chi tiết sản phẩm</h1>
      </div>
      <div className="container-fluid   fruite">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-8 col-xl-12">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="">
                    <a href="#">
                      <img
                        src={`http://localhost:8081/public/image/${product.pr_image}`}
                        className="img-fluid rounded"
                        alt="Image"
                        style={{ width: "600px", height: "500px" }}
                      />
                    </a>
                  </div>
                </div>
                <div className="col-lg-6">
                  <h2 className="fw-bold mb-3">{product.pr_name}</h2>

                  {product.pr_sales !== 0 ? (
                    <div
                      className="d-flex "
                      style={{
                        paddingBottom: "10px",
                      }}
                    >
                      <p
                        className="price text-dark fw-bold mb-0"
                        style={{ fontSize: "30px" }}
                      >
                        {formatNumber(product.pr_sales)}
                      </p>
                      <p
                        className="price text-dark fw-bold mb-0 ms-2"
                        style={{
                          fontSize: "28px",
                          textDecoration: "line-through",
                          opacity: "0.8",
                        }}
                      >
                        {formatNumber(product.pr_price)}
                      </p>
                    </div>
                  ) : (
                    <div className="d-flex " style={{ paddingBottom: "10px" }}>
                      <p
                        className="price text-dark fw-bold mb-0"
                        style={{ fontSize: "30px" }}
                      >
                        {formatNumber(product.pr_price)}
                      </p>
                    </div>
                  )}
                  <div className="d-flex mb-4">
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <p className="mb-4">
                    Hoa giả được phong tặng danh hiệu là “nữ chúa các loài hoa”.
                    Dù được trao tặng cho nhau bất cứ dịp nào, mang lại sự vĩnh
                    cửu theo thời gian.
                  </p>

                  <div
                    className="input-group  mt-4"
                    style={{ width: "130px", display: "flex" }}
                  >
                    <div className="input-group-btn">
                      <button
                        className="btn btn-sm btn-minus rounded-circle bg-light border"
                        onClick={handleDecrement}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                    <input
                      type="number"
                      className=" form-control-sm  border-0 bg-white  w-50 text-center"
                      min={1}
                      value={quantity}
                      readOnly
                    />
                    <div className="input-group-btn">
                      <button
                        className="btn btn-sm btn-plus rounded-circle bg-light border"
                        onClick={handleIncrement}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className=" ">
                    <button
                      className="btn border border-secondary rounded-pill px-3 mt-4 text-primary"
                      onClick={handleAddToCartOne}
                    >
                      + Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
                <div className="col-lg-12">
                  <nav></nav>
                  <div className="tab-content mb-5">
                    <div
                      className=""
                      id="nav-about"
                      role="tabpanel"
                      aria-labelledby="nav-about-tab"
                    >
                      <div className="container my-5 border rounded p-3">
                        <h2>Chi tiết sản phẩm</h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: product.category
                              ? product.category.ct_des1
                              : "",
                          }}
                        />
                      </div>

                      <div className="">
                        <div className="container my-5 border rounded ">
                          <h1>Bình luận</h1>
                          <div
                            className="border-top pt-3"
                            id="nav-mission"
                            role="tabpanel"
                            aria-labelledby="nav-mission-tab"
                          >
                            <div className="d-flex align-items-start mb-3">
                              <i
                                className="bi bi-person-fill"
                                style={{
                                  fontSize: "32px",
                                  padding: "5px 10px",
                                }}
                              ></i>
                              <div>
                                <div className="">
                                  <h5 className="me-3">Nguyễn Việt Hoàn</h5>
                                  <div className="d-flex text-warning">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half-alt"></i>
                                  </div>
                                </div>
                                <p
                                  className="mb-2 text-muted"
                                  style={{ fontSize: "14px" }}
                                >
                                  April 12, 2024
                                </p>
                                <p className="mt-2">Sản phẩm tốt</p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="border-top pt-3"
                            id="nav-mission"
                            role="tabpanel"
                            aria-labelledby="nav-mission-tab"
                          >
                            <div className="d-flex align-items-start mb-3">
                              <i
                                className="bi bi-person-fill"
                                style={{
                                  fontSize: "32px",
                                  padding: "5px 10px",
                                }}
                              ></i>
                              <div>
                                <div className="">
                                  <h5 className="me-3">Nguyễn Văn Long</h5>
                                  <div className="d-flex text-warning">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half-alt"></i>
                                  </div>
                                </div>
                                <p
                                  className="mb-2 text-muted"
                                  style={{ fontSize: "14px" }}
                                >
                                  April 12, 2024
                                </p>
                                <p className="mt-2">Sản phẩm tốt</p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="border-top pt-3"
                            id="nav-mission"
                            role="tabpanel"
                            aria-labelledby="nav-mission-tab"
                          >
                            <div className="d-flex align-items-start mb-3">
                              <i
                                className="bi bi-person-fill"
                                style={{
                                  fontSize: "32px",
                                  padding: "5px 10px",
                                }}
                              ></i>
                              <div>
                                <div className="">
                                  <h5 className="me-3">Nguyễn Văn Khoa</h5>
                                  <div className="d-flex text-warning">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half-alt"></i>
                                  </div>
                                </div>
                                <p
                                  className="mb-2 text-muted"
                                  style={{ fontSize: "14px" }}
                                >
                                  April 12, 2024
                                </p>
                                <p className="mt-2">Sản phẩm tốt</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <h1 className="fw-bold mb-0" style={{ paddingBottom: "20px" }}>
              Sản phẩm
            </h1>
            <div className="row g-4 ">
              {currentItems &&
                currentItems.map((item) => (
                  <div className="col-md-3 col-lg-8 col-xl-3" key={item.id}>
                    <div
                      className="rounded position-relative fruite-item"
                      style={{ margin: "0 15px" }}
                    >
                      <Link to={`/detail/${item.id}`}>
                        <div className="fruite-img">
                          <img
                            src={`http://localhost:8081/public/image/${item.pr_image}`}
                            className="img-fluid w-100 rounded-top"
                            alt=""
                            style={{ height: "250px" }}
                          />
                        </div>
                      </Link>
                      {item.pr_sales !== 0 ? (
                        <div
                          className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                          style={{ top: "10px", left: "10px" }}
                        >
                          {(
                            ((item.pr_price - item.pr_sales) / item.pr_price) *
                            100
                          ).toFixed(2)}
                          %
                        </div>
                      ) : (
                        <div
                          className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                          style={{
                            top: "10px",
                            left: "10px",
                            display: "none",
                          }}
                        >
                          15%
                        </div>
                      )}

                      <div className="p-3 border border-secondary border-top-0 rounded-bottom">
                        <h5 style={{ textAlign: "center" }}>{item.pr_name}</h5>
                        {item.pr_sales !== 0 ? (
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              paddingBottom: "10px",
                            }}
                          >
                            <p
                              className="price text-dark fw-bold mb-0"
                              style={{ fontSize: "20px" }}
                            >
                              {formatNumber(item.pr_sales)}
                            </p>
                            <p
                              className="price text-dark fw-bold mb-0 ms-2"
                              style={{
                                fontSize: "18px",
                                textDecoration: "line-through",
                                opacity: "0.8",
                              }}
                            >
                              {formatNumber(item.pr_price)}
                            </p>
                          </div>
                        ) : (
                          <div
                            className="d-flex justify-content-center flex-lg-wrap"
                            style={{ paddingBottom: "10px" }}
                          >
                            <p className="text-dark fs-5 fw-bold mb-0">
                              {formatNumber(item.pr_price)}
                            </p>
                          </div>
                        )}
                        <div className="d-flex justify-content-center flex-lg-wrap">
                          <button
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                            onClick={() => handleAddToCart(item)}
                          >
                            + giỏ hàng
                          </button>
                        </div>
                      </div>
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
        </div>
      </div>
    </div>
  );
};

export default details;
