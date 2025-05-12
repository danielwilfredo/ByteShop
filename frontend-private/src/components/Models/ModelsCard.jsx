import React from "react";
import Button from "../Button";

const ModelsCard = ({ model, deleteModel, updateModels }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Modelo:{" "}
          <span className="text-xl font-medium text-gray-500">
            {model.name}{" "}
          </span>
        </h2>

        <Button
          label={"Eliminar"}
          actionButton={() => deleteModel(model._id)}
        />

        <Button
          label={"Editar información"}
          actionButton={() => updateModels(model)}
        />
      </div>
    </div>
  );
};

export default ModelsCard;

/*
   <button
            className=" ml-2 mt-4 px-4 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600"
          >
            Editar información
          </button>
*/
