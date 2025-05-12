import ModelCard from "./ModelCard";
import React from "react";

const ListModels = ({ models, loading, deleteModel, updateModel }) => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold underline text-center">
        Listado de Modelos
      </h1>
      <div className="flex flex-wrap gap-4 justify-center mt-5">
        {loading && <div className="text-center text-gray-500">Loading...</div>}

        {Array.isArray(models) && models.length > 0 ? (
          models.map((model) => (
            <ModelCard
              key={model._id}
              model={model}
              deleteModel={deleteModel}
              updateModel={updateModel} // Pasar la función correctamente
            />
          ))
        ) : (
          !loading && (
            <div className="text-center text-gray-500">
              No se encontraron modelos.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ListModels;