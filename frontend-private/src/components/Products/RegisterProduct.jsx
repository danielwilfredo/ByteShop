import React from 'react';

/**
 * Componente para el registro y edición de productos
 * Incluye un formulario completo con soporte para carga de imágenes
 */
const RegisterProduct = ({
  // Estados del formulario
  name, setName,
  description, setDescription,
  price, setPrice,
  idCategory, setIdCategory,
  categories = [],
  stock, setStock,
  // Los props imageFile y setImageFile no se usan directamente pero
  // son necesarios para el prop handleImageChange
  imagePreview,
  idBrand, setIdBrand,
  brands = [],
  idModel, setIdModel,
  models = [],
  discount, setDiscount,
  
  // Funciones
  saveProduct,
  handleEdit,
  cancelEdit,
  handleImageChange,
  
  // Estados de control
  editMode,
  loading,
  error
}) => {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Descripción</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="price">Precio</label>
            <input
              type="number"
              name="price"
              value={price}
              min={0}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="stock">Stock</label>
            <input
              type="number"
              name="stock"
              value={stock}
              min={0}
              onChange={e => setStock(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Imagen - Ahora usando input type file */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="image">Imagen</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded"
            />
            {/* Mostrar vista previa de la imagen si existe */}
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview} 
                  alt="Vista previa" 
                  className="w-full max-h-40 object-contain rounded" 
                />
              </div>
            )}
          </div>

          {/* Descuento */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="discount">Descuento (%)</label>
            <input
              type="number"
              name="discount"
              value={discount}
              min={0}
              max={100}
              onChange={e => setDiscount(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="idCategory">Categoría</label>
            <select
              name="idCategory"
              value={idCategory}
              onChange={e => setIdCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Marca */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="idBrand">Marca</label>
            <select
              name="idBrand"
              value={idBrand}
              onChange={e => setIdBrand(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Selecciona una marca</option>
              {brands.map(brand => (
                <option key={brand._id} value={brand._id}>{brand.name}</option>
              ))}
            </select>
          </div>

          {/* Modelo */}
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="idModel">Modelo</label>
            <select
              name="idModel"
              value={idModel}
              onChange={e => setIdModel(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Selecciona un modelo</option>
              {models.map(model => (
                <option key={model._id} value={model._id}>{model.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Mensajes de error */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {/* Botones */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            onClick={editMode ? handleEdit : saveProduct}
            disabled={loading}
            className={`flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Procesando...' : (editMode ? "Actualizar" : "Guardar")}
          </button>
          
          {editMode && (
            <button
              type="button"
              onClick={cancelEdit}
              disabled={loading}
              className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterProduct;
