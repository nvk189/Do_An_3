import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import suppAPI from "../../../service/suppAPI";
import importAPI from "../../../service/proImport";

const Create = () => {
  const [supp, setSupp] = useState([]);
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const { selectedProducts } = location.state || { selectedProducts: [] };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
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

    setProducts(selectedProducts);
  }, [selectedProducts]);

  const onSubmit = async (data) => {
    try {
      const importData = {
        sl_id: data.sl_id,
        pp_start: data.pp_start,
        pp_amonut: data.pp_amonut,
        pp_price: data.pp_price,
        products: products.map((product, index) => ({
          pr_id: getValues(`products[${index}].pr_id`),
          ip_amount: getValues(`products[${index}].ip_amount`),
          ip_price: getValues(`products[${index}].ip_price`),
        })),
      };
      await importAPI.create(importData);
      setSuccessMessage("Thêm thành công");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error creating supplier:", error);
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleUpdateTotals = () => {
    let totalAmount = 0;
    let totalPrice = 0;

    products.forEach((product, index) => {
      const amount = Number(getValues(`products[${index}].ip_amount`));
      const price = Number(getValues(`products[${index}].ip_price`));

      if (!isNaN(amount) && !isNaN(price)) {
        totalAmount += amount;
        totalPrice += price * amount;
        setValue("pp_amonut", totalAmount);
        setValue("pp_price", totalPrice);
      } else {
        console.error(`Invalid amount or price for product ${product.id}:`, {
          amount,
          price,
        });
      }
    });
  };

  return (
    <div>
      <div className="container-fluid pt-0 ">
        <h1 className="h3 mb-2 text-gray-800">Thêm hóa đơn nhập</h1>
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <div id="dataTable_wrapper" className="">
                <div className="container">
                  <div className="">
                    <div className="">
                      {successMessage && (
                        <div className="alert alert-success" role="alert">
                          {successMessage}
                        </div>
                      )}
                      <form onSubmit={handleSubmit(onSubmit)}>
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
                                <option value=""></option>
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
                                id="pp_amount"
                                className="form-control"
                                {...register("pp_amonut", { required: true })}
                              />
                              {errors.pp_amount && (
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
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleUpdateTotals}
                            >
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
                                  <th style={{ textAlign: "center" }}>id</th>
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
                                    <td>
                                      <input
                                        style={{
                                          textAlign: "center",
                                          border: "none",
                                          backgroundColor: "transparent",
                                        }}
                                        name={`products[${index}].pr_id`}
                                        type="text"
                                        defaultValue={pr.id}
                                        {...register(
                                          `products[${index}].pr_id`
                                        )}
                                      />
                                    </td>
                                    <td>{pr.pr_name}</td>
                                    <td>
                                      <img
                                        src={`http://localhost:8081/public/image/${pr.pr_image}`}
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
                                        defaultValue={pr.amount}
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
                                        defaultValue={pr.price}
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
                                        onClick={() =>
                                          handleRemoveProduct(index)
                                        }
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

export default Create;
