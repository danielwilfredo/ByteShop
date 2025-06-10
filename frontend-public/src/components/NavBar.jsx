import React, { useState } from "react";
//import { useAuth } from "../hooks/useAuth";
import { useNavigate, NavLink } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  //const { logout, authCokie } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
   // logout();
    navigate("/");
  };

  //if (!authCokie) return null;

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "Sobre nosotros" },
    { to: "/product", label: "Productos" },
  ];

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-300 hover:text-gray-400"
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
                  isActive ? "text-blue-500 font-bold" : "text-gray-300 hover:text-gray-400"
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
            onClick={handleLogout}
          >
            Cerrar Sesión
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
                    isActive ? "text-blue-500 font-bold" : "text-gray-300 hover:text-gray-400"
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
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
