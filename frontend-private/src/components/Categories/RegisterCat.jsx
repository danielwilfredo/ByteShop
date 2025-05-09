import React from 'react';
import Button from '../Button';
 
const RegisterCat = ({ saveCategory, setNameCategory, categoryName, handleEdit, id ,setDescriptionCategory}) => {
  return (
    <div className="">
      <form className="w-full max-w-lg mx-auto mt-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Nombre Categoría: {categoryName}
          </label>
          <input
            type="text"
            name="name"
            value={categoryName}
            onChange={(e) => setNameCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Ejemplo: Ropa"
          />
        </div>
 
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Descripción:
          </label>
          <textarea
            name="description"
            value={categoryName}
            onChange={(e) => setDescriptionCategory(e.target.value)}  // Cambiar esto por el estado para descripción
            className="w-full px-3 py-2 border rounded"
            placeholder="Descripción de la categoría"
          />
        </div>
 
        {(!id) ? (
          <Button
            label={"Guardar"}
            actionButton={(e) => {
              saveCategory(e);
            }}
          />
        ) : (
          <Button
            label={"Editar"}
            actionButton={(e) => {
              handleEdit(e);
            }}
          />
        )}
      </form>
    </div>
  );
};
 
export default RegisterCat;