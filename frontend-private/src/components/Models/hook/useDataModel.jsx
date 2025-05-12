import React, { useState, useEffect } from "react";

const useDataModel = () => {
  const API = "http://localhost:4000/api/models";

  const [activeTab, setActiveTab] = useState("list");
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameModel, setNameModel] = useState("");
  const [id, setId] = useState("");

  // Función para limpiar los datos del formulario
  const cleanData = () => {
    setNameModel("");
    setId("");
  };

  // Función para obtener los modelos desde la API
  const fetchModels = async () => {
    try {
      setLoading(true);
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Hubo un error al obtener los modelos");
      }

      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error("Error al obtener los modelos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para guardar un nuevo modelo
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameModel.trim()) {
      alert("El nombre del modelo no puede estar vacío");
      return;
    }

    const newModel = {
      name: nameModel.trim(),
    };

    try {
      setLoading(true);
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newModel),
      });

      if (!response.ok) {
        throw new Error("Hubo un error al registrar el modelo");
      }

      alert("Modelo registrado correctamente");
      fetchModels(); // Actualizar la lista de modelos
      cleanData(); // Limpiar el formulario
    } catch (error) {
      console.error("Error al registrar el modelo:", error);
      alert("Error al registrar el modelo: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un modelo
  const deleteModel = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Hubo un error al eliminar el modelo");
      }

      alert("Modelo eliminado correctamente");
      fetchModels(); // Actualizar la lista de modelos
    } catch (error) {
      console.error("Error al eliminar el modelo:", error);
      alert("Error al eliminar el modelo: " + error.message);
    }
  };

  // Función para preparar los datos para editar un modelo
  const updateModel = (model) => {
    setId(model._id);
    setNameModel(model.name);
    setActiveTab("form");
  };

  // Función para editar un modelo existente
  const handleEdit = async (e) => {
    e.preventDefault();

    if (!nameModel.trim()) {
      alert("El nombre del modelo no puede estar vacío");
      return;
    }

    const updatedModel = {
      name: nameModel.trim(),
    };

    try {
      setLoading(true);
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedModel),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el modelo");
      }

      alert("Modelo actualizado exitosamente");
      fetchModels(); // Actualizar la lista de modelos
      cleanData(); // Limpiar el formulario
      setActiveTab("list"); // Volver a la lista
    } catch (error) {
      console.error("Error al editar el modelo:", error);
      alert("Error al editar el modelo: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar fetchModels al cargar la página
  useEffect(() => {
    fetchModels();
  }, []);

  return {
    activeTab,
    setActiveTab,
    models,
    setModels,
    loading,
    setLoading,
    nameModel,
    setNameModel,
    id,
    setId,
    cleanData,
    fetchModels,
    handleSubmit,
    deleteModel,
    updateModel,
    handleEdit,
  };
};

export default useDataModel;