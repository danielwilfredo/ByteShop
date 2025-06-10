// App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navegation from "./components/Navegation";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navegation />

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
