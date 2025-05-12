import React, { useState, useEffect } from "react";

const useDataCategories = () => {

    const [activeTab, setActiveTab] = useState("list");
  const API = "http://localhost:4000/api/brands";
  const [id, setId] = useState("");
  const [nameCategorie, setNameCategorie] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Hubo un error al obtener las marcas");
    }
    const data = await response.json();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const saveCategories = async (e) => {
    e.preventDefault();

    const newCategorie = {
      name: nameCategorie,
    };

    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategorie),
    });

    if (!response.ok) {
      throw new Error("Hubo un error al registrar una categoria");
    }

    const data = await response.json();
    alert("Nueva categoria registrada exitosamente");
    setCategories(data);
    fetchCategories();
    setNameCategorie("");
  };

  const deleteCategorie = async (id) => {
    const response = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Hubo un error al eliminar la categoria");
    }

    alert("Categoria eliminada exitosamente");
    fetchCategories();
  };

  const updateCategories = async (dataCategorie) => {
    setId(dataCategorie._id);
    setNameCategorie(dataCategorie.name);
    setActiveTab("form");
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const editCategorie = {
        name: nameCategorie,
      };
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editCategorie),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la categoria");
      }

      const data = await response.json();
      alert("Brand actualizado exitosamente");
      setCategories(data);
      setId(""); // Limpiar el ID
      //setActiveTab("list");
      fetchCategories(); // Volver a cargar la lista
    } catch (error) {
      console.error("Error al editar la marca:", error);
      alert("Error al editar la marca");
    }
  };

  return{
    activeTab,
    setActiveTab,
    id,
    setId,
    nameCategorie,
    setNameCategorie,
    categories,
    setCategories,
    loading,
    setLoading,
    fetchCategories,
    saveCategories,
    deleteCategorie,
    updateCategories,
    handleEdit
  }
}

export default useDataCategories;