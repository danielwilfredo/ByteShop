import React, { useState, useEffect } from "react";
import ListCategories from "../components/Categories/ListCategories";
import RegisterCategory from "../components/Categories/RegisterCategories";
import toast, { Toaster } from "react-hot-toast";
import PayPalButton from "../components/PaypalButton";

const Categories = () => {
  const [activeTab, setActiveTab] = useState("list");
  const API = "http://localhost:4000/api/categories";
  const [id, setId] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  //const total = 33;

  const fetchCategories = async () => {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Hubo un error al obtener las categorías");
    }
    const data = await response.json();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const saveCategory = async (e) => {
    e.preventDefault();
    const newCategory = {
      name: nameCategory,
      description,
    };

    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    });

    if (!response.ok) {
      throw new Error("Hubo un error al registrar la categoría");
    }

    const data = await response.json();
    toast.success("Categoría registrada");
    setCategories(data);
    fetchCategories();
    setNameCategory("");
    setDescription("");
  };

  const deleteCategory = async (id) => {
    const response = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Hubo un error al eliminar la categoría");
    }

    toast.success("Categoria Eliminada");
    fetchCategories();
  };

  const updateCategories = async (dataCategory) => {
    setId(dataCategory._id);
    setNameCategory(dataCategory.name);
    setDescription(dataCategory.description);
    setActiveTab("form");
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const editCategory = {
        name: nameCategory,
        description,
      };
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editCategory),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la categoría");
      }

      const data = await response.json();
      toast.success("categoría actualizada");
      setId("");
      setDescription("");
      setNameCategory("");
      setActiveTab("list");
      fetchCategories();
    } catch (error) {
      console.error("Error al editar la categoría:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Categorías</h1>
        <div>
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
              onClick={() => setActiveTab("list")}
            >
              Lista de categorías
            </button>
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
              onClick={() => {
                setActiveTab("form");
              }}
            >
              Gestionar Categorías
            </button>
          </div>
          <div>
            {activeTab === "list" && (
              <div>
                <ListCategories
                  categories={categories}
                  loading={loading}
                  deleteCategory={deleteCategory}
                  updateCategories={updateCategories}
                />
              </div>
            )}
            {activeTab === "form" && (
              <div>
                <RegisterCategory
                  setNameCategory={setNameCategory}
                  setDescription={setDescription}
                  saveCategory={saveCategory}
                  nameCategory={nameCategory}
                  description={description}
                  id={id}
                  handleEdit={handleEdit}
                />
              </div>
            )}
            
           
            
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
      />
    </div>
  );
};

export default Categories;
