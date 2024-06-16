/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../auth/useAuth";
import orderAPI from "../../../service/orderAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Order = () => {
  const { auth, id, mess, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { check } = location.state || { check: [] };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setProducts(check);
  }, [check]);

  const formatNumber = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const totalAmount = check.reduce(
    (acc, pr) => acc + pr.price * pr.quantity,
    0
  );

  useEffect(() => {
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => {
        if (response.data.error === 0) {
          setProvinces(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setDistricts(response.data.data);
            setWards([]);
            setSelectedDistrict("");
          }
        })
        .catch((error) => console.error("Error fetching districts:", error));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setWards(response.data.data);
          }
        })
        .catch((error) => console.error("Error fetching wards:", error));
    }
  }, [selectedDistrict]);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setValue("tinh", provinceId);
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setValue("quan", districtId);
  };

  const handleWardChange = (e) => {
    const wardId = e.target.value;
    setSelectedWard(wardId);
    setValue("phuong", wardId);
  };

  const getFullNameById = (id, list) => {
    const item = list.find((el) => el.id === id);
    return item ? item.full_name : "";
  };

  const onSubmit = async (data) => {
    try {
      const provinceName = getFullNameById(selectedProvince, provinces);
      const districtName = getFullNameById(selectedDistrict, districts);
      const wardName = getFullNameById(selectedWard, wards);

      const order = {
        cus_id: id,
        name: data.name,
        phone: data.phone.replace(/\s/g, ""),
        address: `${data.diachi} ${wardName} ${districtName} ${provinceName}`,
        total: totalAmount,
        order_status: "cxn",
        products: check.map((pr) => ({
          pr_id: pr.id,
          od_quanlity: pr.quantity,
          od_price: pr.price,
        })),
      };

      await orderAPI.create(order).then((response) => {
        navigate("/notificationOrder", {
          state: { orderId: response.create.id },
        });
      });
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Đặt hàng không thành công.");
    }
  };
  // const handleLogout = () => {
  //   toast.warning("Bạn cần đăng nhập tài khoản ");
  // };

  return (
    <div>
      <div
        className="container-fluid page-header py-5"
        style={{
          backgroundImage:
            "url(https://hoadecor.vn/wp-content/uploads/2021/08/cua-hang-hoa-17.jpg)",
        }}
      >
        <h1 className="text-center text-white display-6">Đặt hàng</h1>
      </div>
      <div className="container-fluid ">
        <div className="container py-5">
          <ToastContainer />
          <h1 className="mb-4">Đặt hàng</h1>
          {auth ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-4">
                <div className="col-md-12 col-lg-6 col-xl-6">
                  <div className="form-item">
                    <label className="form-label my-3">
                      Người nhận<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên người nhận"
                      name="name"
                      {...register("name", { required: true })}
                    />
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Số điện thoại <sup>*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập số điện thoại"
                      name="phone"
                      {...register("phone", {
                        required: "Vui lòng nhập số điện thoại",
                        pattern: {
                          value: /^0\d{9}$/,
                          message:
                            "Số điện thoại không hợp lệ, phải bắt đầu bằng 0 và gồm 10 chữ số",
                        },
                        setValueAs: (value) => value.replace(/\s/g, ""), // Remove all spaces
                      })}
                    />
                    {errors.phone && (
                      <span className="text-danger">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Địa chỉ<sup>*</sup>
                    </label>
                    <div className="css_select_div d-flex justify-content-between">
                      <select
                        style={{ marginRight: "10px" }}
                        className="css_select form-control mb-3"
                        id="tinh"
                        name="tinh"
                        title="Chọn Tỉnh Thành"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                      >
                        <option value="">Chọn Tỉnh Thành</option>
                        {provinces.map((province) => (
                          <option key={province.id} value={province.id}>
                            {province.full_name}
                          </option>
                        ))}
                      </select>
                      <select
                        style={{ marginRight: "10px" }}
                        className="css_select form-control mb-3"
                        id="quan"
                        name="quan"
                        title="Chọn Quận Huyện"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        disabled={!selectedProvince}
                      >
                        <option value="">Chọn Quận Huyện</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.full_name}
                          </option>
                        ))}
                      </select>
                      <select
                        style={{ marginRight: "10px" }}
                        className="css_select form-control"
                        id="phuong"
                        name="phuong"
                        title="Chọn Phường Xã"
                        disabled={!selectedDistrict}
                        value={selectedWard}
                        onChange={handleWardChange}
                        // {...register("phuong", { required: true })}
                      >
                        <option value="">Chọn Phường Xã</option>
                        {wards.map((ward) => (
                          <option key={ward.id} value={ward.id}>
                            {ward.full_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-item">
                    <textarea
                      name="diachi"
                      className="form-control"
                      spellCheck="false"
                      cols={6}
                      rows={3}
                      placeholder="Địa chỉ nhà"
                      {...register("diachi", { required: true })}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6 col-xl-6">
                  <div className="table-responsive">
                    <h3>Danh sách sản phẩm</h3>
                    <table className="table table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th scope="col" style={{ textAlign: "center" }}>
                            STT
                          </th>
                          <th scope="col" style={{ textAlign: "center" }}>
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
                        </tr>
                      </thead>
                      <tbody>
                        {check.map((pr, index) => (
                          <tr key={pr.id}>
                            <td className="text-center align-middle">
                              {index + 1}
                            </td>
                            <td className="text-center align-middle">
                              <div className="d-flex justify-content-center">
                                <img
                                  src={`http://localhost:8081/public/image/${pr.image}`}
                                  className="img-fluid rounded-circle"
                                  style={{ width: "90px", height: "90px" }}
                                  alt={pr.name}
                                />
                              </div>
                            </td>
                            <td className="text-center align-middle">
                              {pr.name}
                            </td>
                            <td className="text-center align-middle">
                              {formatNumber(pr.price)}
                            </td>
                            <td className="text-center align-middle">
                              {pr.quantity}
                            </td>
                            <td className="text-center align-middle">
                              {formatNumber(pr.price * pr.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={5} style={{ textAlign: "right" }}>
                            Thành tiền:
                          </td>
                          <td>{formatNumber(totalAmount)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      style={{ marginRight: "10px" }}
                      type="submit"
                      className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                    >
                      Đặt hàng
                    </button>
                    <Link
                      to="/cart"
                      className="btn border-secondary py-3 px-4 text-uppercase w-50 text-primary"
                    >
                      Quay lại
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <h2>
              Bạn cần đăng nhập tài khoản để thực hiện chức năng thanh toán
            </h2>
            // <form onSubmit={handleSubmit(handleLogout)}>
            //   <div className="row g-4">
            //     <div className="col-md-12 col-lg-6 col-xl-6">
            //       <div className="form-item">
            //         <label className="form-label my-3">
            //           Người nhận<sup>*</sup>
            //         </label>
            //         <input
            //           type="text"
            //           className="form-control"
            //           placeholder="Nhập tên người nhận"
            //           name="name"
            //           {...register("name", {
            //             required: "Vui lòng nhập tên người nhận",
            //           })}
            //         />
            //         {errors.name && (
            //           <span className="text-danger">{errors.name.message}</span>
            //         )}
            //       </div>
            //       <div className="form-item">
            //         <label className="form-label my-3">
            //           Số điện thoại <sup>*</sup>
            //         </label>
            //         <input
            //           type="text"
            //           className="form-control"
            //           placeholder="Nhập số điện thoại"
            //           name="phone"
            //           {...register("phone", {
            //             required: "Vui lòng nhập số điện thoại",
            //             pattern: {
            //               value: /^0\d{9}$/,
            //               message:
            //                 "Số điện thoại không hợp lệ, phải bắt đầu bằng 0 và gồm 10 chữ số",
            //             },
            //             setValueAs: (value) => value.replace(/\s/g, ""), // Remove all spaces
            //           })}
            //         />
            //         {errors.phone && (
            //           <span className="text-danger">
            //             {errors.phone.message}
            //           </span>
            //         )}
            //       </div>
            //       <div className="form-item">
            //         <label className="form-label my-3">
            //           Địa chỉ<sup>*</sup>
            //         </label>
            //         <div className="css_select_div d-flex justify-content-between">
            //           <select
            //             style={{ marginRight: "10px" }}
            //             className="css_select form-control mb-3"
            //             id="tinh"
            //             name="tinh"
            //             title="Chọn Tỉnh Thành"
            //             value={selectedProvince}
            //             onChange={handleProvinceChange}
            //             // {...register("tinh", { required: true })}
            //           >
            //             <option value="">Chọn Tỉnh Thành</option>
            //             {provinces.map((province) => (
            //               <option key={province.id} value={province.id}>
            //                 {province.full_name}
            //               </option>
            //             ))}
            //           </select>
            //           <select
            //             style={{ marginRight: "10px" }}
            //             className="css_select form-control mb-3"
            //             id="quan"
            //             name="quan"
            //             title="Chọn Quận Huyện"
            //             value={selectedDistrict}
            //             onChange={handleDistrictChange}
            //             disabled={!selectedProvince}
            //             // {...register("quan", { required: true })}
            //           >
            //             <option value="">Chọn Quận Huyện</option>
            //             {districts.map((district) => (
            //               <option key={district.id} value={district.id}>
            //                 {district.full_name}
            //               </option>
            //             ))}
            //           </select>
            //           <select
            //             style={{ marginRight: "10px" }}
            //             className="css_select form-control"
            //             id="phuong"
            //             name="phuong"
            //             title="Chọn Phường Xã"
            //             disabled={!selectedDistrict}
            //             value={selectedWard}
            //             onChange={handleWardChange}
            //             // {...register("phuong", { required: true })}
            //           >
            //             <option value="">Chọn Phường Xã</option>
            //             {wards.map((ward) => (
            //               <option key={ward.id} value={ward.id}>
            //                 {ward.full_name}
            //               </option>
            //             ))}
            //           </select>
            //         </div>
            //       </div>
            //       <div className="form-item">
            //         <textarea
            //           name="diachi"
            //           className="form-control"
            //           spellCheck="false"
            //           cols={6}
            //           rows={3}
            //           placeholder="Địa chỉ nhà"
            //           {...register("diachi", { required: true })}
            //         ></textarea>
            //       </div>
            //     </div>
            //     <div className="col-md-12 col-lg-6 col-xl-6">
            //       <div className="table-responsive">
            //         <table className="table table-bordered">
            //           <thead className="table-light">
            //             <tr>
            //               <th scope="col" style={{ textAlign: "center" }}>
            //                 STT
            //               </th>
            //               <th scope="col" style={{ textAlign: "center" }}>
            //                 Hình ảnh
            //               </th>
            //               <th scope="col" style={{ textAlign: "center" }}>
            //                 Tên SP
            //               </th>
            //               <th scope="col" style={{ textAlign: "center" }}>
            //                 Giá
            //               </th>
            //               <th scope="col" style={{ textAlign: "center" }}>
            //                 Số lượng
            //               </th>
            //               <th scope="col" style={{ textAlign: "center" }}>
            //                 Tổng tiền
            //               </th>
            //             </tr>
            //           </thead>
            //           <tbody>
            //             {check.map((pr, index) => (
            //               <tr key={pr.id}>
            //                 <td className="text-center align-middle">
            //                   {index + 1}
            //                 </td>
            //                 <td className="text-center align-middle">
            //                   <div className="d-flex justify-content-center">
            //                     <img
            //                       src={`http://localhost:8081/public/image/${pr.image}`}
            //                       className="img-fluid rounded-circle"
            //                       style={{ width: "90px", height: "90px" }}
            //                       alt={pr.name}
            //                     />
            //                   </div>
            //                 </td>
            //                 <td className="text-center align-middle">
            //                   {pr.name}
            //                 </td>
            //                 <td className="text-center align-middle">
            //                   {formatNumber(pr.price)}
            //                 </td>
            //                 <td className="text-center align-middle">
            //                   {pr.quantity}
            //                 </td>
            //                 <td className="text-center align-middle">
            //                   {formatNumber(pr.price * pr.quantity)}
            //                 </td>
            //               </tr>
            //             ))}
            //           </tbody>
            //           <tfoot>
            //             <tr>
            //               <td colSpan={5} style={{ textAlign: "right" }}>
            //                 Thành tiền:
            //               </td>
            //               <td>{formatNumber(totalAmount)}</td>
            //             </tr>
            //           </tfoot>
            //         </table>
            //       </div>
            //       <div className="d-flex justify-content-between">
            //         <button
            //           style={{ marginRight: "10px" }}
            //           type="submit"
            //           className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
            //         >
            //           Đặt hàng
            //         </button>
            //         <Link
            //           to="/cart"
            //           className="btn border-secondary py-3 px-4 text-uppercase w-50 text-primary"
            //         >
            //           Hủy
            //         </Link>
            //       </div>
            //     </div>
            //   </div>
            // </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
/* eslint-disable no-unused-vars */
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useLocation } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import useAuth from "../../../auth/useAuth";
// import orderAPI from "../../../service/orderAPI";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Order = () => {
//   const { auth, id, mess, logout } = useAuth();
//   const [products, setProducts] = useState([]);
//   const [provinces, setProvinces] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [wards, setWards] = useState([]);
//   const [selectedProvince, setSelectedProvince] = useState("");
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [selectedWard, setSelectedWard] = useState("");
//   const location = useLocation();
//   const { check } = location.state || { check: [] };
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     setProducts(check);
//   }, [check]);

//   const formatNumber = (value) => {
//     return value.toLocaleString("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     });
//   };

//   const totalAmount = check.reduce(
//     (acc, pr) => acc + pr.price * pr.quantity,
//     0
//   );

//   useEffect(() => {
//     axios
//       .get("https://esgoo.net/api-tinhthanh/1/0.htm")
//       .then((response) => {
//         if (response.data.error === 0) {
//           setProvinces(response.data.data);
//         }
//       })
//       .catch((error) => console.error("Error fetching provinces:", error));
//   }, []);

//   useEffect(() => {
//     if (selectedProvince) {
//       axios
//         .get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
//         .then((response) => {
//           if (response.data.error === 0) {
//             setDistricts(response.data.data);
//             setWards([]);
//             setSelectedDistrict("");
//           }
//         })
//         .catch((error) => console.error("Error fetching districts:", error));
//     }
//   }, [selectedProvince]);

//   useEffect(() => {
//     if (selectedDistrict) {
//       axios
//         .get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
//         .then((response) => {
//           if (response.data.error === 0) {
//             setWards(response.data.data);
//           }
//         })
//         .catch((error) => console.error("Error fetching wards:", error));
//     }
//   }, [selectedDistrict]);

//   const handleProvinceChange = (e) => {
//     const provinceId = e.target.value;
//     setSelectedProvince(provinceId);
//     setValue("tinh", provinceId);
//   };

//   const handleDistrictChange = (e) => {
//     const districtId = e.target.value;
//     setSelectedDistrict(districtId);
//     setValue("quan", districtId);
//   };

//   const handleWardChange = (e) => {
//     const wardId = e.target.value;
//     setSelectedWard(wardId);
//     setValue("phuong", wardId);
//   };

//   const getFullNameById = (id, list) => {
//     const item = list.find((el) => el.id === id);
//     return item ? item.full_name : "";
//   };

//   const onSubmit = async (data) => {
//     try {
//       const provinceName = getFullNameById(selectedProvince, provinces);
//       const districtName = getFullNameById(selectedDistrict, districts);
//       const wardName = getFullNameById(selectedWard, wards);

//       const order = {
//         cus_id: id,
//         name: data.name,
//         phone: data.phone,
//         address: `${data.diachi} ${wardName} ${districtName} ${provinceName}`,
//         total: totalAmount,
//         order_status: "cxn",
//         products: check.map((pr) => ({
//           pr_id: pr.id,
//           od_quanlity: pr.quantity,
//           od_price: pr.price,
//         })),
//       };

//       await orderAPI.create(order);
//       toast.success("Đơn hàng đã được tạo thành công!");
//     } catch (error) {
//       console.error("Error creating order:", error);
//       toast.error("Có lỗi xảy ra khi tạo đơn hàng.");
//     }
//   };
//   const handleLogout = () => {
//     toast.warning("Bạn cần đăng nhập tài khoản ");
//   };

//   return (
//     <div>
//       <div
//         className="container-fluid page-header py-5"
//         style={{
//           backgroundImage:
//             "url(https://hoadecor.vn/wp-content/uploads/2021/08/cua-hang-hoa-17.jpg)",
//         }}
//       >
//         <h1 className="text-center text-white display-6">Đặt hàng</h1>
//       </div>
//       <div className="container-fluid ">
//         <div className="container py-5">
//           <ToastContainer />
//           <h1 className="mb-4">Đặt hàng</h1>
//           {auth ? (
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="row g-4">
//                 <div className="col-md-12 col-lg-6 col-xl-6">
//                   <div className="form-item">
//                     <label className="form-label my-3">
//                       Người nhận<sup>*</sup>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Nhập tên người nhận"
//                       name="name"
//                       {...register("name", { required: true })}
//                     />
//                     {errors.name && (
//                       <span className="text-danger">
//                         Vui lòng nhập tên người nhận
//                       </span>
//                     )}
//                   </div>
//                   <div className="form-item">
//                     <label className="form-label my-3">
//                       Số điện thoại <sup>*</sup>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Nhập số điện thoại"
//                       name="phone"
//                       {...register("phone", {
//                         required: true,
//                         pattern: {
//                           value: /^[0-9]{10}$/,
//                           message: "Số điện thoại không hợp lệ",
//                         },
//                       })}
//                     />
//                     {errors.phone && (
//                       <span className="text-danger">
//                         {errors.phone.message}
//                       </span>
//                     )}
//                   </div>
//                   <div className="form-item">
//                     <label className="form-label my-3">
//                       Địa chỉ<sup>*</sup>
//                     </label>
//                     <div className="css_select_div d-flex justify-content-between">
//                       <select
//                         style={{ marginRight: "10px" }}
//                         className="css_select form-control mb-3"
//                         id="tinh"
//                         name="tinh"
//                         title="Chọn Tỉnh Thành"
//                         value={selectedProvince}
//                         onChange={handleProvinceChange}
//                       >
//                         <option value="">Chọn Tỉnh Thành</option>
//                         {provinces.map((province) => (
//                           <option key={province.id} value={province.id}>
//                             {province.full_name}
//                           </option>
//                         ))}
//                       </select>
//                       <select
//                         style={{ marginRight: "10px" }}
//                         className="css_select form-control mb-3"
//                         id="quan"
//                         name="quan"
//                         title="Chọn Quận Huyện"
//                         value={selectedDistrict}
//                         onChange={handleDistrictChange}
//                         disabled={!selectedProvince}
//                       >
//                         <option value="">Chọn Quận Huyện</option>
//                         {districts.map((district) => (
//                           <option key={district.id} value={district.id}>
//                             {district.full_name}
//                           </option>
//                         ))}
//                       </select>
//                       <select
//                         style={{ marginRight: "10px" }}
//                         className="css_select form-control"
//                         id="phuong"
//                         name="phuong"
//                         title="Chọn Phường Xã"
//                         disabled={!selectedDistrict}
//                         value={selectedWard}
//                         onChange={handleWardChange}
//                       >
//                         <option value="">Chọn Phường Xã</option>
//                         {wards.map((ward) => (
//                           <option key={ward.id} value={ward.id}>
//                             {ward.full_name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     {errors.tinh && (
//                       <span className="text-danger">
//                         Vui lòng chọn tỉnh thành
//                       </span>
//                     )}
//                     {errors.quan && (
//                       <span className="text-danger">
//                         Vui lòng chọn quận huyện
//                       </span>
//                     )}
//                     {errors.phuong && (
//                       <span className="text-danger">
//                         Vui lòng chọn phường xã
//                       </span>
//                     )}
//                   </div>
//                   <div className="form-item">
//                     <textarea
//                       name="diachi"
//                       className="form-control mt-3"
//                       placeholder="Số nhà, tên đường, ..."
//                       {...register("diachi", { required: true })}
//                     />
//                     {errors.diachi && (
//                       <span className="text-danger">Vui lòng nhập địa chỉ</span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="col-md-12 col-lg-6 col-xl-6 ">
//                   <h5 className="d-flex justify-content-between align-items-center mb-3">
//                     <span className="text-muted">Giỏ hàng của bạn</span>
//                     <span className="badge bg-secondary badge-pill">
//                       {check.length}
//                     </span>
//                   </h5>
//                   <ul className="list-group mb-3">
//                     {check.map((pr) => (
//                       <li
//                         key={pr.id}
//                         className="list-group-item d-flex justify-content-between lh-condensed"
//                       >
//                         <div>
//                           <h6 className="my-0">{pr.name}</h6>
//                           <small className="text-muted">
//                             Số lượng: {pr.quantity}
//                           </small>
//                         </div>
//                         <span className="text-muted">
//                           {formatNumber(pr.price * pr.quantity)}
//                         </span>
//                       </li>
//                     ))}
//                     <li className="list-group-item d-flex justify-content-between">
//                       <span>Tổng (VND)</span>
//                       <strong>{formatNumber(totalAmount)}</strong>
//                     </li>
//                   </ul>
//                   <button
//                     className="w-100 btn btn-primary btn-lg"
//                     type="submit"
//                   >
//                     Đặt hàng
//                   </button>
//                 </div>
//               </div>
//             </form>
//           ) : (
//             handleLogout()
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;
