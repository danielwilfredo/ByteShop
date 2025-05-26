import React from "react";
import PayPalButton from "../components/PaypalButton";

const Checkout = () => {
  /*
    CARRITO AQUI
  */

  //Llenar con datos del carrito
  const total = 33;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Total: ${total.toFixed(2)}</h2>
      <PayPalButton total={total} />
    </div>
  );
};

export default Checkout;
