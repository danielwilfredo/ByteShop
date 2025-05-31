import express from "express";
const router = express.Router();
import productsController from "../controllers/productsController.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Asegurarse de que exista la carpeta para las imágenes
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración mejorada de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Usar la carpeta uploads dentro de public
  },
  filename: function (req, file, cb) {
    // Crear un nombre de archivo único usando timestamp + nombre original
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  }
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  // Aceptar solo ciertos tipos de imagen
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no soportado. Solo se permiten JPEG, PNG y WEBP'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Límite de 5MB
  }
});

router
  .route("/")
  .get(productsController.getProducts) 
  .post(upload.single("image"), productsController.createProducts); 

router
  .route("/:id")
  .get(productsController.getProduct) 
  .put(upload.single("image"), productsController.updateProduct) 
  .delete(productsController.deleteProduct); 

export default router;
