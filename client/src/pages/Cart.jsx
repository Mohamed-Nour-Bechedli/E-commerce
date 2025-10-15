import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
    const { cartItems, removeFromCart, total, clearCart, updateQuantity } =
        useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleProtectedAction = (action) => {
        if (!user) {
            navigate("/login");
            return;
        }
        action();
    };

    if (cartItems.length === 0)
        return (
            <div className="max-w-4xl mx-auto px-4 py-10 text-center">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <Link to="/" className="text-blue-600 hover:underline">
                    Go Shopping
                </Link>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-contain"
                        />
                        <div className="flex-1 px-4">
                            <h3 className="font-semibold text-gray-900">
                                {item.name}
                            </h3>
                            <p className="text-gray-700">${item.price}</p>

                            {/* Quantity selector */}
                            <div className="flex items-center mt-2 space-x-2">
                                <button
                                    onClick={() =>
                                        handleProtectedAction(() =>
                                            updateQuantity(item.id, item.quantity - 1)
                                        )
                                    }
                                    className="bg-gray-200 px-2 rounded"
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() =>
                                        handleProtectedAction(() =>
                                            updateQuantity(item.id, item.quantity + 1)
                                        )
                                    }
                                    className="bg-gray-200 px-2 rounded"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() =>
                                handleProtectedAction(() => removeFromCart(item.id))
                            }
                            className="text-red-600 hover:text-red-800"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
                <p className="text-xl font-bold">Total: ${total}</p>
                <div className="space-x-4">
                    <button
                        onClick={() => handleProtectedAction(clearCart)}
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-full"
                    >
                        Clear Cart
                    </button>
                    <button
                        onClick={() => handleProtectedAction(() => navigate("/checkout"))}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
