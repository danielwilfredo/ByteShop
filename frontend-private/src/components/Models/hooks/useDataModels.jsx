import { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";


const useDataModels = () => {   
 //codigo de las funciones
 //estado para manejar el tab activo
 const [activeTab, setActiveTab] = useState("list");
 //estado para almacenar la información de los modelos que devuelve el api
 const [models, setModels] = useState([]);
 //estado para manejar loading
 const [loading, setLoading] = useState(false);
 //estado para manejar el nombre del modelo y id al editar un modelo
 const [modelName, setModelName] = useState("");
 const [id, setId] = useState("");

 //funcion para consultar los modelos
 const fetchModels = async () => {
   const response = await fetch("http://localhost:4000/api/models");

   if (!response.ok) {
     throw new Error("Hubo un error al obtener las marcas");
   }

   const data = await response.json();
   setModels(data);
   setLoading(false);
 };

 // funcion para guardar un nuevo modelo
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

   toast.success("Modelo registrado exitosamente");
   fetchModels();
   setModelName("");
 };

 // useEffect para cargar los modelos al cargar la página
 useEffect(() => {
   fetchModels();
 }, []);

 //funcion para eliminar un modelo
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

   toast.success("Modelo Eliminado");
   fetchModels();
 };

 //funcion para tomar la información de un modelo al editar
 const updateModels = async (model) => {
   setId(model._id);
   setModelName(model.name);
   setActiveTab("form");
 };

 //funcion para editar un modelo
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
   toast.success("Modelo actualizado");
   setModelName("");
   setId(""); // Limpiar el ID
   setActiveTab("list");
   fetchModels();
 };







 //retornar el state y funciones

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
    handleEdit,
    setLoading

}

}

export default useDataModels;