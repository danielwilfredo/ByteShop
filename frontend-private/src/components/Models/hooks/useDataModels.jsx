import { useState, useEffect } from "react";

const useDataModels = (API) => {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState("");
    const [nameModel, setNameModel] = useState("");

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
        } catch (error) {
            console.error("Error al actualizar el modelo:", error);
            alert("Hubo un error al actualizar el modelo");
        }
    };

    useEffect(() => {
        fetchModels();
    }, []);

    return {
        models,
        loading,
        id,
        nameModel,
        setNameModel,
        saveModel,
        deleteModel,
        updateModel,
        handleEdit,
    };
};

export default useDataModels;