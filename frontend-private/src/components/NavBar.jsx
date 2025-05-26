import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { logout, authCokie } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Si no hay sesión, no mostrar el NavBar
  if (!authCokie) return null;

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-bold"
                : "text-gray-300 hover:text-gray-400"
            }
          >
            ByteShop
          </NavLink>
        </div>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/models"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold"
                  : "text-gray-300 hover:text-gray-400"
              }
            >
              Modelos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/brands"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold"
                  : "text-gray-300 hover:text-gray-400"
              }
            >
              Marcas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold"
                  : "text-gray-300 hover:text-gray-400"
              }
            >
              Empleados
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold"
                  : "text-gray-300 hover:text-gray-400"
              }
            >
              Categorias
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/payment"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold"
                  : "text-gray-300 hover:text-gray-400"
              }
            >
              Payment
            </NavLink>
          </li>
        </ul>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
