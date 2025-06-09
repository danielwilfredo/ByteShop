import React, { useState, useEffect } from "react";
import Title from "../components/Titles";
import useFetchProducts from "../hooks/useFetchProducts";
import CardProduct from "../components/Products/CardProduct";
import { useParams } from "react-router-dom";

const Products = () => {
  const { products, categories } = useFetchProducts();
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const { id } = useParams();

  // Cargar carrito del localStorage al iniciar
  const [productsCart, setProductsCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (id) {
      setSelectedCategory(id);
    } else {
      setSelectedCategory("Todas");
    }
  }, [id]);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(productsCart));
  }, [productsCart]);

  const filteredProducts =
    selectedCategory === "Todas"
      ? products
      : products?.filter((item) => item.idCategory?._id === selectedCategory);

  // Función para agregar producto al carrito
  const addToCart = (product, quantity = 1) => {
    setProductsCart((prevCart) => {
      // Buscar si producto ya está en carrito
      const existingProductIndex = prevCart.findIndex(
        (p) => p.idProduct === product._id
      );

      if (existingProductIndex !== -1) {
        // Actualizar cantidad y subtotal
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        updatedCart[existingProductIndex].subtotal =
          updatedCart[existingProductIndex].quantity * product.price;
        return updatedCart;
      } else {
        // Agregar nuevo producto
        return [
          ...prevCart,
          {
            idProduct: product._id,
            quantity: quantity,
            subtotal: product.price * quantity,
          },
        ];
      }
    });
    console.log("Carrito actualizado:", productsCart);
  };

  const realAddToCart = async () => {
    const order = {
      idClient: "id-del-cliente", // obtener de auth o input
      products: productsCart,
      total: productsCart.reduce((acc, item) => acc + item.subtotal, 0),
      status: "Pending",
    };

    try {
      const response = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear pedido");
      }

      console.log("Pedido creado:", data);

      // Limpiar carrito
      setProductsCart([]);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error al crear pedido:", error);
    }
  };

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
                addToCart={() => addToCart(item, 1)} // puedes ajustar cantidad
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
