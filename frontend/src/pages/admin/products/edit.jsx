import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Protype from "../../../service/protypeAPI";
import productAPI from "../../../service/productApi";

const edit = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { id } = useParams();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [types, setTypes] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [image, setImage] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [successMessage, setSuccessMessage] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    Protype.getAll()
      .then((response) => {
        setTypes(response);
      })
      .catch((error) => {
        alert("Lỗi hệ thống: " + error.message);
      });
  }, []);

  // hiển thị sp theo id
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    productAPI
      .getId(id)
      .then((response) => {
        console.log(response);
        setValue("pt_id", response.pt_id);
        setValue("pr_name", response.pr_name);
        setValue("pr_image", response.pr_image);
        setValue("pr_amount", response.pr_amount);
        setValue("pr_price", response.pr_price);
        setValue("pr_sales", response.pr_sales);
        setValue("ct_des1", response.category.ct_des1);
        setValue("existingImage", response.pr_image);
        setImage(`http://localhost:8081/public/image/${response.pr_image}`);
      })
      .catch((error) => {
        alert("Lỗi hệ thống: " + error.message);
      });
  }, [id, setValue]);

  // định dạng mô tả sản phẩm
  const formatDescription = (description) => {
    const lines = description.split("\n");
    const title = lines.shift();
    const content = lines.map((line) => `<li>${line}</li>`).join("");
    return `<h4>${title}</h4><ul>${content}</ul>`;
  };
  // update
  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "pr_image") {
        if (data[key] && data[key].length > 0) {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data.existingImage);
        }
      } else if (key === "ct_des1") {
        formData.append(key, formatDescription(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }
    try {
      await productAPI.update(id, formData);
      setSuccessMessage("Cập nhật thành công");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      alert("Lỗi khi thêm sản phẩm: " + error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage("");
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="h3 mb-2 text-gray-800">Cập nhật sản phẩm</h3>
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
                              <option key={type.id} value={type.id}>
                                {type.pt_name}
                              </option>
                            ))}
                          </select>
                          {errors.pt_id && <span>Chọn loại sản phẩm</span>}
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
                              {...register("pr_image")}
                              onChange={handleImageChange}
                            />

                            <center>
                              <span style={{ float: "left" }}>View:</span>
                              <img
                                id="viewimg"
                                src={image}
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
                          {errors.pr_amount && <span>Nhập số lượng</span>}
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
                          {errors.pr_price && <span>Nhập giá bán</span>}
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
                            <span>Nhập giá giảm (nếu có)</span>
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
                          {errors.ct_des1 && <span>Nhập mô tả sản phẩm</span>}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 text-xl-center pt-5">
                      <button type="submit" className="btn btn-primary">
                        Cập nhật
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

export default edit;
