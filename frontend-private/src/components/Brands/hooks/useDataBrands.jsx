import { useState, useEffect } from "react";

const useDataBrands = (API) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [nameBrand, setNameBrand] = useState("");

  const fetchBrands = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error("Hubo un error al obtener las marcas");
      }
      const data = await response.json();
      setBrands(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const saveBrand = async (e) => {
    e.preventDefault();
    try {
      const newBrand = { name: nameBrand };
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBrand),
      });
      if (!response.ok) {
        throw new Error("Hubo un error al registrar la marca");
      }
      alert("Nueva marca registrada exitosamente");
      fetchBrands();
      setNameBrand("");
    } catch (error) {
      console.error(error);
      alert("Error al registrar la marca");
    }
  };

  const deleteBrand = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Hubo un error al eliminar la marca");
      }
      alert("Marca eliminada exitosamente");
      fetchBrands();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la marca");
    }
  };

  const updateBrands = (dataBrand) => {
    setId(dataBrand._id);
    setNameBrand(dataBrand.name);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const editBrand = { name: nameBrand };
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editBrand),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar la marca");
      }
      alert("Marca actualizada exitosamente");
      fetchBrands();
      setId("");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la marca");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return {
    brands,
    loading,
    nameBrand,
    setNameBrand,
    id,
    saveBrand,
    deleteBrand,
    updateBrands,
    handleEdit,
  };
};

export default useDataBrands;