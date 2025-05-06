import React from 'react';

const ModelCard = ({ model, deleteModel, updateModel }) => {
    return (
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md shadow-lg rounded-lg overflow-hidden border border-gray-700">
            <div className="px-6 py-4">
                <h2 className="text-xl font-bold text-gray-200 mb-2">
                    Modelo: {model.name}
                </h2>
                <p className="text-sm text-gray-400">ID: {model._id}</p>

                <div className="mt-4 flex justify-between">
                    <button
                        className="px-4 py-2 bg-red-500/80 text-white font-semibold rounded hover:bg-red-600/90 transition"
                        onClick={() => deleteModel(model._id)}
                    >
                        Eliminar
                    </button>
                    <button
                        className="px-4 py-2 bg-orange-500/80 text-white font-semibold rounded hover:bg-orange-600/90 transition"
                        onClick={() => updateModel(model)}
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModelCard;