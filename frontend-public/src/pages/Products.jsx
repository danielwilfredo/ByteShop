import React, { useState } from "react";
import Title from "../components/Titles";
import useFetchProducts from "../hooks/useFetchProducts";
import CardProduct from "../components/Products/CardProduct";

const Products = () => {
  const { products, categories } = useFetchProducts();
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  // Filtrar productos según la categoría seleccionada
  const filteredProducts =
    selectedCategory === "Todas"
      ? products
      : products?.filter((item) => item.idCategory?.name === selectedCategory);

      console.log("productos filtrados", filteredProducts);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <Title text="Catalogo de productos" />
        <p className="text-gray-600 mb-8 text-lg">
          Tu tienda en línea de confianza para artículos electrónicos de última generación.
        </p>

        {/* Filtro de categorías */}
        <div className="mb-6">
          <label className="mr-2 font-semibold text-gray-700">
            Filtrar por categoría:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="Todas">Todas</option>
            {categories.map((categorie) => (
              <option key={categorie._id} value={categorie._id}>
                {categorie.name}
              </option>
            ))}
          </select>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts?.map((item) => (
            <CardProduct key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
