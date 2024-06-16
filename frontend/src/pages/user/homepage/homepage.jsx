/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeApi from "../../../service/homeAPI";
import { useDispatch } from "react-redux";
import { addtoCart } from "../../../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const homepage = () => {
  const [data, setData] = useState([]);
  const [hot, setHot] = useState([]);
  const dispatch = useDispatch();
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
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };
  const formatNumber = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      return (
        (prevIndex + 1) % document.querySelectorAll(".carousel-item").length
      );
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0
        ? document.querySelectorAll(".carousel-item").length - 1
        : prevIndex - 1;
    });
  };

  // sản phẩm mới
  useEffect(() => {
    HomeApi.productSales()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("lỗi hệ thống:", error);
      });
  }, []);

  // sản phẩm bán chạy
  useEffect(() => {
    HomeApi.productHot()
      .then((response) => {
        setHot(response);
      })
      .catch((error) => {
        console.error("lỗi hệ thống:", error);
      });
  }, []);

  return (
    <div>
      <div
        className="container-fluid  mb-5 hero-header"
        style={{ backgroundColor: "transparent", backgroundImage: "none" }}
      >
        <div className="container ">
          <div className="row g-5 align-items-center">
            <div
              className="col-md-12 col-lg-12"
              style={{ backgroundColor: "transparent" }}
            >
              <div
                id="carouselId"
                className="carousel slide position-relative"
                data-bs-ride="carousel"
                style={{ backgroundColor: "transparent" }}
              >
                <div
                  className="carousel-inner"
                  role="listbox"
                  style={{ maxHeight: "400px", backgroundColor: "transparent" }}
                >
                  <div
                    className={`carousel-item${
                      currentIndex === 0 ? " active" : ""
                    } rounded`}
                  >
                    <img
                      src="https://in.flowercorner.vn/uploads/P6603bca98a95a8.67175147.webp"
                      className="img-fluid w-100 h-100 bg-secondary rounded"
                      alt="First slide"
                    />
                  </div>
                  <div
                    className={`carousel-item${
                      currentIndex === 1 ? " active" : ""
                    } rounded`}
                  >
                    <img
                      src="https://in.flowercorner.vn/uploads/P649ea8ef2ed4f0.09844576.webp"
                      className="img-fluid w-100 h-100 rounded"
                      alt="Second slide"
                    />
                  </div>
                  <div
                    className={`carousel-item${
                      currentIndex === 2 ? " active" : ""
                    } rounded`}
                  >
                    <img
                      src="https://in.flowercorner.vn/uploads/P657fd247737038.75342862.webp"
                      className="img-fluid w-100 h-100 rounded"
                      alt="Second slide"
                    />
                  </div>
                  <div
                    className={`carousel-item${
                      currentIndex === 3 ? " active" : ""
                    } rounded`}
                  >
                    <img
                      src="https://in.flowercorner.vn/uploads/P657fd247737038.75342862.webp"
                      className="img-fluid w-100 h-100 rounded"
                      alt="Second slide"
                    />
                  </div>
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselId"
                  data-bs-slide="prev"
                  onClick={prevSlide}
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselId"
                  data-bs-slide="next"
                  onClick={nextSlide}
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  Sản phẩm khuyến mãi */}
      <ToastContainer />
      <div className="container-fluid fruite ">
        <div className="container py-5">
          <div className="tab-class text-center">
            <div
              className="text-center mx-auto mb-5"
              style={{ maxWidth: "700px" }}
            >
              <h3 className="display-5">Sản phẩm khuyến mãi</h3>
            </div>
            <div className="g-4 ">
              <div className="slider-container ">
                <Slider {...settings}>
                  {data.map((product) => (
                    <div
                      className="col-md-6 col-lg-8 col-xl-12"
                      key={product.id}
                    >
                      <div
                        className="rounded position-relative fruite-item"
                        style={{ margin: "0 15px" }}
                      >
                        <Link to={`/detail/${product.id}`}>
                          <div className="fruite-img">
                            <img
                              src={`http://localhost:8081/public/image/${product.pr_image}`}
                              className="img-fluid w-100 rounded-top"
                              alt=""
                              style={{ height: "250px" }}
                            />
                          </div>
                        </Link>
                        {product.pr_sales !== 0 ? (
                          <div
                            className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                            style={{ top: "10px", left: "10px" }}
                          >
                            {(
                              ((product.pr_price - product.pr_sales) /
                                product.pr_price) *
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
                          <h5>{product.pr_name}</h5>
                          {product.pr_sales !== 0 ? (
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
                                {formatNumber(product.pr_sales)}
                              </p>
                              <p
                                className="price text-dark fw-bold mb-0 ms-2"
                                style={{
                                  fontSize: "18px",
                                  textDecoration: "line-through",
                                  opacity: "0.8",
                                }}
                              >
                                {formatNumber(product.pr_price)}
                              </p>
                            </div>
                          ) : (
                            <div
                              className="d-flex justify-content-center flex-lg-wrap"
                              style={{ paddingBottom: "10px" }}
                            >
                              <p className="text-dark fs-5 fw-bold mb-0">
                                {formatNumber(product.pr_price)}
                              </p>
                            </div>
                          )}
                          <div className="d-flex justify-content-center flex-lg-wrap">
                            <button
                              className="btn border border-secondary rounded-pill px-3 text-primary"
                              onClick={() => handleAddToCart(product)}
                            >
                              + giỏ hàng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* chính sách */}
      <div className="container-fluid featurs py-3">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                  <i className="fas fa-car-side fa-3x text-white"></i>
                </div>
                <div className="featurs-content text-center">
                  <h5>Miễn phí vận chuyển</h5>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                  <i className="fas fa-user-shield fa-3x text-white"></i>
                </div>
                <div className="featurs-content text-center">
                  <h5>Thanh toán bảo mật</h5>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                  <i className="fas fa-exchange-alt fa-3x text-white"></i>
                </div>
                <div className="featurs-content text-center">
                  <h5>Đổi hàng rong vòng 3 ngày</h5>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                  <i className="fa fa-phone-alt fa-3x text-white"></i>
                </div>
                <div className="featurs-content text-center">
                  <h5>Hỗ trợ 24/7 </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* sản phẩm bán chạy */}

      <div className="container-fluid fruite ">
        <div className="container py-5">
          <div
            className="text-center mx-auto mb-5"
            style={{ maxWidth: "700px" }}
          >
            <h3 className="display-5">Sản phẩm bán chạy</h3>
          </div>
          <div className="tab-class text-center ">
            <div className="g-4 ">
              <div className="slider-container d-flex">
                {hot.map((product) => (
                  <div className="col-md-6 col-lg-8 col-xl-3" key={product.id}>
                    <div
                      className="rounded position-relative fruite-item"
                      style={{ margin: "0 15px" }}
                    >
                      <Link to={`/detail/${product.id}`}>
                        <div className="fruite-img">
                          <img
                            src={`http://localhost:8081/public/image/${product.pr_image}`}
                            className="img-fluid w-100 rounded-top"
                            alt=""
                            style={{ height: "250px" }}
                          />
                        </div>
                      </Link>
                      {product.pr_sales !== 0 ? (
                        <div
                          className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                          style={{ top: "10px", left: "10px" }}
                        >
                          {(
                            ((product.pr_price - product.pr_sales) /
                              product.pr_price) *
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
                        <h5>{product.pr_name}</h5>
                        {product.pr_sales !== 0 ? (
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
                              {formatNumber(product.pr_sales)}
                            </p>
                            <p
                              className="price text-dark fw-bold mb-0 ms-2"
                              style={{
                                fontSize: "18px",
                                textDecoration: "line-through",
                                opacity: "0.8",
                              }}
                            >
                              {formatNumber(product.pr_price)}
                            </p>
                          </div>
                        ) : (
                          <div
                            className="d-flex justify-content-center flex-lg-wrap"
                            style={{ paddingBottom: "10px" }}
                          >
                            <p className="text-dark fs-5 fw-bold mb-0">
                              {formatNumber(product.pr_price)}
                            </p>
                          </div>
                        )}
                        <div className="d-flex justify-content-center flex-lg-wrap">
                          <button
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                            onClick={() => handleAddToCart(product)}
                          >
                            + giỏ hàng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  giới thiệu cửa hàng */}
      <div className="container-fluid banner bg-secondary my-5">
        <div className="container py-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="py-4">
                <h2 className="display-3 text-white">
                  Giới Thiệu Về FlowerCorner.vn
                </h2>
                <span className="text-content-list">
                  <span className="text-content-1">Shop hoa tươi </span>
                  FlowerCorner.vn là một trong những tiệm hoa tươi uy tín nhất
                  tại TP HCM, Việt Nam. FlowerCorner.vn cung cấp dịch vụ đặt hoa
                  online giao tận nơi tại TP HCM, Hà Nội và trên tất cả các tỉnh
                  – thành phố tại Việt Nam. Với hệ thống cửa hàng hoa tươi liên
                  kết rộng khắp tất cả các tỉnh – thành phố trên toàn quốc,
                  FlowerCorner.vn có thể giúp bạn gửi tặng hoa tươi cho người
                  thân ở bất cứ nơi đâu tại Việt Nam. FlowerCorner cam kết mang
                  đến cho bạn những sản phẩm hoa tươi chất lượng cao, với mức
                  giá tốt nhất và dịch chuyên nghiệp nhất khi sử dụng dịch vụ
                  đặt hoa tươi online giao tận nơi tại Flowercorner.vn.
                </span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <div className="video-shop-pa">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/slv6L1Bzk14?si=b3J5QPLl8er18aW2"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  thống kê khách hàng */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="bg-light p-5 rounded">
            <div className="row g-4 justify-content-center">
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="counter bg-white rounded p-5">
                  <i className="fa fa-users text-secondary"></i>
                  <h4>khách hàng hài lòng</h4>
                  <h1>1963</h1>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="counter bg-white rounded p-5">
                  <i className="fa fa-users text-secondary"></i>
                  <h4>CHẤT LƯỢNG DỊCH VỤ</h4>
                  <h1>99%</h1>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="counter bg-white rounded p-5">
                  <i className="fa fa-users text-secondary"></i>
                  <h4>GIẤY CHỨNG NHẬN </h4>
                  <h1>33</h1>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="counter bg-white rounded p-5">
                  <i className="fa fa-users text-secondary"></i>
                  <h4>SẢN PHẨM CÓ SẴN</h4>
                  <h1>789</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default homepage;
