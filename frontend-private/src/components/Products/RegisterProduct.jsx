import React from "react";
import InputText from "../InputText";
import InputNumber from "../InputNumber";
import Button from "../Button";

/**
 * Componente para el registro y edición de productos
 * Incluye un formulario completo con soporte para carga de imágenes
 */
const RegisterProduct = ({
  // Estados del formulario
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  idCategory,
  setIdCategory,
  categories = [],
  stock,
  setStock,
  // Los props imageFile y setImageFile no se usan directamente pero
  // son necesarios para el prop handleImageChange
  imagePreview,
  idBrand,
  setIdBrand,
  brands = [],
  idModel,
  setIdModel,
  models = [],
  discount,
  setDiscount,

  // Funciones
  saveProduct,
  handleEdit,
  cancelEdit,
  handleImageChange,

  // Estados de control
  editMode,
  loading,
  error,
}) => {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}

          <InputText
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del producto"
            className="w-full px-3 py-2 border rounded"
          />

          {/* Descripción */}

          <InputText
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del producto"
            className="w-full px-3 py-2 border rounded"
          />

          {/* Precio */}
          <InputNumber
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Precio del producto"
          />

          {/* Stock */}
          <InputNumber
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Cantidad en stock"
          />

          {/* Imagen - Ahora usando input type file */}
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="image"
            >
              Imagen
            </label>
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
          <InputNumber
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Descuento (%)"
          />

          {/* Categoría */}
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="idCategory"
            >
              Categoría
            </label>
            <select
              name="idCategory"
              value={idCategory}
              onChange={(e) => setIdCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((categorie) => (
                <option key={categorie._id} value={categorie._id}>
                  {categorie.name}
                </option>
              ))}
            </select>
          </div>

          {/* Marca */}
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="idBrand"
            >
              Marca
            </label>
            <select
              name="idBrand"
              value={idBrand}
              onChange={(e) => setIdBrand(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Selecciona una marca</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* Modelo */}
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="idModel"
            >
              Modelo
            </label>
            <select
              name="idModel"
              value={idModel}
              onChange={(e) => setIdModel(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Selecciona un modelo</option>
              {models.map((model) => (
                <option key={model._id} value={model._id}>
                  {model.name}
                </option>
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
          <Button
            colorClass="primary"
            label={editMode ? "Editar" : "Registrar"}
            actionButton={editMode ? handleEdit : saveProduct}
          />

          {editMode && (
            <Button
              colorClass="warning"
              label="Cancelar"
              actionButton={cancelEdit}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterProduct;
