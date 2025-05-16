import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const useDataBrands = () => {

 //codigo de las funciones
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

 useEffect(() => {
   fetchBrands();
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
   toast.success('Nueva marca registrada exitosamente');
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

   toast.success('Marca eliminada exitosamente');
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
     toast.success('Marca Actualizada');
     setBrands(data);
     setId(""); // Limpiar el ID
     //setActiveTab("list");
     fetchBrands(); // Volver a cargar la lista
   } catch (error) {
     console.error("Error al editar la marca:", error);
     alert("Error al editar la marca");
   }
}







 //retornar el state y funciones


    return {
        activeTab, 
        setActiveTab,
        API,
        id, 
        setId,
        nameBrand, 
        setNameBrand,
        brands, 
        setBrands,
        loading, 
        setLoading,
        fetchBrands,
        saveBrand,
        deleteBrand,
        updateBrands,
        handleEdit,
    }
 }


export default useDataBrands;