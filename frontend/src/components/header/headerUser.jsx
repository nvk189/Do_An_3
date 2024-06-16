/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useAuth from "../../auth/useAuth";
import NavDropdown from "react-bootstrap/NavDropdown";
const headerUser = () => {
  const { auth, id, mess, logout } = useAuth();
  const cartFromRedux = useSelector((state) => state.cart.cart);
  const [cart, setCart] = useState([]);
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const handleSearchChange = (event) => {
    setKey(event.target.value);
  };

  useEffect(() => {
    setCart(cartFromRedux);
  }, [cartFromRedux]);

  return (
    <div>
      <div className="container-fluid fixed-top">
        <div
          className="container topbar bg-primary d-none d-lg-block"
          style={{ height: "3rem" }}
        >
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2">
              <small className="me-3">
                <i className="fas fa-map-marker-alt me-2 text-secondary"></i>{" "}
                <a href="#" className="text-white">
                  HotLine:1234455
                </a>
              </small>
              <small className="me-3">
                <i className="fas fa-envelope me-2 text-secondary"></i>
                <a href="#" className="text-white">
                  Email@Example.com
                </a>
              </small>
            </div>
            <div className="top-link pe-2">
              <a href="#" className="text-white">
                <small className="text-white mx-2">Chính sách bảo hành</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white mx-2">Điều khoản sử dụng</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white ms-2">Chính sách đổi trả</small>
              </a>
            </div>
          </div>
        </div>
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <Link to="/home" className="navbar-brand">
              <img
                src="https://www.flowercorner.vn/image/catalog/common/shop-hoa-tuoi-flowercorner-logo.png.webp"
                alt=""
                style={{ width: "270px", height: "70px" }}
              />
            </Link>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary"></span>
            </button>
            <div
              className="collapse navbar-collapse bg-white"
              id="navbarCollapse"
            >
              <div className="navbar-nav mx-auto">
                <Link to="/home" className="nav-item nav-link ">
                  Trang chủ
                </Link>
                <Link to="/product" className="nav-item nav-link">
                  Sản phẩm
                </Link>

                <Link to="/cart" className="nav-item nav-link">
                  Giỏ hàng
                </Link>

                <Link to="/hisorder" className="nav-item nav-link">
                  Đơn hàng
                </Link>
              </div>
              <div className="d-flex m-3 me-0">
                <div className="d-flex">
                  <div className="">
                    <div className="d-flex justify-content-center align-content-center mr-4">
                      <input
                        type="text"
                        className="form-control"
                        name="search"
                        style={{
                          width: "250px",
                          height: "40px",
                          paddingRight: "40px",
                          listStyle: "none",
                        }}
                        placeholder="Tìm kiếm"
                        onChange={handleSearchChange}
                      />
                      <Link to={`/prosearch/${key}`}>
                        <i
                          className="fas fa-search text-primary"
                          style={{
                            marginLeft: "-25px",
                            fontSize: "20px",
                            cursor: "pointer",
                            marginTop: "10px",
                          }}
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <a
                    href="/cart"
                    id="shopcart"
                    className=" me-4 my-auto mycarrt "
                    style={{ position: "relative", cursor: "pointer" }}
                  >
                    <i
                      className="fa fa-shopping-bag fa-2x "
                      style={{ color: "#ed6b87" }}
                    ></i>
                    <span
                      className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                      style={{
                        top: "-8px",
                        left: "15px",
                        height: "20px",
                        minWidth: "20px",
                      }}
                    >
                      {cart.length}
                    </span>
                  </a>
                  {auth ? (
                    <NavDropdown
                      title={
                        <i
                          className="fas fa-user fa-2x"
                          style={{ color: "#ed6b87", paddingLeft: "0" }}
                        ></i>
                      }
                    >
                      <NavDropdown.Item href="/account">
                        Tài khoản
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/hisorder">
                        Đơn hàng
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => {
                          logout();
                          navigate("/home");
                        }}
                      >
                        Đăng Xuất
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <NavDropdown
                      title={
                        <i
                          className="fas fa-user fa-2x"
                          style={{ color: "#ed6b87", paddingLeft: "0" }}
                        ></i>
                      }
                    >
                      <NavDropdown.Item href="/register">
                        Đăng ký
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/login">
                        Đăng nhập
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default headerUser;
{
  /* <div className="list_cart "  >

                                        <ul id="cart" className='cart' >
                                            <li >
                                                <div className="d-flex  justify-content-between align-content-center " style={{padding:'15px 10px'}}>
                                                   
                                                        <img src="https://8384f55340.vws.vegacdn.vn/image/cache/catalog/products/August%202023/bo-hoa-huong-duong-loi-cam-on.jpg.webp" style={{width:"70px", height:'70px', borderRadius:'3px'}} alt="" />
                                                        <div className="d-flex  justify-content-between align-content-center">
                                                            <p>tên hang </p>
                                                            <p>soosl ượng</p>
                                                            <p>giá tiền</p>
                                                        </div>
                                                    
                                                    <div className="">
                                                        <button className="btn btn-md rounded-circle bg-light border mt-4 bg-white"><i className="fa fa-times text-danger"></i></button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li >
                                                <div className="d-flex  justify-content-between align-content-center " style={{padding:'15px 10px'}}>
                                                    <img src="https://8384f55340.vws.vegacdn.vn/image/cache/catalog/products/August%202023/bo-hoa-huong-duong-loi-cam-on.jpg.webp" style={{width:"70px", height:'70px', borderRadius:'3px'}} alt="" />
                                                    <div className="d-flex  justify-content-between align-content-center">
                                                        <p>tên hang </p>
                                                        <p>soosl ượng</p>
                                                        <p>giá tiền</p>
                                                    </div>
                                                    <div className="">
                                                        <button className="btn btn-md rounded-circle bg-light border mt-4 bg-white"><i className="fa fa-times text-danger"></i></button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li >
                                                <div className="d-flex  justify-content-between align-content-center " style={{padding:'15px 10px'}}>
                                                    <img src="https://8384f55340.vws.vegacdn.vn/image/cache/catalog/products/August%202023/bo-hoa-huong-duong-loi-cam-on.jpg.webp" style={{width:"70px", height:'70px', borderRadius:'3px'}} alt="" />
                                                    <div className="d-flex  justify-content-between align-content-center">
                                                        <p>tên hang </p>
                                                        <p>soosl ượng</p>
                                                        <p>giá tiền</p>
                                                    </div>
                                                    <div className="">
                                                        <button className="btn btn-md rounded-circle bg-light border mt-4 bg-white"><i className="fa fa-times text-danger"></i></button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li >
                                                <div className="d-flex  justify-content-between align-content-center " style={{padding:'15px 10px'}}>
                                                    <img src="https://8384f55340.vws.vegacdn.vn/image/cache/catalog/products/August%202023/bo-hoa-huong-duong-loi-cam-on.jpg.webp" style={{width:"70px", height:'70px', borderRadius:'3px'}} alt="" />
                                                    <div className="d-flex  justify-content-between align-content-center">
                                                        <p>tên hang </p>
                                                        <p>soosl ượng</p>
                                                        <p>giá tiền</p>
                                                    </div>
                                                    <div className="">
                                                        <button className="btn btn-md rounded-circle bg-light border mt-4 bg-white"><i className="fa fa-times text-danger"></i></button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li >
                                                <div className="d-flex  justify-content-between align-content-center " style={{padding:'15px 10px'}}>
                                                    <img src="https://8384f55340.vws.vegacdn.vn/image/cache/catalog/products/August%202023/bo-hoa-huong-duong-loi-cam-on.jpg.webp" style={{width:"70px", height:'70px', borderRadius:'3px'}} alt="" />
                                                    <div className="d-flex  justify-content-between align-content-center">
                                                        <p>tên hang </p>
                                                        <p>soosl ượng</p>
                                                        <p>giá tiền</p>
                                                    </div>
                                                    <div className="">
                                                        <button className="btn btn-md rounded-circle bg-light border mt-4 bg-white"><i className="fa fa-times text-danger"></i></button>
                                                    </div>
                                                </div>
                                            </li>
                                        
                                        </ul>
                                        <div className="" style={{position:'absolute', backgroundColor:'white',top:'308px', borderRadius:'2px', width:'500px', right:'0px'  }}>
                                                <div className="d-flex p-2 justify-content-lg-end">

                                                <span>Tổng tiền:</span>
                                                <span>3438234</span>
                                                </div>
                                                <div className="d-flex p-2 justify-content-lg-end">
                                                    <Link to="/cart">Giỏ hàng</Link>
                                                </div>

                                        </div>
                                    </div> */
}
