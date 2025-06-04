// App.js
import React from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import Navegation from "./components/Navegation";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Router>
    <Navegation/>
      
    </Router>
      
    </>
  );
}

export default App;
