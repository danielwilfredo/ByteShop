import React, { useEffect, useState } from "react";
//import { useAuth } from "../hooks/useAuth";
import { useNavigate, NavLink } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  //const { logout, authCokie } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Aquí podrías verificar si el usuario está autenticado
    if (!localStorage.getItem("userId")) {
      // Si no hay token, redirigir al login
      setUser(null);
    } else {
      // Si hay token, podrías obtener los datos del usuario
      const userId = localStorage.getItem("userId");
      setUser(userId); // Simulación de usuario autenticado
    }
    // Si hay token, podrías hacer una llamada a la API para verificar la sesión
    // Por ejemplo, podrías hacer una llamada a un endpoint de verificación de sesión
  }, []);

  const handleLogin = () => {
    // logout();
    navigate("/login");
  };

  const handleLogout = () => {
    // logout();
    localStorage.removeItem("userId"); // Elimina el token de autenticación del localStorage
    // Aquí podrías eliminar la cookie de autenticación si es necesario
    // navigate("/");
  };

  //if (!authCokie) return null;

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "Sobre nosotros" },
    { to: "/product", label: "Productos" },
    { to: "/cart", label: "Carrito" },
  ];

  if (user) {
    navItems.push({ to: "/history", label: "Historial de compras" });
  }

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-bold"
                : "text-gray-300 hover:text-gray-400"
            }
          >
            ByteShop
          </NavLink>
        </div>

        {/* Botón hamburguesa */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Menú para pantallas medianas en adelante */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-bold"
                    : "text-gray-300 hover:text-gray-400"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Botón de logout en pantallas grandes */}
        <div className="hidden md:block">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={user ? handleLogout : handleLogin}
          >
            {user ? "Cerrar Sesión" : "Iniciar Sesión"}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-3">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-bold"
                      : "text-gray-300 hover:text-gray-400"
                  }
                  onClick={() => setIsMobileMenuOpen(false)} // Cierra menú al hacer click
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                className="w-full text-left bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleLogin}
              >
                Iniciar Sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
