import React, { useEffect, useState } from "react";
import Title from "../components/Titles";
import useFetchProducts from "../hooks/useFetchProducts";

const Home = () => {

    const {products}=useFetchProducts();

    console.log("Productos desde home", products)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
<Title
                text="Nuestra   Bienvenido a ByteShop"
                />
        <p className="text-gray-600 mb-8 text-lg">
          Tu tienda en línea de confianza para artículos electrónicos de última
          generación.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products?.map((item) => (
            <div
              key={item?.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <img
                src={item?.image}
                alt={item?.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  {item?.name}
                </h3>
                <p className="text-gray-600 text-sm">{item?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
