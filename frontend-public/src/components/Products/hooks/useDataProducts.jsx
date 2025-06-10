import useFetchProducts from "../../../hooks/useFetchProducts";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const useDataProducts = () => {
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
  const addToCart = (product, quantity) => {
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

  return {
    addToCart,
    filteredProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
    productsCart,
    setProductsCart,
  };
};

export default useDataProducts;
