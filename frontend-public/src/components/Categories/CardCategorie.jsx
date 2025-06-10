import React from "react";
import { useNavigate } from "react-router-dom";

const CardCategorie = ({ category }) => {
  if (!category) return null;

  const { name, description, _id } = category;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 max-w-xs shadow-md bg-white">
      <h2 className="mb-2 text-xl font-semibold">{name}</h2>
      <p className="mb-3 text-gray-700">{description}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        onClick={handleClick}
      >
        Ver Productos
      </button>
    </div>
  );
};

export default CardCategorie;
