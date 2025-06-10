import React, { useEffect, useState } from "react";

const ApiOrders = "http://localhost:4000/api/orders";

const Orders = () => {
  console.log("Renderizando componente Orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    console.log("Iniciando la carga de órdenes desde la API...");
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(ApiOrders);
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`Error al cargar órdenes: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Órdenes recibidas:", data);
      setOrders(data);
    } catch (err) {
      console.error("Error en fetchOrders:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Cargando órdenes desde la API...");

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg">Cargando órdenes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-600 font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg">No hay órdenes disponibles.</p>
      </div>
    );
  }

  // Función para formatear fecha legible
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Listado de Órdenes</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded p-4 mb-6 shadow-sm bg-gray-50"
        >
          <h2 className="text-xl font-semibold mb-2">Orden ID: {order._id}</h2>
          <p>
            <strong>Cliente:</strong> {order.idClient?.name} (
            {order.idClient?.email})
          </p>
          <p>
            <strong>Estado:</strong> {order.status}
          </p>
          <p>
            <strong>Fecha:</strong> {formatDate(order.createdAt)}
          </p>
          <p className="font-semibold mt-4 mb-2">Productos:</p>
          <ul className="list-disc ml-6">
            {order.products.map((prod) => (
              <li key={prod._id} className="mb-1">
                {prod.idProduct?.name} — Cantidad: {prod.quantity} — Subtotal: $
                {prod.subtotal.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="font-bold mt-4 text-right">
            Total: ${order.total.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
