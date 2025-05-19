import React, { useState } from "react";
import ModelList from "../components/Models/ListModels";
import RegisterModel from "../components/Models/RegisterModels";
import useDataModels from "../components/Models/hooks/useDataModels";

const Models = () => {
    const [activeTab, setActiveTab] = useState("list");
    const API = "http://localhost:4000/api/models";

    const {
        models,
        loading,
        id,
        nameModel,
        setNameModel,
        saveModel,
        deleteModel,
        updateModel,
        handleEdit,
    } = useDataModels(API);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Modelos</h1>
                <div>
                    <div className="flex justify-center gap-4 mb-6">
                        <button
                            className={`px-4 py-2 rounded ${activeTab === "list"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-700 text-gray-300"
                                } hover:bg-blue-600 transition`}
                            onClick={() => setActiveTab("list")}
                        >
                            Lista de Modelos
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${activeTab === "form"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-700 text-gray-300"
                                } hover:bg-blue-600 transition`}
                            onClick={() => setActiveTab("form")}
                        >
                            Gestionar Modelos
                        </button>
                    </div>
                    <div>
                        {activeTab === "list" && (
                            <ModelList
                                models={models}
                                loading={loading}
                                deleteModel={deleteModel}
                                updateModel={updateModel}
                            />
                        )}
                        {activeTab === "form" && (
                            <RegisterModel
                                setNameModel={setNameModel}
                                saveModel={saveModel}
                                nameModel={nameModel}
                                id={id}
                                handleEdit={handleEdit}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Models;
