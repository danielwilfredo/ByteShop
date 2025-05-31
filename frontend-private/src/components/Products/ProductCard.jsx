import React from "react";
import Button from "../Button";

const ProductCard = ({ product, deleteCategory, updateCategories }) => {

return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4">
            {/* Imagen del producto con imagen por defecto si no existe */}
            <img
                src={product.image ? product.image : 'https://placehold.co/400x300?text=Sin+Imagen'}
                alt={product.name || 'Producto'}
                className="w-full h-48 object-cover mb-4 rounded"
                onError={(e) => {
                    e.target.onerror = null; // Prevenir bucle infinito
                    e.target.src = 'https://placehold.co/400x300?text=Error+Imagen';
                    console.error("Error cargando imagen:", product.image);
                }}
                crossOrigin="anonymous" // Para evitar problemas de CORS con Cloudinary
            />
            {/* Debug info - mostrar la URL de la imagen para depuración */}
            <div className="text-xs text-gray-400 mb-2">
                Image URL: {product.image || 'No hay URL'}
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
                {product.name}
            </h2>
            <p className="text-gray-500 mb-2">{product.description}</p>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Precio: </span>
                <span>${product.price}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Stock: </span>
                <span>{product.stock}</span>
            </div>
            {product.discount > 0 && (
                <div className="mb-2">
                    <span className="font-semibold text-gray-700">Descuento: </span>
                    <span>{product.discount}%</span>
                </div>
            )}
            {/* Usamos idBrand o brand dependiendo de cómo venga del backend */}
            {(product.idBrand || product.brand) && (
                <div className="mb-2">
                    <span className="font-semibold text-gray-700">Marca: </span>
                    <span>{(product.idBrand && product.idBrand.name) || (product.brand && product.brand.name) || 'No disponible'}</span>
                </div>
            )}
            {/* Usamos idModel o model dependiendo de cómo venga del backend */}
            {(product.idModel || product.model) && (
                <div className="mb-2">
                    <span className="font-semibold text-gray-700">Modelo: </span>
                    <span>{(product.idModel && product.idModel.name) || (product.model && product.model.name) || 'No disponible'}</span>
                </div>
            )}
            {/* Usamos idCategory o category dependiendo de cómo venga del backend */}
            {(product.idCategory || product.category) && (
                <div className="mb-2">
                    <span className="font-semibold text-gray-700">Categoría: </span>
                    <span>{(product.idCategory && product.idCategory.name) || (product.category && product.category.name) || 'No disponible'}</span>
                </div>
            )}
            <div className="flex gap-2 mt-4">
                <Button
                    label={"Eliminar"}
                    actionButton={() => deleteCategory(product._id)}
                    colorClass={"danger"}
                />
                <Button
                    label={"Editar Información"}
                    actionButton={() => updateCategories(product)}
                    colorClass={"warning"}
                />
            </div>
        </div>
    </div>
);
};

export default ProductCard;