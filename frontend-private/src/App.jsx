// App.js
import React from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import Navegation from "./components/Navegation";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navegation />
        <Toaster
          toastOptions={{
            duration: 1000,
          }}
        />
        <Toaster
          toastOptions={{
            duration: 1000,
          }}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
