// este me servia por otros errores que tenia steven



// Imports
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { config } from './config.js'

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Configurar la URI o dirección de la base de datos
const URI = config.db.URI;

// Función para conectar a MongoDB con reintentos automáticos
const connectWithRetry = () => {
  console.log('Intentando conectar a MongoDB...');
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,  // Timeout para selección de servidor
    socketTimeoutMS: 45000,          // Tiempo de espera para operaciones
    family: 4                        // Usar IPv4, evita problemas en algunos entornos
  }).catch(err => {
    console.error('Error en la conexión a MongoDB:', err);
    console.log('Reintentando en 5 segundos...');
    setTimeout(connectWithRetry, 5000); // Reintentar después de 5 segundos
  });
};

// Iniciar conexión a la base de datos
connectWithRetry();

// En una constante guardo la conexión, que puede tener los valores (open, disconnected o error)
const connection = mongoose.connection;

// Evento para cuando se conecte la base de datos
connection.once("open", () => {
  console.log("Database is connected");
});

// Evento para detectar si se desconecta la base de datos
connection.on("disconnected", () => {
  console.log("Database is disconnected");
  connectWithRetry(); // Intentar reconectar automáticamente
});

// Evento para detectar errores en la conexión
connection.on("error", (err) => {
  console.error("Database connection error:", err);
});

// Exportar mongoose para que pueda ser utilizado en otros archivos
export default mongoose;

