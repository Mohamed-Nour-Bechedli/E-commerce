import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaTimes, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartSidebar = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, updateQuantity, total } = useContext(CartContext);

    return (
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold">Your Cart</h2>
                <button onClick={onClose} className="text-gray-600 hover:text-red-600">
                    <FaTimes />
                </button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100%-120px)]">
                {cartItems.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded" />
                            <div className="flex-1 px-3">
                                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                <p className="text-gray-700">${item.price}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                                    >
                                        <FaMinus />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-600 hover:text-red-800 ml-2"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))
                )}
            </div>
            {cartItems.length > 0 && (
                <div className="p-4 border-t">
                    <div className="flex justify-between font-bold text-lg mb-4">
                        <span>Total:</span>
                        <span>${total}</span>
                    </div>
                    <Link
                        to="/cart"
                        className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full"
                        onClick={onClose}
                    >
                        View Cart
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartSidebar;
