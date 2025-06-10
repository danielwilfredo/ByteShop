import React from "react";
import NavBar from "./NavBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Products from "../pages/Products";
import CartProducts from "../pages/CartProducts";
import LoginRegister from "../pages/Login";
import Orders from "../pages/Orders";
import PrivateRoute from "./PrivateRoute";

function Navegation() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/product/:id?" element={<Products />} />
        <Route path="/cart?" element={<CartProducts />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/history" element={<Orders />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
export default Navegation;
