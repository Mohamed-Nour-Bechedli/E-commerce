import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaTimes, FaTrash } from "react-icons/fa";

const CartSidebar = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, total } = useContext(CartContext);

    return (
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"
                } z-50`}
        >
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button onClick={onClose} className="text-gray-700 hover:text-red-500">
                    <FaTimes />
                </button>
            </div>

            <div className="p-4 flex flex-col h-full justify-between">
                <div className="space-y-4 overflow-y-auto flex-1">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500">Cart is empty</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-gray-500">${item.price} x {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="mt-4">
                        <p className="font-bold text-lg mb-4">Total: ${total}</p>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full mb-2">
                            Checkout
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded-full"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
