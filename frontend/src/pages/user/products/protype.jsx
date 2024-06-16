import { useEffect, useState } from "react";
import Product from "../../../service/productApi";
import Protype from "../../../service/protypeAPI";
import { useDispatch } from "react-redux";
import { addtoCart } from "../../../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePagination from "../../../components/pagination/usePagination";
import Pagination from "../../../components/pagination/paginations";
import { Link, useParams } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [protype, setProtype] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  const { id } = useParams();

  const formatNumber = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    Protype.getAll()
      .then((response) => {
        setProtype(response);
        const category = response.find((cat) => cat.id === parseInt(id, 10));
        if (category) {
          setCategoryName(category.pt_name);
        }
      })
      .catch((error) => {
        alert("Lỗi hệ thống: " + error.message);
      });
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Product.getAllType(id);
      setData(result);
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

  const { currentItems, pageCount, handlePageClick } = usePagination(
    data,
    itemsPerPage
  );

  return (
    <div>
      <div
        className="container-fluid page-header py-5 row"
        style={{
          backgroundImage:
            "url(https://hoadecor.vn/wp-content/uploads/2021/08/cua-hang-hoa-17.jpg)",
        }}
      >
        <h1 className="text-center text-white display-6">Danh mục sản phẩm</h1>
      </div>
      <div className="container-fluid fruite">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-lg-3">
              <div className="card">
                <div
                  className="card-header d-flex align-items-center"
                  style={{ backgroundColor: "#ed6b87", color: "#fff" }}
                >
                  <i className="fa fa-bars mr-2"></i>
                  <span>Danh mục sản phẩm</span>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <Link to="/product">Tất cả sản phẩm</Link>
                  </li>
                  {protype.map((item) => (
                    <li key={item.id} className="list-group-item">
                      <Link to={`/protype/${item.id}`}>{item.pt_name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="row g-4">
                    <div className="m-0 px-4">
                      <h4>Danh mục / {categoryName}</h4>
                      <h5>Số lượng: {currentItems.length}</h5>
                    </div>
                    {currentItems.map((product) => (
                      <div
                        className="col-md-3 col-lg-8 col-xl-4"
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
                            <h5 style={{ textAlign: "center" }}>
                              {product.pr_name}
                            </h5>
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
                  <div
                    className="d-flex justify-content-center align-content-center"
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
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Products;
