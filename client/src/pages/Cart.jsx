import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
    // Temporary mock cart data
    const cartItems = [
        {
            id: 1,
            name: "Apple Watch Series 9",
            price: 599,
            image: "https://via.placeholder.com/400x300?text=Apple+Watch",
            quantity: 1,
        },
        {
            id: 2,
            name: "Gaming Laptop",
            price: 1299,
            image: "https://via.placeholder.com/400x300?text=Gaming+Laptop",
            quantity: 2,
        },
    ];

    // Calculate subtotal
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

                {/* Empty cart message */}
                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
                        <Link
                            to="/"
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-full font-medium transition"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 py-4 last:border-b-0"
                                >
                                    <div className="flex items-center space-x-4 w-full sm:w-auto">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 object-contain rounded-lg border"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-600 font-medium">${item.price}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                                        {/* Quantity Selector */}
                                        <div className="flex items-center border rounded-md">
                                            <button className="px-3 py-1 text-gray-700 hover:bg-gray-200 transition">
                                                -
                                            </button>
                                            <span className="px-4 py-1 text-gray-800 font-medium">
                                                {item.quantity}
                                            </span>
                                            <button className="px-3 py-1 text-gray-700 hover:bg-gray-200 transition">
                                                +
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button className="text-red-600 hover:text-red-700 transition">
                                            <FaTrashAlt size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Section */}
                        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                            <div className="flex justify-between mb-3">
                                <span className="text-gray-700">Subtotal:</span>
                                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-6">
                                <span className="text-gray-700">Shipping:</span>
                                <span className="font-semibold text-gray-900">$15.00</span>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 pt-4 mb-6">
                                <span className="text-lg font-bold text-gray-900">Total:</span>
                                <span className="text-lg font-bold text-blue-600">
                                    ${(subtotal + 15).toFixed(2)}
                                </span>
                            </div>

                            <Link
                                to="/checkout"
                                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium transition"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
