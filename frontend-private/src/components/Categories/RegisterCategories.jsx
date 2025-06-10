import React from "react";
import InputText from "../InputText";

const RegisterCategory = ({
  setNameCategory,
  nameCategory,
  setDescription,
  description,
  saveCategory,
  id,
  handleEdit,
}) => {
  return (
    <div className="">
      <form className="w-full max-w-lg mx-auto mt-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <InputText
          value={nameCategory}
          onChange={(e) => setNameCategory(e.target.value)}
          placeholder="Categoría"
          className="w-full px-3 py-2 border rounded"
        />
        <InputText
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          className="w-full px-3 py-2 border rounded"
        />

        {!id ? (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={(e) => saveCategory(e)}
          >
            Guardar
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={(e) => handleEdit(e)}
          >
            Editar
          </button>
        )}
      </form>
    </div>
  );
};

export default RegisterCategory;
