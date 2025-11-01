import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom"; 
import axiosInstance from "../api/axiosConfig";

const Checkout = () => {
    const { cartItems, total, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); 

    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        address: "",
        city: "",
        zip: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [apiError, setApiError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (!user) return <Navigate to="/login" replace />;

    if (cartItems.length === 0)
        return (
            <div className="max-w-4xl mx-auto px-4 py-10 text-center">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
            </div>
        );

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        if (!form.address.trim()) newErrors.address = "Address is required";
        if (!form.city.trim()) newErrors.city = "City is required";
        if (!form.zip.trim()) newErrors.zip = "ZIP code is required";
        if (!form.phone.trim()) newErrors.phone = "Phone number is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) return;

        setSubmitting(true);
        setApiError("");

        try {
            const products = cartItems.map((item) => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
            }));

            const payload = {
                products,
                totalAmount: total,
                phone: form.phone,
            };

            const res = await axiosInstance.post("/orders", payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (res.status === 201) {
                setOrderPlaced(true);
                clearCart();
                navigate("/orders"); 
            }
        } catch (error) {
            console.error("Order placement error:", error);
            setApiError(
                error.response?.data?.message || "Failed to place the order."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6">Checkout</h2>

            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                {/* Cart Summary */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
                    {cartItems.map((item) => (
                        <div key={item._id} className="flex justify-between mb-2">
                            <span>
                                {item.name} x {item.quantity}
                            </span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Shipping Form */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}

                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}

                        <input
                            type="text"
                            name="zip"
                            value={form.zip}
                            onChange={handleChange}
                            placeholder="ZIP Code"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.zip && <p className="text-red-600 text-sm">{errors.zip}</p>}

                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
                    </div>
                </div>

                {/* Payment Method */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
                    <p className="text-gray-700">Cash on Delivery</p>
                </div>

                {apiError && <p className="text-red-600 text-center">{apiError}</p>}

                <button
                    onClick={handlePlaceOrder}
                    disabled={submitting}
                    className={`w-full py-3 rounded-full font-medium transition-all duration-300 text-white ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {submitting ? "Placing Order..." : "Place Order"}
                </button>
            </div>
        </div>
    );
};

export default Checkout;
