import React from "react";

const RegisterModel = ({
  id,
  nameModel,
  setNameModel,
  handleSubmit,
  handleEdit,
}) => {
  return (
    <>
      <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded mb-5">
        <h1 className="text-2xl hidden">Id a modificar {id}</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2 w-full"
            htmlFor="nameModel"
          >
            Nombre del Modelo
          </label>
          <input
            type="text"
            name="nameModel"
            value={nameModel}
            onChange={(e) => setNameModel(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Nombre del modelo"
          />
        </div>

        {id ? (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={(e) => {
              e.preventDefault();
              handleEdit(e);
            }}
          >
            Actualizar
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            Registrar
          </button>
        )}
      </form>
    </>
  );
};

export default RegisterModel;