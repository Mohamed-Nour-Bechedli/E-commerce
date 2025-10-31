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
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
            <Link to={`/product/${_id}`} className="block">
                <img src={image} alt={name} className="w-full h-48 object-contain p-4" />
                <div className="p-4 flex flex-col justify-between h-40">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>

                        {/* ✅ Price display logic */}
                        {salePrice ? (
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-500 line-through text-sm">${price.toFixed(2)}</span>
                                <span className="text-red-600 font-bold text-lg">${salePrice.toFixed(2)}</span>
                            </div>
                        ) : (
                            <p className="text-blue-600 font-bold text-lg">${price.toFixed(2)}</p>
                        )}

                        <p
                            className={`text-sm font-medium ${stock > 0 ? "text-green-600" : "text-red-500"
                                }`}
                        >
                            {stock > 0 ? `${stock} in stock` : "Out of stock"}
                        </p>
                    </div>
                </div>
            </Link>

            <div className="p-4">
                <button
                    onClick={handleAddToCart}
                    className="mt-2 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-medium transition-all duration-300 w-full"
                    disabled={stock === 0}
                >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
