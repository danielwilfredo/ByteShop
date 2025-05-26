import React, { useEffect } from "react";
import NavBar from "./NavBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import Brands from "../pages/Brands";
import Models from "../pages/Models";
import Categories from "../pages/Categories";
import Payment from "../pages/payment.jsx";
import { PrivateRoute } from "./PrivateRoute";

import { useAuth } from "../context/AuthContext";

function Navegation() {
  //en el frontned manejo la autenticacion con cookie osea obtengo lo que
  //devuelve el backend y lo guardo en una cookie
  //y en el frontend lo guardo en el contexto
  const { authCokie } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authCokie) {
      navigate("/dashboard");
    }
  }, [authCokie]);

  return (
    <>
      <NavBar />
      <Routes>
        {!authCokie ? <Route path="/" element={<Login />} /> : null}

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/models" element={<Models />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>
    </>
  );
}
export default Navegation;
