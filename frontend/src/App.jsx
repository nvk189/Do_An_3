/* eslint-disable no-unused-vars */
import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Defaultuser } from "./components/layout";
import { publicRoutes } from "./routes/routers";
import { adminRoutes } from "./routes/routers";
import { Defaultadmin } from "./components/layout";
import { Provider } from "react-redux";
import store from "./redux/store";
// import { Scroll } from "./components/scroll/scrollTop";
function App() {
  const combinedRoutes = [
    ...adminRoutes.map((route) => ({
      ...route,
      layout: route.layout === null ? Fragment : Defaultadmin,
    })),
    ...publicRoutes.map((route) => ({
      ...route,
      layout: route.layout === null ? Fragment : Defaultuser,
    })),
  ];

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {combinedRoutes.map((route, index) => {
            const Layout = route.layout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
