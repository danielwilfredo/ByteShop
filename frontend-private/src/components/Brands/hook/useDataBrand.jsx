import React, { useState, useEffect } from "react";

const useDataBrand = () => {
  const API = "http://localhost:4000/api/brands";

  const [activeTab, setActiveTab] = useState("list");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameBrand, setNameBrand] = useState("");
  const [id, setId] = useState("");

  // Función para limpiar los datos del formulario
  const cleanData = () => {
    setNameBrand("");
    setId("");
  };

  // Función para obtener las marcas desde la API
  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Hubo un error al obtener las marcas");
      }

      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error al obtener las marcas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para guardar una nueva marca
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameBrand.trim()) {
      alert("El nombre de la marca no puede estar vacío");
      return;
    }

    const newBrand = {
      name: nameBrand.trim(),
    };

    try {
      setLoading(true);
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBrand),
      });

      if (!response.ok) {
        throw new Error("Hubo un error al registrar la marca");
      }

      alert("Marca registrada correctamente");
      fetchBrands(); // Actualizar la lista de marcas
      cleanData(); // Limpiar el formulario
    } catch (error) {
      console.error("Error al registrar la marca:", error);
      alert("Error al registrar la marca: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar una marca
  const deleteBrand = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Hubo un error al eliminar la marca");
      }

      alert("Marca eliminada correctamente");
      fetchBrands(); // Actualizar la lista de marcas
    } catch (error) {
      console.error("Error al eliminar la marca:", error);
      alert("Error al eliminar la marca: " + error.message);
    }
  };

  // Función para preparar los datos para editar una marca
  const updateBrand = (brand) => {
    setId(brand._id);
    setNameBrand(brand.name);
    setActiveTab("form");
  };

  // Función para editar una marca existente
  const handleEdit = async (e) => {
    e.preventDefault();

    if (!nameBrand.trim()) {
      alert("El nombre de la marca no puede estar vacío");
      return;
    }

    const updatedBrand = {
      name: nameBrand.trim(),
    };

    try {
      setLoading(true);
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBrand),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la marca");
      }

      alert("Marca actualizada exitosamente");
      fetchBrands(); // Actualizar la lista de marcas
      cleanData(); // Limpiar el formulario
      setActiveTab("list"); // Volver a la lista
    } catch (error) {
      console.error("Error al editar la marca:", error);
      alert("Error al editar la marca: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar fetchBrands al cargar la página
  useEffect(() => {
    fetchBrands();
  }, []);

  return {
    activeTab,
    setActiveTab,
    brands,
    setBrands,
    loading,
    setLoading,
    nameBrand,
    setNameBrand,
    id,
    setId,
    cleanData,
    fetchBrands,
    handleSubmit,
    deleteBrand,
    updateBrand,
    handleEdit,
  };
};

export default useDataBrand;