import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Creamos el contexto
const AuthContext = createContext(null);

// Exportamos el contexto para que pueda ser importado por useAuth.js
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCokie, setAuthCokie] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = "http://localhost:4000/api";
  
  const navigate = useNavigate();

  // Función para limpiar sesión - función interna que no causa dependencias cíclicas
  const clearSession = () => {
    localStorage.removeItem("token");
    // Eliminar la cookie con el nombre correcto (authToken)
    Cookies.remove("authToken", { path: '/' }); // Añadir path para asegurar que se elimina correctamente
    setUser(null);
    setAuthCokie(null);
  };
  
  // Definir la función logout como useCallback para evitar recreaciones
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

  // Función para iniciar sesión
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
        setAuthCokie(data.token);
        setUser(data.user);
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

  // Verificar sesión al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const cookieToken = Cookies.get("authToken"); // Usar el mismo nombre que usa el backend (authToken)

        if (token || cookieToken) {
          // Como no hay un endpoint específico para verificar tokens, vamos a usar
          // una ruta protegida simple para ver si el token es válido
          const response = await fetch(`${API_URL}/products`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Usar el token que tenemos (del localStorage o de la cookie)
              Authorization: `Bearer ${token || cookieToken}`,
            },
            credentials: "include",
          });

          if (response.ok) {
            // Si la respuesta es exitosa, significa que el token es válido
            // Decodificar el token para obtener información del usuario
            try {
              // Una manera simple de extraer la info del usuario del token
              const tokenParts = (token || cookieToken).split('.');
              if (tokenParts.length === 3) {
                const payload = JSON.parse(atob(tokenParts[1]));
                setUser({
                  id: payload.id,
                  userType: payload.userType
                });
                setAuthCokie(token || cookieToken);
              }
            } catch (e) {
              console.error("Error decoding token:", e);
            }
          } else {
            // Token inválido
            clearSession();
          }
        } else {
          clearSession();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API_URL]); // Sólo depende de API_URL

  // Objeto de valores del contexto
  const contextValue = {
    user,
    authCokie,
    loading,
    login,
    logout,
    API: API_URL // Exponer API_URL como API para que sea accesible en useDataProducts
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
