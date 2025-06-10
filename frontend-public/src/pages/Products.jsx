import React, { useState, useEffect } from "react";
import Title from "../components/Titles";
import CardProduct from "../components/Products/CardProduct";
import { useParams } from "react-router-dom";
import useDataProducts from "../components/Products/hooks/useDataProducts";
const Products = () => {
  const {
    addToCart,
    filteredProducts,
    selectedCategory,
    categories,
    setSelectedCategory,
    productsCart,
    setProductsCart,
  } = useDataProducts();
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <Title text="Catalogo de productos" />
        <p className="text-gray-600 mb-8 text-lg">
          Tu tienda en línea de confianza para artículos electrónicos de última
          generación.
        </p>

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
          Productos en la categoría:{" "}
          {categories.find((cat) => cat._id === selectedCategory)?.name ||
            "Todas"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-600">
              No hay productos disponibles en esta categoría.
            </p>
          ) : (
            filteredProducts.map((item) => (
              <CardProduct
                product={item}
                key={item._id}
                addToCart={addToCart} // puedes ajustar cantidad
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
