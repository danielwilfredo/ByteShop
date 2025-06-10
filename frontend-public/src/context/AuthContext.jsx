import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext(null);
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = "http://localhost:4000/api";

  const navigate = useNavigate();

  const clearSession = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAuthToken(null);
  };

  const logout = useCallback(() => {
    const logoutUser = async () => {
      try {
        await fetch(`${API_URL}/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (error) {
        console.error("Error during logout:", error);
      } finally {
        clearSession();
        navigate("/");
        toast.success("Sesión cerrada correctamente");
      }
    };

    logoutUser();
  }, [API_URL, navigate]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setAuthToken(data.token);
        setUser(data.userId);
        toast.success("Inicio de sesión exitoso");
        navigate("/dashboard");
        return true;
      } else {
        toast.error(data.message || "Error al iniciar sesión");
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Error de conexión con el servidor");
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/registerClients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        toast.success("Cuenta registrada correctamente.");
        return true;
      } else {
        const data = await response.json();
        toast.error(data.message || "Error al registrar");
        return false;
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      toast.error("Error de conexión al registrar.");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        loading,
        login,
        logout,
        register,
        API: API_URL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
