import { useEffect, useState } from "react";
import toast, {Toaster} from 'react-hot-toast';
const useDataCategories = () => {
 //codigo de las funciones

  const [activeTab, setActiveTab] = useState("list");
  const API = "http://localhost:4000/api/categories";
  const [id, setId] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
    toast.success('Categoría registrada');
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

      toast.success('Categoria Eliminada');
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
       toast.success('categoría actualizada');
      setId("");
      setDescription("");
      setNameCategory("");
      setActiveTab("list");
      fetchCategories();
    } catch (error) {
      console.error("Error al editar la categoría:", error);
    }
  };







 //retornar el state y funciones


  return {
    activeTab, setActiveTab,
    API,
    id, 
    setId,
    nameCategory, 
    setNameCategory,
    description, 
    setDescription,
    categories, 
    setCategories,
    loading, 
    setLoading,
    fetchCategories,
    saveCategory,
    deleteCategory,
    updateCategories,
    handleEdit

  };
};

export default useDataCategories;