import React from "react";
import Nav from "./components/navbar";
import Employees from "./pages/Employees";
import Brands from "./pages/Brands";
import Models from "./pages/Models";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
|    <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/brands" element={<Brands />} />
        <Route path='/models' element={<Models />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
