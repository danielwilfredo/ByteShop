import { useState } from "react";
import toast from "react-hot-toast";

//addToCart recibe el id del producto, cantidad y el precio
const CardProduct = ({ product, addToCart }) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const subTotal = product.price * quantity;

    addToCart(product._id, quantity, subTotal);
    toast.success(
      `Producto ${product.name} agregado al carrito con éxito. Cantidad: ${quantity}`
    );
  };

  return (
    <div
      key={product?._id}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
    >
      <img
        src={product?.image}
        alt={product?.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-700 mb-2">
          {product?.name}
        </h3>
        <p className="text-gray-600 text-sm">{product?.description}</p>
      </div>
      <div className="p-4 border-t">
        <p className="text-lg font-semibold text-gray-800">
          Precio:
          <span className="text-gray-600 text-sm">${product?.price} </span>
        </p>
        <p className="text-gray-600 text-sm mb-4">Stock: {product?.stock}</p>
        <p className="text-gray-600 text-sm mb-4">
          Categoria: {product?.idCategory?.name}
        </p>
        <label className="block text-gray-700 mb-2">Cantidad: {quantity}</label>
        <input
          type="number"
          min="1"
          max={product?.stock}
          defaultValue="1"
          value={quantity}
          className="border rounded px-3 py-1 w-full mb-2"
          onChange={(e) => {
            const quantity = parseInt(e.target.value, 10);
            if (quantity < 1 || quantity > product?.stock) {
              e.target.value = 1; // Reset to 1 if out of range
              toast.error(
                `Cantidad insuficiente, solo hay ${product?.stock} disponibles.`
              );
            } else {
              setQuantity(quantity);
            }
          }}
        />
        <button
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
