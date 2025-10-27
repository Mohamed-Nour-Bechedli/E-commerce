import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!user) return;

                const res = await axiosInstance.get("/orders", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                setOrders(res.data.orders);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to load your orders."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600 text-lg">Loading your orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600 text-lg">You haven’t placed any orders yet.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">My Orders</h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <Link key={order._id} to={`/orders/${order._id}`}>
                        <div className="border rounded-lg shadow-sm p-4 bg-white hover:bg-gray-50 transition">
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
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Orders;
