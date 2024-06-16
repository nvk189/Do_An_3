import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import suppAPI from "../../../service/suppAPI";
import importAPI from "../../../service/proImport";

const Update = () => {
  const [supp, setSupp] = useState([]);
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
    suppAPI
      .getAll()
      .then((response) => {
        setSupp(response);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
      });
  }, []);

  useEffect(() => {
    importAPI
      .getById(id)
      .then((response) => {
        console.log(response);
        setValue("sl_id", response.sl_id);
        setValue("pp_start", response.pp_start.split("T")[0]); // formatting date
        setValue("pp_price", response.pp_price);
        setValue("pp_amonut", response.pp_amonut);
        setProducts(response.importdetail);
      })
      .catch((error) => {
        alert("Lỗi hệ thống: " + error.message);
      });
  }, [id, setValue]);

  return (
    <div>
      <div className="container-fluid pt-0 ">
        <h1 className="h3 mb-2 text-gray-800">Cập nhật hóa đơn nhập</h1>
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
                              <label htmlFor="sl_id">Nhà cung cấp:</label>
                              <select
                                name="sl_id"
                                id="sl_id"
                                className="form-control"
                                {...register("sl_id", { required: true })}
                              >
                                <option value="">Chọn nhà cung cấp</option>
                                {supp.map((spp) => (
                                  <option key={spp.id} value={spp.id}>
                                    {spp.sl_name}
                                  </option>
                                ))}
                              </select>
                              {errors.sl_id && (
                                <span className="text-danger">
                                  Chọn nhà cung cấp
                                </span>
                              )}
                            </div>
                            <div className="form-group">
                              <label htmlFor="pp_start">Ngày nhập:</label>
                              <input
                                type="date"
                                name="pp_start"
                                id="pp_start"
                                className="form-control"
                                {...register("pp_start", { required: true })}
                              />
                              {errors.pp_start && (
                                <span className="text-danger">
                                  Chọn ngày nhập
                                </span>
                              )}
                            </div>
                            <div className="form-group">
                              <label htmlFor="pp_price">Tổng tiền:</label>
                              <input
                                type="number"
                                name="pp_price"
                                id="pp_price"
                                readOnly
                                placeholder="Tổng tiền"
                                className="form-control"
                                {...register("pp_price", { required: true })}
                              />
                              {errors.pp_price && (
                                <span className="text-danger">
                                  Nhập tổng tiền
                                </span>
                              )}
                            </div>
                            <div className="form-group">
                              <label htmlFor="pp_amonut">Số lượng:</label>
                              <input
                                type="number"
                                name="pp_amonut"
                                id="pp_amonut"
                                readOnly
                                placeholder="Số lượng"
                                className="form-control"
                                {...register("pp_amonut", { required: true })}
                              />
                              {errors.pp_amonut && (
                                <span className="text-danger">
                                  Nhập số lượng
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-8">
                            <Link to="/products" className="btn btn-primary">
                              Chọn sản phẩm
                            </Link>
                            <button type="button" className="btn btn-primary">
                              Cập nhật
                            </button>
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
                                  <th style={{ textAlign: "center" }}>
                                    Tác vụ
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {products.map((pr, index) => (
                                  <tr className="odd" key={index}>
                                    <td>{pr.importproduct.pr_name}</td>
                                    <td>
                                      <img
                                        src={`http://localhost:8081/public/image/${pr.importproduct.pr_image}`}
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
                                        style={{ width: "60px" }}
                                        name={`products[${index}].ip_amount`}
                                        defaultValue={pr.ip_amount}
                                        {...register(
                                          `products[${index}].ip_amount`,
                                          {
                                            required: true,
                                          }
                                        )}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        min={1}
                                        name={`products[${index}].ip_price`}
                                        defaultValue={pr.ip_price}
                                        {...register(
                                          `products[${index}].ip_price`,
                                          {
                                            required: true,
                                          }
                                        )}
                                      />
                                    </td>
                                    <td className="d-flex">
                                      <button
                                        type="button"
                                        className="mx-2 btn btn-danger"
                                        // onClick={() => handleRemoveProduct(index)}
                                      >
                                        Xóa
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="col-12 text-center p-5">
                          <button type="submit" className="btn btn-primary">
                            Thêm
                          </button>
                          <Link
                            to="/import"
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
