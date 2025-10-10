import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const ProductCard = ({ id, name, price, image, stock }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            {/* Image and name now wrapped with Link */}
            <Link to={`/product/${id}`} className="flex-1">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>
                    <p className="text-blue-600 font-bold text-lg">${price}</p>
                    <p className={`text-sm ${stock > 0 ? "text-green-600" : "text-red-500"}`}>
                        {stock > 0 ? `${stock} in stock` : "Out of stock"}
                    </p>
                </div>
            </Link>

            {/* Add to Cart button */}
            <button
                onClick={() => addToCart({ id, name, price, image, quantity: 1 })}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 m-4 rounded-full flex items-center justify-center transition-all duration-300"
            >
                <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
