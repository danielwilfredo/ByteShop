import React, { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Asegúrate de importar tu contexto

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // 🔥 Aquí accedes al estado global del AuthContext
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout(); // 🔥 Cierra sesión correctamente con el contexto
  };

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

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            ☰
          </button>
        </div>

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

        <div className="hidden md:block">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={user ? handleLogout : handleLogin}
          >
            {user ? "Cerrar Sesión" : "Iniciar Sesión"}
          </button>
        </div>
      </div>

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
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                className="w-full text-left bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={user ? handleLogout : handleLogin}
              >
                {user ? "Cerrar Sesión" : "Iniciar Sesión"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
