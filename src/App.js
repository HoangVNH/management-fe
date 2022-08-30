import React from "react";
import "./assests/scss/index.scss";
import "./assests/css/index.css";
import MainLayout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import PartnerDetails from "./features/partner/PartnerDetails";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import CustomerHomePage from "./features/homepage/Customer";
import PartnerHomepage from "./features/homepage/Partner";
import Contracts from "./features/partner/Contracts";
import Orders from "./features/partner/Orders";
import AddProduct from "./features/product/pages/AddProduct";
import UpdateProduct from "./features/product/pages/UpdateProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route element={<RequireAuth />}>
          <Route
            path="customer/partners"
            index
            element={<CustomerHomePage />}
          />
          <Route
            path="customer/partners/:partnerId"
            element={<PartnerDetails />}
          />

          <Route path="partner/products" index element={<PartnerHomepage />} />
          <Route path="partner/products/add-new" element={<AddProduct />} />
          <Route
            path="partner/update-product/:productId"
            element={<UpdateProduct />}
          />
          <Route path="partner/contracts" element={<Contracts />} />
          <Route path="partner/orders" element={<Orders />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
