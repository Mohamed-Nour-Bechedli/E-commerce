import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { FaTimes, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const CartSidebar = ({ isOpen, onClose }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAdd = (item) => {
        if (!user) {
            navigate("/login");
        } else {
            addToCart(item);
        }
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            // decrease quantity by 1
            addToCart({ ...item, quantity: -1 }); 
        } else {
            removeFromCart(item.id); 
        }
    };

    const handleRemove = (item) => {
        removeFromCart(item.id);
    };

    return (
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                } z-50`}
        >
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Cart</h2>
                <button onClick={onClose} className="text-gray-700 hover:text-red-500">
                    <FaTimes />
                </button>
            </div>

            <div className="p-4 space-y-4">
                {cartItems.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-gray-500">${item.price}</p>
                                <div className="flex items-center mt-2 space-x-2">
                                    <button
                                        onClick={() => handleDecrement(item)}
                                        className="bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-300"
                                    >
                                        <FaMinus />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => handleAdd(item)}
                                        className="bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-300"
                                    >
                                        <FaPlus />
                                    </button>
                                    <button
                                        onClick={() => handleRemove(item)}
                                        className="ml-2 text-red-600 hover:text-red-800"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="p-4 border-t">
                    <Link
                        to="/cart"
                        className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full"
                        onClick={onClose}
                    >
                        Go to Cart
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartSidebar;
