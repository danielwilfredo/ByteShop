import React from "react";

const BrandCard = ({ brand, deleteBrand, updateBrands }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Marca:{" "}
          <span className="text-xl font-medium text-gray-700">
            {brand.name}{" "}
          </span>
        </h2>

        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
          onClick={() => deleteBrand(brand._id)}
        >
          Eliminar
        </button>
        <button
          className=" ml-2 mt-4 px-4 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600"
          onClick={() => updateBrands(brand)}
        >
          Editar información
        </button>
      </div>
    </div>
  );
};

export default BrandCard;
