import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Checkout = () => {
    const { cartItems, total } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    // Protected
    if (!user) return <Navigate to="/login" replace />; 

    if (cartItems.length === 0)
        return (
            <div className="max-w-4xl mx-auto px-4 py-10 text-center">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6">Checkout</h2>
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${item.price * item.quantity}</span>
                    </div>
                ))}
                <div className="flex justify-between font-bold text-xl border-t pt-4">
                    <span>Total:</span>
                    <span>${total}</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full">
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Checkout;
