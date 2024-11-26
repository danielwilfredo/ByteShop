/*
* En este archivo realizamos la conexión a una base de datos en MongoDB
* Es importante recordar que no es necesario crear la base de datos desde MongoDBCompass, ya que si no existe, se crea automaticamente
* Usamos variables de entorno con dotenv y comprobamos si la conexión está open, disconnected o error
*
* TODO: cuando la conexión esté desconectada o genere un error, hacer una función para reconectarme automaticamente a la base de datos
*/

import mongoose from "mongoose";
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Configurar la URI o dirección de la base de datos
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/byteShop";

// Conexión a la base de datos en MongoDB
mongoose.connect(URI);

// En una constante guardo la conexión, que puede tener los valores (open, disconnected o error)
const connection = mongoose.connection;

// Evento para cuando se conecte la base de datos
connection.once("open", () => {
  console.log("Database is connected");
});

// Evento para detectar si se desconecta la base de datos
connection.on("disconnected", () => {
  console.log("Database is disconnected");
});

// Evento para detectar errores en la conexión
connection.on("error", (err) => {
  console.error("Database connection error:", err);
});
