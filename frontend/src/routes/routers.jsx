/* eslint-disable react/jsx-no-undef */
import Home from "../pages/user/homepage/homepage";
// import Hometest from "../pages/user/homepage/hometest";
import Login from "../pages/user/login/login";
import Register from "../pages/user/register/register";
import Product from "../pages/user/products/products";
import Detail from "../pages/user/detail/details";
import Order from "../pages/user/order/order";
import Cart from "../pages/user/cart/cart";
import Protype from "../pages/user/products/protype";
import Prosearch from "../pages/user/products/proSearch";
import Historic from "../pages/user/historicOrder/index";
import DetailOrder from "../pages/user/historicOrder/detailOrder";
import Account from "../pages/user/account/index";
import NotificationOrder from "../pages/user/order/notificationOrder";
import NotificationFail from "../pages/user/order/notificationFail";

// admin
import Dashboard from "../pages/admin/dashboard/dashboard";
import IndexCus from "../pages/admin/customer/index";
import CreateCus from "../pages/admin/customer/create";
import UpdateCus from "../pages/admin/customer/edit";
import IndexPro from "../pages/admin/products/index";
import CreatePro from "../pages/admin/products/create";
import UpdatePro from "../pages/admin/products/edit";
import IndexProtype from "../pages/admin/pr_type/index";
import CreateProtype from "../pages/admin/pr_type/create";
import UpdateProtype from "../pages/admin/pr_type/edit";
import CreateSupp from "../pages/admin/supp/create";
import IndexSupp from "../pages/admin/supp/index";
import UpdateSupp from "../pages/admin/supp/edit";
import IndexPort from "../pages/admin/pr_import/index";
import CreatePort from "../pages/admin/pr_import/create";
import UpdatePort from "../pages/admin/pr_import/edit";
import IndexUser from "../pages/admin/user/index";
import IndexOrder from "../pages/admin/order/index";
import EditOrder from "../pages/admin/order/edit";
import OrderShip from "../pages/admin/order/orderShip";
import OrderReal from "../pages/admin/order/orderReal";
import OrderFail from "../pages/admin/order/orderFail";
import IndexStatic from "../pages/admin/static/index";

// user

const publicRoutes = [
  { path: "/home", component: Home },
  // { path: "/hometest", component: Hometest, layout: null },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/product", component: Product },
  { path: "/detail/:id", component: Detail },
  { path: "/cart", component: Cart },
  { path: "/order", component: Order },
  { path: "/protype/:id", component: Protype },
  { path: "/prosearch/:id", component: Prosearch },
  { path: "/hisorder", component: Historic },
  { path: "/detailOrder/:id", component: DetailOrder },
  { path: "/account", component: Account },
  { path: "/notificationOrder", component: NotificationOrder },
  { path: "/notificationFail", component: NotificationFail },
];

const adminRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/cus", component: IndexCus },
  { path: "/cus/create", component: CreateCus },
  { path: "/cus/update/:id", component: UpdateCus },
  { path: "/products", component: IndexPro },
  { path: "/products/create", component: CreatePro },
  { path: "/products/update/:id", component: UpdatePro },
  { path: "/protype", component: IndexProtype },
  { path: "/protype/create", component: CreateProtype },
  { path: "/protype/update/:id", component: UpdateProtype },
  { path: "/supp/create", component: CreateSupp },
  { path: "/supp", component: IndexSupp },
  { path: "/supp/update/:id", component: UpdateSupp },
  { path: "/import/create", component: CreatePort },
  { path: "/import", component: IndexPort },
  { path: "/import/getImport/:id", component: UpdatePort },
  { path: "/user", component: IndexUser },
  { path: "/orders", component: IndexOrder },
  { path: "/order/edit/:id", component: EditOrder },
  { path: "/orderShip", component: OrderShip },
  { path: "/orderReal", component: OrderReal },
  { path: "/orderFail", component: OrderFail },
  { path: "/static", component: IndexStatic },
];

const privateRoutes = [
  {
    // path:'/admin' , component : Admin
  },
];

export { publicRoutes, privateRoutes, adminRoutes };
