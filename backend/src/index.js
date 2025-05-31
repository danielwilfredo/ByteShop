/*
 * Este archivo es el punto de entrada principal para la aplicación.
 * Configura y ejecuta el servidor de Express, escuchando en el puerto especificado.
 *
 * Importa la configuración de la aplicación desde 'app.js' y establece la conexión a la base de datos desde 'database.js'.
 *
 */

import app from "./app.js"; // Importa la configuración principal de la aplicación
import "./database.js"; // Importa mongoose con la conexión a la base de datos
import dotenv from "dotenv";

dotenv.config();

import { config } from "./config.js";

// Función principal para iniciar el servidor
async function main() {
  const port = config.server.port; // Define el puerto en el que se ejecutará el servidor, puede ser uno secreto (si existe) o el 4000
  app.listen(port); // Inicia el servidor y lo pone a escuchar en el puerto especificado
  console.log("Server on port", port); // Imprime en consola el puerto donde está corriendo el servidor (opcional)
}

// Ejecuta la función principal
main();
