import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ _id, name, image, price, salePrice, stock = 0 }) => {
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (!user) {
            navigate("/login");
            return;
        }

        addToCart({ _id, name, image, price: salePrice || price, stock, quantity: 1 });

        toast.success(`${name} has been added to your cart!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 relative group cursor-pointer">
            <Link to={`/product/${_id}`} className="block relative">
                {/* Product Image */}
                <div className="w-full h-64 flex items-center justify-center bg-gray-50 overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110 p-4"
                    />
                </div>

                {/* Bottom info overlay only with blur */}
                <div className="absolute bottom-0 w-full bg-black/30 backdrop-blur-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
                    <h3 className="text-white font-semibold text-lg mb-1">{name}</h3>
                    <div className="flex items-center justify-between">
                        {salePrice ? (
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-200 line-through text-sm">${price.toFixed(2)}</span>
                                <span className="text-red-400 font-bold text-lg">${salePrice.toFixed(2)}</span>
                            </div>
                        ) : (
                            <p className="text-blue-300 font-bold text-lg">${price.toFixed(2)}</p>
                        )}
                        <span className={`text-sm font-medium ${stock > 0 ? "text-green-300" : "text-red-300"}`}>
                            {stock > 0 ? `${stock} in stock` : "Out of stock"}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Add to Cart Button */}
            <div className="p-4">
                <button
                    onClick={handleAddToCart}
                    className="mt-2 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-medium transition-all duration-300 w-full shadow-md"
                    disabled={stock === 0}
                >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
