import React, { useState, useEffect } from "react";
import ListBrands from "../components/Brands/ListBrands";
import RegisterBrand from "../components/Brands/RegisterBrand";
const Brands = () => {
  const [activeTab, setActiveTab] = useState("list");
  const API = "http://localhost:4000/api/brands";
  const [id, setId] = useState("");
  const [nameBrand, setNameBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBrands = async () => {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Hubo un error al obtener las marcas");
    }
    const data = await response.json();
    setBrands(data);
    setLoading(false);
  };

    }

    React.useEffect(() => {
        fetchBrands();
        setActiveTab("list")
    }, []);

  const saveBrand = async (e) => {
    e.preventDefault();

    const newBrand = {
      name: nameBrand,
    };

    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBrand),
    });

    if (!response.ok) {
      throw new Error("Hubo un error al registrar el empleado");
    }

    const data = await response.json();
    alert("Nueva marca registrada exitosamente");
    setBrands(data);
    fetchBrands();
    setNameBrand("");
  };

  const deleteBrand = async (id) => {
    const response = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Hubo un error al eliminar la marca");
    }

    alert("Marca eliminada exitosamente");
    fetchBrands();
  };

  const updateBrands = async (dataBrand) => {
    setId(dataBrand._id);
    setNameBrand(dataBrand.name);
    setActiveTab("form");
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const editBrand = {
        name: nameBrand,
      };
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editBrand),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la marca");
      }

      const data = await response.json();
      alert("Brand actualizado exitosamente");
      setBrands(data);
      setId(""); // Limpiar el ID
      //setActiveTab("list");
      fetchBrands(); // Volver a cargar la lista
    } catch (error) {
      console.error("Error al editar la marca:", error);
      alert("Error al editar la marca");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Empleados</h1>
        <div>
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
              onClick={() => setActiveTab("list")}
            >
              Lista de marcas
            </button>
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
              onClick={() => {
                setActiveTab("form");
              }}
            >
              Gestionar Marcas
            </button>
          </div>
          <div>
            {activeTab === "list" && (
              <div>
                <ListBrands
                  brands={brands}
                  loading={loading}
                  deleteBrand={deleteBrand}
                  updateBrands={updateBrands}
                />
              </div>
            )}
            {activeTab === "form" && (
              <div>
                <RegisterBrand
                  setNameBrand={setNameBrand}
                  saveBrand={saveBrand}
                nameBrand={nameBrand}
                id={id}
                handleEdit={handleEdit}
             
                  />
                </div>
              )}
            </div>
              
          </div>
        </div>
      </div>
    );
    }
export default Brands;
