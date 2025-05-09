import React from "react";
import Employees from "./pages/Employees";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Brands from "./pages/Brands";
import Models from "./pages/Models";
import Categories from "./pages/Categories"

function App() {
  return (
    <>
      <h1 className="text-2xl font-bold underline text-center">ByteShop</h1>

      <Router>
        <Routes>
          <Route path="/" element={<Categories />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
