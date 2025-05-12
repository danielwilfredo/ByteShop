import React, { useState } from "react";
import ModelList from "../components/Models/ListModels";
import RegisterModel from "../components/Models/RegisterModels";

const Models = () => {
    const [activeTab, setActiveTab] = useState("list");
    const API = "http://localhost:4000/api/models";
    const [id, setId] = useState("");
    const [nameModel, setNameModel] = useState("");
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchModels = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error("Error al obtener los modelos");
            }
            const data = await response.json();
            setModels(data);
        } catch (error) {
            console.error("Error al obtener los modelos:", error);
            alert("Hubo un error al cargar los modelos");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchModels();
    }, []);

    const saveModel = async (e) => {
        e.preventDefault();
        const newModel = { name: nameModel };

        try {
            const response = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newModel),
            });

            if (!response.ok) {
                throw new Error("Error al registrar el modelo");
            }

            alert("Nuevo modelo registrado exitosamente");
            fetchModels();
            setNameModel("");
        } catch (error) {
            console.error("Error al registrar el modelo:", error);
            alert("Hubo un error al registrar el modelo");
        }
    };

    const deleteModel = async (id) => {
        try {
            const response = await fetch(`${API}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el modelo");
            }

            alert("Modelo eliminado exitosamente");
            fetchModels();
        } catch (error) {
            console.error("Error al eliminar el modelo:", error);
            alert("Hubo un error al eliminar el modelo");
        }
    };

    const updateModel = (dataModel) => {
        setId(dataModel._id);
        setNameModel(dataModel.name);
        setActiveTab("form");
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const updatedModel = { name: nameModel };

        try {
            const response = await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedModel),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el modelo");
            }

            alert("Modelo actualizado exitosamente");
            fetchModels();
            setId("");
            setNameModel("");
            setActiveTab("list");
        } catch (error) {
            console.error("Error al actualizar el modelo:", error);
            alert("Hubo un error al actualizar el modelo");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Modelos</h1>
                <div>
                    <div className="flex justify-center gap-4 mb-6">
                        <button
                            className={`px-4 py-2 rounded ${
                                activeTab === "list"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-700 text-gray-300"
                            } hover:bg-blue-600 transition`}
                            onClick={() => setActiveTab("list")}
                        >
                            Lista de Modelos
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${
                                activeTab === "form"
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
