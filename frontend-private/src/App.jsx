import React from "react";
import Employees from "./pages/Employees";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Models from "./pages/Models";
function App() {
  return (
    <>
      <h1 className="text-2xl font-bold underline text-center">ByteShop</h1>

      <Router>
        <Routes>
          <Route path="/" element={<Models />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
