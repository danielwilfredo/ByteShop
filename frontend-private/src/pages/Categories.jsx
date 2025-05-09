import React, { useState, useEffect } from "react";
import ListCategories from "../components/Categories/ListCategories";
import RegisterCategorie from "../components/Categories/RegisterCategorie";
const Categories = () => {
    const [activeTab, setActiveTab] = useState("trabajo");
    const API = "http://localhost:4000/api/categories";
    const [id, setId] = useState("");
    const [nameCategorie, setNameCategorie] = useState("");
    const [descriptionCategorie, setDescriptionCategorie] = useState("");
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

    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const saveCategorie = async (e) => {
    e.preventDefault();

    const newCategorie = {
        name: nameCategorie,
        description: descriptionCategorie
    }

    const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategorie),
      });

      if (!response.ok) {
        throw new Error("Hubo un error al registrar el empleado");
      }

      const data = await response.json();
      alert("Nueva marca registrada exitosamente");
      setCategories(data);
      fetchCategories();
      setNameCategorie("");
      setDescriptionCategorie("");
    }

    const deleteCategorie = async (id) => {
        const response = await fetch(`${API}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Hubo un error al eliminar la marca");
        }

        alert("Categoria eliminada exitosamente");
        fetchCategories();
    }

    const updateCategories = async (dataCategory) => {
      setId(dataCategory._id);
      setNameCategorie(dataCategory.name)
      setDescriptionCategorie(dataCategory.description)
      setActiveTab("form")
    };
  
    const handleEdit = async (e)=>{
      e.preventDefault();

      try {

        
      const editCategorie={
        name: nameCategorie,
        description: descriptionCategorie
      }
      const response = await fetch(`${API}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editCategorie),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar la categoría");
      }
    
      const data = await response.json();
      alert("Categoría actualizado exitosamente");
      setCategories(data);
      setId(""); // Limpiar el ID
      //setActiveTab("list");
      fetchCategories(); // Volver a cargar la lista

        
      } catch (error) {
        console.error("Error al editar la marca:", error);
        alert("Error al editar la marca");
        
      }

   }
    
    return (
        <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Categorias</h1>
          <div>
            <div className="flex border-b border-gray-200 mb-4">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
                onClick={() => setActiveTab("list")}
              >
                Lista de categorias
              </button>
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
                onClick={() => { setActiveTab("form") 
                 }}
              >
                Gestionar Categorias
              </button>
            </div>
            <div>
              {activeTab === "list" && (
                <div>
                  <ListCategories
                  categories={categories} //
                  loading={loading}
                  deleteCategorie={deleteCategorie}
                  updateCategories={updateCategories}
           
                  />
                </div>
              )}
              {activeTab === "form" && (
                <div>
                  <RegisterCategorie
                  setNameCategorie={setNameCategorie}
                  setDescriptionCategorie={setDescriptionCategorie}
                  saveCategorie={saveCategorie}
                nameCategorie={nameCategorie}
                descriptionCategorie={descriptionCategorie}
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
export default Categories;