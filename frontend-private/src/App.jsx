import React from "react";
import Employees from "./pages/Employees";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Brands from "./pages/Brands";
import Models from "./pages/Models";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/models" element={<Models />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
