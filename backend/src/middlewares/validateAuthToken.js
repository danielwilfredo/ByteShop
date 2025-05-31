// middleware/auth.js
import jwt from "jsonwebtoken";
import { config } from "../config.js";

/**
 * Middleware para validar el token de autenticación
 * Soporta tokens tanto en el header Authorization como en cookies
 * @param {Array} allowedUserTypes - Tipos de usuario permitidos (opcional)
 */
export const validateAuthToken = (allowedUserTypes = []) => {
  return (req, res, next) => {
    try {
      // Intentar obtener el token del header de autorización
      const authHeader = req.headers['authorization'];
      let token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
      
      // Si no hay token en el header, intentar obtenerlo de las cookies
      if (!token && req.cookies && req.cookies.authToken) {
        token = req.cookies.authToken;
      }

      // Si no hay token ni en headers ni en cookies
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = decoded;

      // Verificar si el tipo de usuario tiene acceso (opcional)
      if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(decoded.userType)) {
        return res.status(403).json({ message: "Access denied: insufficient permissions" });
      }

      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Token expired, please log in again" });
      }
      if (err.name === "JsonWebTokenError") {
        return res.status(403).json({ message: "Invalid token" });
      }

      return res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };
};
