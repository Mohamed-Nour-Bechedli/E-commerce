import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ _id, name, image, price, stock = 0 }) => {
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        console.log("toast:", toast);
        if (!user) {
            navigate("/login");
            return;
        }

        // Add to cart functionality
        addToCart({ _id, name, image, price, stock, quantity: 1 });

        // Display Toastify notification
        toast.success(`${name} has been added to your cart!`, {
            position: "top-right",
            autoClose: 3000,  // Duration of toast in milliseconds
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
                        <p className="text-blue-600 font-bold text-lg">${price}</p>
                        <p className={`text-sm font-medium ${stock > 0 ? "text-green-600" : "text-red-500"}`}>
                            {stock > 0 ? `${stock} in stock` : "Out of stock"}
                        </p>
                    </div>
                </div>
            </Link>

            <div className="p-4">
                <button
                    onClick={handleAddToCart}
                    className="mt-2 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-medium transition-all duration-300 w-full"
                    disabled={stock === 0}  // Disable the button if the product is out of stock
                >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
