/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import orderAPI from "../../../service/orderAPI";

const Index = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    orderAPI
      .getAll()
      .then((response) => {
        setOrder(response);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  return (
    <div className="container-fluid pt-0 box">
      <div className="card shadow mb-4">
        <div className="card-body">
          <h3 className="">Tổng quan đơn hàng</h3>
          <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Tổng số đơn đặt hàng
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {order.total_order}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
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
                        {order.order_ship}
                      </div>
                    </div>
                    <div className="col-auto">
                      <a href="/orderShip" className="mx-2 btn btn-success">
                        <i className="bi bi-pencil-square"></i>
                      </a>
                    </div>
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
                        {order.order_real}
                      </div>
                    </div>
                    <div className="col-auto">
                      <a href="/orderReal" className="mx-2 btn btn-success">
                        <i className="bi bi-pencil-square"></i>
                      </a>
                    </div>
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
                        {order.order_fail}
                      </div>
                    </div>
                    <div className="col-auto">
                      <a href="/orderFail" className="mx-2 btn btn-success">
                        <i className="bi bi-pencil-square"></i>
                      </a>
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

export default Index;
