/*
 * Este archivo define los controladores para gestionar las operaciones CRUD
 * (Crear, Leer, Actualizar y Eliminar) de productos en la base de datos.
 *
 * Se utilizan los métodos de Mongoose para interactuar con la base de datos MongoDB.
 * Las operaciones están asociadas a endpoints o rutas
 *
 * TODO: Validar que el id de la categoría exista antes de guardar un producto.
 */

const productsController = {};
import productsModel from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

// Configuración directa de Cloudinary en el controlador para evitar problemas con variables de entorno
cloudinary.config({
  cloud_name: "dcuhlfkgy",
  api_key: "262183883898841",
  api_secret: "z493kA2WXxgG5f6mKyTZkOhCKJc",
  secure: true
});

// Log para confirmar la configuración
console.log('Cloudinary configurado directamente en el controlador de productos');

// SELECT ALL PRODUCTS
productsController.getProducts = async (req, res) => {
  const products = await productsModel
    .find()
    .populate("idCategory")
    .populate("idBrand")
    .populate("idModel");
  res.json(products);
};

// SELECT PRODUCT BY ID
productsController.getProduct = async (req, res) => {
  const product = await productsModel
    .findById(req.params.id)
    .populate("idCategory")
    .populate("idBrand")
    .populate("idModel");
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.json(product);
};

// CREATE PRODUCT
productsController.createProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      idCategory,
      stock,
      idBrand,
      idModel,
      discount,
    } = req.body;

    // Validación de campos obligatorios
    if (!name || !description || !price || !idCategory || !idBrand || !idModel) {
      return res.status(400).json({ 
        message: "Todos los campos marcados son requeridos",
        required: ["name", "description", "price", "idCategory", "idBrand", "idModel"],
        received: { name, description, price, idCategory, idBrand, idModel }
      });
    }

    let imageURL = "";
    let imagePublicId = ""

    // Subir imagen a cloudinary si existe
    if (req.file) {
      try {
        // Verificamos que el archivo exista y tenga una ruta válida
        if (!req.file.path) {
          console.error("Error: El archivo no tiene una ruta válida", req.file);
          // En lugar de devolver un error, continuamos con la creación sin imagen
          console.warn("Continuando sin imagen debido a un problema con el archivo");
        } else {
          console.log("Detalles del archivo:", {
            path: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size,
            filename: req.file.filename
          });
          
          // Intentar subir a Cloudinary
          try {
            console.log("Subiendo imagen a Cloudinary:", req.file.path);
            const result = await cloudinary.uploader.upload(req.file.path, {
              folder: "byteshop",
              resource_type: "auto", // Detectar automáticamente el tipo de recurso
              allowed_formats: ["jpg", "png", "jpeg", "webp"],
              transformation: [{ width: 800, height: 600, crop: "limit" }],
              quality: "auto:good",
              fetch_format: "auto"
            });
            
            // Verificar que el resultado tenga los campos esperados
            if (result && result.secure_url) {
              imageURL = result.secure_url;
              imagePublicId = result.public_id;
              
              console.log("Imagen subida correctamente a Cloudinary:", {
                url: imageURL,
                publicId: imagePublicId,
                format: result.format,
                resource_type: result.resource_type
              });
            } else {
              console.error("Error: Cloudinary no devolvió una URL segura", result);
              // Continuamos con la creación sin imagen
            }
          } catch (cloudinaryError) {
            console.error("Error al subir imagen a Cloudinary:", cloudinaryError);
            // En lugar de devolver un error, continuamos con la creación sin imagen
            console.warn("Continuando sin imagen debido a un error de Cloudinary");
          }
        }
      } catch (fileError) {
        console.error("Error general al procesar el archivo:", fileError);
        // Continuamos con la creación sin imagen
        console.warn("Continuando sin imagen debido a un error general");
      }
    } else {
      console.log("No se recibió ningún archivo de imagen");
    }

    // Crear el objeto del producto
    const newProduct = new productsModel({
      name,
      description,
      price,
      idCategory,
      stock: stock || 0,
      image: imageURL,
      imagePublicId: imagePublicId, 
      idBrand,
      idModel,
      discount: discount || 0,
    });

    // Guardar en la base de datos
    const savedProduct = await newProduct.save();
    console.log("Producto guardado correctamente:", savedProduct._id);

    // Responder con éxito
    return res.status(201).json({ 
      message: "Producto creado con éxito",
      product: savedProduct
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    
    // Manejo de errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      
      // Extraer los mensajes de error de validación
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      
      return res.status(400).json({
        message: "Error de validación",
        errors: validationErrors
      });
    }
    
    // Otros errores
    return res.status(500).json({
      message: "Error al crear el producto",
      error: error.message
    });
  }
};

productsController.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await productsModel.findById(id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    // Si hay nueva imagen, subirla y borrar la anterior
    if (req.file) {
      // Borrar imagen anterior si existe
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });

      updates.image = result.secure_url;
      updates.imagePublicId = result.public_id;
    }

    await productsModel.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ message: "Producto actualizado con éxito" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error actualizando el producto" });
  }
};
productsController.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productsModel.findById(id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    // Eliminar imagen de Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await productsModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Producto eliminado con éxito" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error eliminando el producto" });
  }
};


export default productsController;
