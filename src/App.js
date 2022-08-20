import React from "react";
import "./assests/scss/index.scss";
import "./assests/css/index.css";
import MainLayout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import PartnerDetails from "./features/partner/PartnerDetails";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import HomePage from "./features/homepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route element={<RequireAuth />}>
          <Route path="customer/partners" element={<HomePage />} />
          <Route
            path="customer/partners/:partnerId"
            element={<PartnerDetails />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
