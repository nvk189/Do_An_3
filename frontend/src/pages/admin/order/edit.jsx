/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import orderAPI from "../../../service/orderAPI";

const Update = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  // const formatNumber = (value) => {
  //   return value.toLocaleString("vi-VN", {
  //     style: "currency",
  //     currency: "VND",
  //   });
  // };
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    orderAPI
      .getID(id)
      .then((response) => {
        console.log(response);
        setValue("name", response.name);
        setValue("phone", response.phone);
        setValue("address", response.address);
        setValue("total", response.total);
        setProducts(response.orderdetail);
      })
      .catch((error) => {
        alert("Lỗi hệ thống: " + error.message);
      });
  }, [id, setValue]);

  return (
    <div>
      <div className="container-fluid pt-0 ">
        <h1 className="h3 mb-2 text-gray-800">Chi tiết hóa đơn bán</h1>
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <div id="dataTable_wrapper" className="">
                <div className="container">
                  <div className="">
                    <div className="">
                      <form>
                        <div className="col-12" style={{ display: "flex" }}>
                          <div className="col-4">
                            <div className="form-group">
                              <label htmlFor="pp_price">Người nhận:</label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                readOnly
                                placeholder="Tổng tiền"
                                className="form-control"
                                {...register("name", { required: true })}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="pp_price">Số điện thoại:</label>
                              <input
                                type="text"
                                name="phone"
                                id="phone"
                                readOnly
                                placeholder="Tổng tiền"
                                className="form-control"
                                {...register("phone", { required: true })}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="pp_price">Địa chỉ:</label>
                              <input
                                type="text"
                                name="address"
                                id="address"
                                readOnly
                                placeholder="Tổng tiền"
                                className="form-control"
                                {...register("address", { required: true })}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="pp_price">Tổng tiền:</label>
                              <input
                                type="text"
                                name="total"
                                id="total"
                                readOnly
                                placeholder="Tổng tiền"
                                className="form-control"
                                {...register("total", { required: true })}
                              />
                            </div>
                          </div>
                          <div className="col-8">
                            <table
                              className="table table-bordered"
                              width="100%"
                              cellSpacing="0"
                              role="grid"
                              style={{ width: "100%" }}
                            >
                              <thead>
                                <tr>
                                  <th style={{ textAlign: "center" }}>
                                    Tên Sản phẩm
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Hình ảnh
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Số lượng
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Giá nhập
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {products.map((pr, index) => (
                                  <tr className="odd" key={index}>
                                    <td>{pr.detailproduct.pr_name}</td>
                                    <td>
                                      <img
                                        src={`http://localhost:8081/public/image/${pr.detailproduct.pr_image}`}
                                        style={{
                                          maxWidth: "80px",
                                          maxHeight: "80px",
                                          marginTop: "10px",
                                        }}
                                        alt="Product"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        min={1}
                                        style={{
                                          width: "60px",
                                          border: "none",
                                          textAlign: "center",
                                        }}
                                        name={`products[${index}].ip_amount`}
                                        defaultValue={pr.od_quanlity}
                                        {...register(
                                          `products[${index}].ip_amount`,
                                          {
                                            required: true,
                                          }
                                        )}
                                        readOnly
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        min={1}
                                        style={{
                                          border: "none",
                                          textAlign: "center",
                                        }}
                                        name={`products[${index}].ip_price`}
                                        defaultValue={pr.od_price}
                                        {...register(
                                          `products[${index}].ip_price`,
                                          {
                                            required: true,
                                          }
                                        )}
                                        readOnly
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="col-12 text-center p-5">
                          {/* <button type="submit" className="btn btn-primary">
                            Thêm
                          </button> */}
                          <Link
                            to="/orders"
                            type="button"
                            className="btn btn-danger"
                          >
                            Thoát
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
