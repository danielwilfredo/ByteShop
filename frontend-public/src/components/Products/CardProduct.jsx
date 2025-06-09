const CardProduct = ({ product, addToCart}) => {
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
                   Precio:<span className="text-gray-600 text-sm">${product?.price} </span> 
                </p>
                <p className="text-gray-600 text-sm mb-4">
                    Stock: {product?.stock}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                    Categoria: {product?.idCategory?.name}
                </p>
                <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                onClick={() => addToCart(product._id)}
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};

export default CardProduct;