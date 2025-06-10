import React, { useContext, useEffect, useState } from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const CartProducts = () => {
  const { products } = useFetchProducts();
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext); // Obtener el usuario autenticado
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleRemove = (idProduct) => {
    const newCart = cart.filter((item) => item.idProduct !== idProduct);
    updateCart(newCart);
  };

  const handleQuantityChange = (idProduct, delta) => {
    const newCart = cart.map((item) => {
      if (item.idProduct === idProduct) {
        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) return item;
        const productInfo = products.find((p) => p._id === idProduct);
        return {
          ...item,
          quantity: newQuantity,
          subtotal: productInfo.price * newQuantity,
        };
      }
      return item;
    });
    updateCart(newCart);
  };

  const cartWithDetails = cart.map((cartItem) => {
    const productInfo = products.find((p) => p._id === cartItem.idProduct);
    return {
      ...cartItem,
      name: productInfo?.name || "Producto no encontrado",
      price: productInfo?.price || 0,
    };
  });

  const total = cartWithDetails.reduce((acc, item) => acc + item.subtotal, 0);

  // Función para enviar el pedido a la API
  const sendOrder = async () => {
    setLoading(true);
    setMessage(null);
    //const userId = localStorage.getItem("userId") || "default-user-id"; // Simulación de ID de usuario
    const order = {
      idClient: user, // Aquí deberías poner el id real (auth)
      products: cart,
      total,
      status: "Pending",
    };

    console.log("Enviando pedido:", order);

    try {
      const response = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //credentials: "include", // Para enviar cookies si es necesario
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear pedido");
      }

      setMessage("Pedido creado con éxito 🎉");
      toast.success("Pedido creado con éxito");
      setCart([]);
      localStorage.removeItem("cart");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return <p className="p-6 text-center">Tu carrito está vacío.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Vista previa del carrito</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Producto</th>
            <th className="text-right py-2">Precio</th>
            <th className="text-center py-2">Cantidad</th>
            <th className="text-right py-2">Subtotal</th>
            <th className="text-center py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cartWithDetails.map((item) => (
            <tr key={item.idProduct} className="border-b">
              <td className="py-2">{item.name}</td>
              <td className="text-right py-2">${item.price.toFixed(2)}</td>
              <td className="text-center py-2">
                <button
                  onClick={() => handleQuantityChange(item.idProduct, -1)}
                  className="px-2 py-1 border rounded-l"
                  aria-label={`Disminuir cantidad de ${item.name}`}
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.idProduct, 1)}
                  className="px-2 py-1 border rounded-r"
                  aria-label={`Aumentar cantidad de ${item.name}`}
                >
                  +
                </button>
              </td>
              <td className="text-right py-2">${item.subtotal.toFixed(2)}</td>
              <td className="text-center py-2">
                <button
                  onClick={() => handleRemove(item.idProduct)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                  aria-label={`Eliminar ${item.name} del carrito`}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-right font-bold py-2">
              Total:
            </td>
            <td className="text-right font-bold py-2">${total.toFixed(2)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      {/* Mensaje de estado */}
      {message && (
        <p
          className={`mt-4 font-semibold ${
            message.startsWith("Error") ? "text-red-600" : "text-green-600"
          }`}
          role="alert"
        >
          {message}
        </p>
      )}

      {/* Botón para enviar pedido */}
      <button
        onClick={sendOrder}
        disabled={loading}
        className={`mt-6 px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50`}
      >
        {loading ? "Enviando..." : "Enviar Pedido"}
      </button>
    </div>
  );
};

export default CartProducts;
