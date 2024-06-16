/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import orderAPI from "../../../service/orderAPI";
import useAuth from "../../../auth/useAuth";
import { useState, useEffect } from "react";
const allOrder = () => {
  const { auth, id } = useAuth();
  const [order1, setOrder1] = useState("");
  const [order2, setOrder2] = useState("");
  const [order3, setOrder3] = useState("");
  const [order4, setOrder4] = useState("");
  useEffect(() => {
    orderAPI
      .getCusID(id)
      .then((response) => {
        console.log(response.cxn.length);
        setOrder1(response.cxn.length);
        setOrder2(response.dg.length);
        setOrder3(response.ht.length);
        setOrder4(response.huy.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <div>
      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Tổng số đơn hàng
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {order1 + order2 + order3 + order4}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Chờ xác nhận
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {order1}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Đơn hàng đang giao
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {order2}
                  </div>
                </div>
                <div className="col-auto"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Đơn hàng thành công
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {order3}
                  </div>
                </div>
                <div className="col-auto"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Đơn hàng bị hủy
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {order4}
                  </div>
                </div>
                <div className="col-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default allOrder;
