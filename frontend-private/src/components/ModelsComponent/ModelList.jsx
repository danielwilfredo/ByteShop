import ModelCard from "./ModelCard";
import React from 'react';

const ModelList = ({ models, loading, deleteModel, updateModel }) => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center text-gray-200 underline">
                Listado de Modelos
            </h1>
            <div className="flex flex-wrap gap-6 justify-center mt-8">
                {loading && (
                    <div className="text-center text-gray-400">Cargando...</div>
                )}

                {models?.map((model) => (
                    <ModelCard
                        key={model._id}
                        model={model}
                        deleteModel={deleteModel}
                        updateModel={updateModel}
                    />
                ))}
            </div>
        </div>
    );
};

export default ModelList;