import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Protype from "../../../service/protypeAPI";
import productAPI from "../../../service/productApi";

const Create = () => {
  const [types, setTypes] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    Protype.getAll()
      .then((response) => {
        setTypes(response);
      })
      .catch((error) => {
        alert("Lỗi hệ thống: " + error.message);
      });
  }, []);

  const formatDescription = (description) => {
    const lines = description.split("\n");
    const title = lines.shift();
    const content = lines.map((line) => `<li>${line}</li>`).join("");
    return `<h4>${title}</h4><ul>${content}</ul>`;
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "ct_des1") {
        formData.append(key, formatDescription(data[key]));
      } else if (key === "pr_image" && data.pr_image[0]) {
        formData.append(key, data.pr_image[0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    console.log(data);

    try {
      console.log(formData);
      await productAPI.create(formData);
      setSuccessMessage("Thêm thành công");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setSuccessMessage("Thêm thất bại");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="h3 mb-2 text-gray-800">Thêm sản phẩm</h3>
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <div className="container">
                <div className="">
                  {successMessage && (
                    <div className="alert alert-success" role="alert">
                      {successMessage}
                    </div>
                  )}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-12 d-flex">
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="pr_name">Tên sản phẩm:</label>
                          <input
                            type="text"
                            name="pr_name"
                            id="pr_name"
                            className="form-control"
                            placeholder="Nhập tên sản phẩm"
                            {...register("pr_name", { required: true })}
                          />
                          {errors.pr_name && <span>Nhập tên sản phẩm</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="pt_id">Loại sản phẩm:</label>
                          <select
                            className="form-control"
                            {...register("pt_id", { required: true })}
                          >
                            {types.map((type) => (
                              <option key={type.id} value={type.id} selected>
                                {type.pt_name}
                              </option>
                            ))}
                          </select>
                          {errors.pt_id && <span>chọn loại sản phẩm</span>}
                        </div>
                        <div className="form-group">
                          <div className="col-12 col-s-12 padding-box">
                            <label htmlFor="pr_image">Hình ảnh:</label>
                          </div>
                          <div className="col-12 col-s-12 padding-box">
                            <input
                              type="file"
                              id="pr_image"
                              name="pr_image"
                              {...register("pr_image", { required: true })}
                              onChange={handleImageChange}
                            />
                            {errors.pr_image && <span>chọn hình ảnh</span>}
                            <center>
                              <span style={{ float: "left" }}>View:</span>
                              <img
                                id="viewimg"
                                src={imagePreview}
                                alt="Preview"
                                style={{
                                  maxWidth: "180px",
                                  maxHeight: "180px",
                                  marginTop: "10px",
                                }}
                              />
                            </center>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="pr_amount">Số lượng:</label>
                          <input
                            type="number"
                            name="pr_amount"
                            id="pr_amount"
                            className="form-control"
                            min="1"
                            placeholder="Nhập số lượng"
                            {...register("pr_amount", { required: true })}
                          />
                          {errors.pr_amount && <span>nhập số lượng</span>}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="pr_price">Giá :</label>
                          <input
                            type="number"
                            name="pr_price"
                            id="pr_price"
                            className="form-control"
                            min="1"
                            {...register("pr_price", { required: true })}
                          />
                          {errors.pr_price && <span>nhập giá bán</span>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="pr_sales">Giá giảm:</label>
                          <input
                            type="number"
                            name="pr_sales"
                            id="pr_sales"
                            className="form-control"
                            min="0"
                            {...register("pr_sales", { required: true })}
                          />
                          {errors.pr_sales && (
                            <span>nhập giá giảm (nếu có)</span>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="ct_des1">Mô tả sản phẩm:</label>
                          <textarea
                            name="ct_des1"
                            id="ct_des1"
                            rows="5"
                            cols="8"
                            className="form-control"
                            placeholder="Nhập mô tả"
                            {...register("ct_des1", { required: true })}
                          ></textarea>
                          {errors.ct_des1 && <span>nhập mô tả sản phẩm</span>}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 text-xl-center pt-5">
                      <button type="submit" className="btn btn-primary">
                        Thêm
                      </button>
                      <Link className="btn btn-danger" to="/products">
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
  );
};

export default Create;
