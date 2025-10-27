import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axiosInstance.get(`/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setOrder(res.data.order);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load order.");
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchOrder();
    }, [id, user]);

    const handleCancelOrder = async () => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        setCancelling(true);
        try {
            await axiosInstance.put(
                `/orders/${id}/status`,
                { status: "Cancelled" },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setOrder({ ...order, status: "Cancelled" });
        } catch (err) {
            alert(err.response?.data?.message || "Failed to cancel order.");
        } finally {
            setCancelling(false);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading order...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
    if (!order) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Order Details</h1>

            <div className="border rounded-lg shadow-sm p-4 bg-white space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">
                        Order #{order._id.slice(-6)}
                    </h2>
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : order.status === "Processing"
                                    ? "bg-blue-100 text-blue-700"
                                    : order.status === "Shipped"
                                        ? "bg-purple-100 text-purple-700"
                                        : order.status === "Delivered"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {order.status}
                    </span>
                </div>

                <div className="space-y-2">
                    {order.products.map((product) => (
                        <div
                            key={product.productId}
                            className="flex items-center justify-between border-b pb-2"
                        >
                            <div className="flex items-center space-x-3">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-gray-500 text-sm">
                                        Qty: {product.quantity}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 font-semibold">
                                ${(product.price * product.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <p className="text-gray-600 text-sm">
                        Placed on: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="font-bold text-gray-800">
                        Total: ${order.totalAmount.toFixed(2)}
                    </p>
                </div>

                {order.status === "Pending" && (
                    <button
                        onClick={handleCancelOrder}
                        disabled={cancelling}
                        className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-all duration-300"
                    >
                        {cancelling ? "Cancelling..." : "Cancel Order"}
                    </button>
                )}
            </div>

            <button
                className="mt-6 text-blue-600 hover:underline"
                onClick={() => navigate("/orders")}
            >
                ← Back to Orders
            </button>
        </div>
    );
};

export default OrderDetails;
