/*
 * Este archivo configura la aplicación principal de Express.
 * Define los ajustes básicos, los middlewares y las rutas que utilizará la aplicación.
 *
 * TODO: Agregar ajustes adicionales
 */

import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products.js";
import clientsRoutes from "./routes/clients.js";
import categoriesRoutes from "./routes/categories.js";
import brandsRoutes from "./routes/brands.js";
import modelsRoutes from "./routes/models.js";
import employeesRoutes from "./routes/employees.js";
import ordersRoutes from "./routes/orders.js";
import purchasesRoutes from "./routes/purchases.js";
import loginRoutes from "./routes/login.js";
import registerClientRoutes from "./routes/registerClient.js";
import registerEmployeesRoutes from "./routes/registerEmployee.js";
import logoutRoutes from "./routes/logout.js";
import cookieParser from "cookie-parser";
import passwordRecoveryRoutes from "./routes/passwordRecovery.js";
import paymentRoutes from "./routes/payment.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Settings
// TODO: aqui van algunos ajustes

// Middlewares
app.use(
  cors({
    origin: "*", // Dominio del cliente
    credentials: true, // Permitir envío de cookies y credenciales
  })
);
app.use(express.json());
app.use(cookieParser());
import { validateAuthToken } from "./middlewares/validateAuthToken.js";

// Routescon validación de inicio de sesión
/*
app.use("/api/products", validateAuthToken(), productsRoutes);
app.use("/api/clients", validateAuthToken(), clientsRoutes);
app.use("/api/categories", validateAuthToken(), categoriesRoutes);
app.use("/api/brands", validateAuthToken(), brandsRoutes);
app.use("/api/models", validateAuthToken(), modelsRoutes);
app.use("/api/employees", validateAuthToken(["employee"]), employeesRoutes);
app.use("/api/paymentMethods", validateAuthToken(), paymentMethodsRoutes);
app.use("/api/orders", validateAuthToken(), ordersRoutes);
app.use("/api/purchases", validateAuthToken(), purchasesRoutes);
app.use("/api/logout", validateAuthToken(), logoutRoutes);
app.use("/api/payment", validateAuthToken(), payment);
*/
app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/models", modelsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/purchases", purchasesRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/payment", paymentRoutes);

// Rutas publicas que no necesitan haber iniciado sesión
app.use("/api/login", loginRoutes);
app.use("/api/registerClients", registerClientRoutes);
app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/passwordRecovery", passwordRecoveryRoutes);

//PD: se agrega validateAuthToken(["client"]), (["employee"]) o (["admin"]) sin parametros antes de la ruta para que el endpoint necesite un token

export default app;
