import { Link } from "react-router-dom";

const Checkout = () => {
    // Temporary mock cart summary
    const cartItems = [
        {
            id: 1,
            name: "Apple Watch Series 9",
            price: 599,
            quantity: 1,
        },
        {
            id: 2,
            name: "Gaming Laptop",
            price: 1299,
            quantity: 2,
        },
    ];

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Billing / Shipping Form */}
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-6 text-gray-900">Billing & Shipping</h2>

                        <form className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="text"
                                    placeholder="City"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Country"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit">
                        <h2 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h2>

                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between">
                                    <span className="text-gray-700">{item.name} x {item.quantity}</span>
                                    <span className="font-semibold text-gray-900">${item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Shipping</span>
                                <span>$15.00</span>
                            </div>
                            <div className="flex justify-between font-bold text-blue-600 text-lg">
                                <span>Total</span>
                                <span>${(subtotal + 15).toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium transition">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
