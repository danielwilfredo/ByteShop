import React from "react";

const Nav = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold">
          <a href="/" className="hover:text-gray-300">
            ByteShop
          </a>
        </div>
        <ul className="flex space-x-4">
          <li>
            <a href="/employees" className="hover:text-gray-200">
              Empleados
            </a>
          </li>
          <li>
            <a href="/brands" className="hover:text-gray-200">
              Brands
            </a>
          </li>
          <li>
            <a href="/models" className="hover:text-gray-200">
              Models
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
