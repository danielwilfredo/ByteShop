import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchProducts from "../hooks/useFetchProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useFetchProducts();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products?.length > 0) {
      const foundProduct = products.find((item) => item.id.toString() === id);
      setProduct(foundProduct);
    }
  }, [products, id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Cargando producto...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-semibold text-blue-600 mb-4">
            Precio: ${product.price}
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
