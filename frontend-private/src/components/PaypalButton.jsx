import React, { useEffect, useRef } from "react";

// Esperamos que el total del carrito llegue como prop
const PayPalButton = ({ total }) => {
  const paypalRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AQiadhJ98JxqEzWXPdNq2lbJdBBMQ6ZHI2pqgjU_NNWsEu65Y8AbzESGQMh1hpPr3-xydNesdm0lP6_K&currency=USD";
    script.addEventListener("load", () => {
      if (window.paypal) {
        window.paypal
          .Buttons({
            style: {
              color: "silver",
              shape: "pill",
              label: "pay",
              tagline: false,
            },
            // Crear orden desde el backend enviando el total
            createOrder: async () => {
              const response = await fetch(
                "http://localhost:4000/api/payment/create-payment",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ total }), // enviamos el total del carrito
                }
              );
              const orderData = await response.json();
              return orderData.id;
            },
            // Capturar el pago desde el backend
            onApprove: async (data) => {
              const response = await fetch(
                "http://localhost:4000/api/payment/capture-payment",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ orderID: data.orderID }),
                }
              );
              const captureData = await response.json();
              alert("Pago realizado con éxito");
              console.log("Detalles del pago:", captureData);
            },
            onError: (err) => {
              console.error("Error en el pago:", err);
              alert("Hubo un error al procesar el pago");
            },
          })
          .render(paypalRef.current);
      }
    });

    document.body.appendChild(script);
  }, [total]); // 👈 importante para que se actualice si cambia el total

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;
