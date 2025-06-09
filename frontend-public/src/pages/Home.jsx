import React, { useEffect, useState } from "react";
import Title from "../components/Titles";
import useFetchProducts from "../hooks/useFetchProducts";
import CardCategorie from "../components/Categories/CardCategorie";

const Home = () => {
  const { products, categories } = useFetchProducts();

  console.log("categ desde home", categories);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <Title text="Nuestra   Bienvenido a ByteShop" />
        <p className="text-gray-600 mb-8 text-lg">
          Tu tienda en línea de confianza para artículos electrónicos de última
          generación.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Mira nuestras categorias de productos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories?.map((item) => (
            <CardCategorie category={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
