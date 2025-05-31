import React, { useState } from "react";
import ListProducts from "../components/Products/ListProducts";
import RegisterProduct from "../components/Products/RegisterProduct";
import useDataProducts from "../components/Products/hooks/useDataProducts";
import toast, {Toaster} from 'react-hot-toast';

/**
 * Página principal para la gestión de productos
 * Implementa todas las operaciones CRUD utilizando el hook personalizado useDataProducts
 */
const Products = () => {
  // Estado para el manejo de las pestañas
  const [activeTab, setActiveTab] = useState("list");
  
  // Usamos nuestro hook personalizado que maneja toda la lógica de productos
  const {
    // Estados del formulario
    name, setName,
    description, setDescription,
    price, setPrice,
    idCategory, setIdCategory,
    stock, setStock,
    imageFile, setImageFile,
    imagePreview, setImagePreview,
    idBrand, setIdBrand,
    idModel, setIdModel,
    discount, setDiscount,
    
    // Estados de listas
    products,
    categories,
    brands,
    models,
    
    // Estados de control
    loading,
    error,
    editMode,
    
    // Funciones
    saveProduct,
    deleteProduct,
    prepareProductForEdit,
    handleEdit,
    cancelEdit,
    handleImageChange
    // clearForm - No lo necesitamos directamente en esta página
  } = useDataProducts();
  
  // Función para editar un producto
  const startEditProduct = (product) => {
    prepareProductForEdit(product);
    setActiveTab("form");
  };
  
  // Función para manejar la eliminación con confirmación de toast
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      toast.success('Producto eliminado correctamente');
    } catch (err) {
      toast.error('Error al eliminar el producto: ' + err.message);
    }
  };
  
  // Función para manejar el guardado con notificaciones
  const handleSaveProduct = async (e) => {
    try {
      await saveProduct(e);
      toast.success('Producto guardado correctamente');
      setActiveTab("list"); // Cambiar a la pestaña de lista después de guardar
    } catch (err) {
      toast.error('Error al guardar el producto: ' + err.message);
    }
  };
  
  // Función para manejar la edición con notificaciones
  const handleEditProduct = async (e) => {
    try {
      await handleEdit(e);
      toast.success('Producto actualizado correctamente');
      setActiveTab("list"); // Cambiar a la pestaña de lista después de editar
    } catch (err) {
      toast.error('Error al actualizar el producto: ' + err.message);
    }
  };
  
  // Función para cancelar la edición
  const handleCancelEdit = () => {
    cancelEdit();
    // Opcionalmente, puedes cambiar a la pestaña de lista
    setActiveTab("list");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Componente para mostrar notificaciones toast */}
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Gestión de Productos</h1>
        
        {/* Pestañas de navegación */}
        <div className="mb-8">
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`px-6 py-3 text-lg ${activeTab === "list" 
                ? "text-blue-600 border-b-2 border-blue-500 font-medium" 
                : "text-gray-600 hover:text-gray-800"} 
                focus:outline-none transition-colors duration-200`}
              onClick={() => setActiveTab("list")}
            >
              Lista de Productos
            </button>
            <button
              className={`px-6 py-3 text-lg ${activeTab === "form" 
                ? "text-blue-600 border-b-2 border-blue-500 font-medium" 
                : "text-gray-600 hover:text-gray-800"} 
                focus:outline-none transition-colors duration-200`}
              onClick={() => {
                setActiveTab("form");
                // Si estamos en modo edición y cambiamos manualmente a la pestaña de formulario,
                // aseguramos que se limpie el formulario
                if (editMode) {
                  cancelEdit();
                }
              }}
            >
              {editMode ? "Editar Producto" : "Nuevo Producto"}
            </button>
          </div>
          
          {/* Contenido según la pestaña activa */}
          <div>
            {activeTab === "list" && (
              <div>
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Cargando productos...</p>
                  </div>
                ) : (
                  <ListProducts
                    products={products}
                    deleteCategory={handleDeleteProduct}
                    updateCategories={startEditProduct}
                  />
                )}
              </div>
            )}
            
            {activeTab === "form" && (
              <div>
                <RegisterProduct
                  // Pasar todos los estados y funciones necesarios
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                  price={price}
                  setPrice={setPrice}
                  idCategory={idCategory}
                  setIdCategory={setIdCategory}
                  categories={categories}
                  stock={stock}
                  setStock={setStock}
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  idBrand={idBrand}
                  setIdBrand={setIdBrand}
                  brands={brands}
                  idModel={idModel}
                  setIdModel={setIdModel}
                  models={models}
                  discount={discount}
                  setDiscount={setDiscount}
                  
                  // Funciones para manejar acciones
                  saveProduct={handleSaveProduct}
                  handleEdit={handleEditProduct}
                  cancelEdit={handleCancelEdit}
                  handleImageChange={handleImageChange}
                  
                  // Estados de control
                  editMode={editMode}
                  loading={loading}
                  error={error}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
