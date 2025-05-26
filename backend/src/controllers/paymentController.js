import paypal from "@paypal/checkout-server-sdk";
import { config } from "../config.js";

// Configuración de PayPal
const clientId = config.paypal.clientId;
const clientSecret = config.paypal.clientSecret;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// Crear el objeto del controlador  
const paymentController = {};

// Función para crear un pago
paymentController.createPayment = async (req, res) => {
  const { total } = req.body; 

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: total.toFixed(2), // Usamos el total del carrito
        },
      },
    ],
    payer: {
      address: {
        country_code: "SV", // País por defecto
      },
    },
    application_context: {
      locale: "es-SV",
      shipping_preference: "NO_SHIPPING",
    },
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear el pago");
  }
};

// Función para capturar el pago
paymentController.capturePayment = async (req, res) => {
  const { orderID } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.json({ status: capture.result.status });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al capturar el pago");
  }
};

// Exportar el controlador
export default paymentController;
