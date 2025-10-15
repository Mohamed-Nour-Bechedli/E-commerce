import { useContext, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../common/Modal";

const ProductCard = ({ id, name, image, price, stock }) => {
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddToCart = () => {
        if (!user) {
            navigate("/login");
            return;
        }

        // Add product to cart for logged-in users
        addToCart({ id, name, image, price, stock, quantity: 1 });

        setModalOpen(true);
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
            <img src={image} alt={name} className="w-full h-48 object-contain p-4" />
            <div className="p-4 flex flex-col justify-between h-40">
                <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>
                    <p className="text-blue-600 font-bold text-lg">${price}</p>
                    <p className={`text-sm font-medium ${stock > 0 ? "text-green-600" : "text-red-500"}`}>
                        {stock > 0 ? `${stock} in stock` : "Out of stock"}
                    </p>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="mt-2 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-medium transition-all duration-300"
                >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
            </div>

            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Product Added!">
                <p>The product has been added to your cart successfully.</p>
            </Modal>
        </div>
    );
};

export default ProductCard;
