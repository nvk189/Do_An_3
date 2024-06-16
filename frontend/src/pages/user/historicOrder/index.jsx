/* eslint-disable react/prop-types */
import { useState } from "react";
import OrderAll from "./allOrder";
import OrderShip from "./shipOrder";
import OrderPen from "./pedingOrder";
import OrderReal from "./realOrder";
import OrderFail from "./failOrder";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return <AllOrders />;
      case "cxn":
        return <PendingOrders />;
      case "ship":
        return <ShippingOrders />;
      case "ht":
        return <CompletedOrders />;
      case "huy":
        return <CancelledOrders />;
      default:
        return <AllOrders />;
    }
  };

  return (
    <div>
      <nav className="container px-0 navbar navbar-expand-lg border-secondary page-header">
        <div className="container-fluid border-secondary px-10">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="navbar-collapse btn border-secondary"
            style={{ backgroundColor: "#ed6b87", color: "white" }}
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <NavItem
                tabName="all"
                activeTab={activeTab}
                onClick={handleTabClick}
              >
                Tất cả đơn hàng
              </NavItem>
              <NavItem
                tabName="cxn"
                activeTab={activeTab}
                onClick={handleTabClick}
              >
                Chờ xác nhận
              </NavItem>
              <NavItem
                tabName="ship"
                activeTab={activeTab}
                onClick={handleTabClick}
              >
                Đang giao
              </NavItem>
              <NavItem
                tabName="ht"
                activeTab={activeTab}
                onClick={handleTabClick}
              >
                Hoàn thành
              </NavItem>
              <NavItem
                tabName="huy"
                activeTab={activeTab}
                onClick={handleTabClick}
              >
                Hủy
              </NavItem>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">{renderContent()}</div>
    </div>
  );
};

const NavItem = ({ tabName, activeTab, onClick, children }) => {
  return (
    <li className="nav-item">
      <a
        className={`nav-link ${tabName === activeTab ? "active" : ""}`}
        href="#"
        onClick={() => onClick(tabName)}
        style={{ color: "white" }}
      >
        {children}
      </a>
    </li>
  );
};

const AllOrders = () => <OrderAll />;
const PendingOrders = () => <OrderPen />;
const ShippingOrders = () => <OrderShip />;
const CompletedOrders = () => <OrderReal />;
const CancelledOrders = () => <OrderFail />;

export default Orders;
