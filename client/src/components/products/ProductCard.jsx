import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext"; 
import { useNavigate, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ id, name, price, image }) => {
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (!user) {
            navigate("/login"); 
        } else {
            addToCart({ id, name, price, image });
            navigate("/cart"); 
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 flex flex-col items-center">
            <Link to={`/product/${id}`}>
                <img src={image} alt={name} className="w-full h-40 object-contain mb-4" />
            </Link>
            <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>
            <p className="text-gray-700 mb-4">${price}</p>
            <button
                onClick={handleAddToCart}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
            >
                <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
