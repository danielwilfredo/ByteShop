import React from 'react';

const RegisterModel = ({ setNameModel, nameModel, saveModel, id, handleEdit }) => {
    return (
        <div className="p-6">
            <form className="w-full max-w-lg mx-auto mt-10 bg-white/10 backdrop-blur-md shadow-lg rounded-lg px-8 pt-6 pb-8">
                <div className="mb-6">
                    <label
                        className="block text-gray-200 font-bold mb-2"
                        htmlFor="name"
                    >
                        {id ? "Editar Modelo" : "Registrar Modelo"}
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={nameModel}
                        onChange={(e) => setNameModel(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nombre del modelo"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500/80 text-white py-2 px-4 rounded hover:bg-blue-600/90 transition"
                    onClick={(e) => (id ? handleEdit(e) : saveModel(e))}
                >
                    {id ? "Actualizar" : "Guardar"}
                </button>
            </form>
        </div>
    );
};

export default RegisterModel;