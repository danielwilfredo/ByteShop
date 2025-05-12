import React, { useState, useEffect } from "react";

const useDataModels = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modelName, setModelName] = useState("");
  const [id, setId] = useState("");

  const fetchModels = async () => {
    const response = await fetch("http://localhost:4000/api/models");

    if (!response.ok) {
      throw new Error("Hubo un error al obtener las marcas");
    }

    const data = await response.json();
    setModels(data);
    setLoading(false);
  };

  const saveModels = async (e) => {
    e.preventDefault();

    const newModel = {
      name: modelName,
    };

    const response = await fetch("http://localhost:4000/api/models", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newModel),
    });

    if (!response.ok) {
      throw new Error("Hubo un error al registrar el empleado");
    }

    //const data = await response.json();

    alert("Modelo registrado correctamente");
    fetchModels();
    setModelName("");
  };

  // useEffect
  useEffect(() => {
    fetchModels();
  }, []);

  const deleteModel = async (id) => {
    const response = await fetch(`http://localhost:4000/api/models/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Hubo un error al eliminar el modelo");
    }

    // const data = await response.json();

    alert("Modelo eliminado correctamente");
    fetchModels();
  };

  const updateModels = async (model) => {
    setId(model._id);
    setModelName(model.name);
    setActiveTab("form");
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedModel = {
      name: modelName,
    };

    const response = await fetch(`http://localhost:4000/api/models/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedModel),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la modelo");
    }

    //const data = await response.json();
    alert("Modelo actualizado exitosamente");
    setModelName("");
    setId(""); // Limpiar el ID
    fetchModels();
  };
  return {
    activeTab,
    setActiveTab,
    models, 
    setModels,
    loading, 
    setLoading,
    modelName, 
    setModelName,
    id, 
    setId,
    fetchModels,
    saveModels,
    deleteModel,
    updateModels,
    handleEdit
  };
};

export default useDataModels;