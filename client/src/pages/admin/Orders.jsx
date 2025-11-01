import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../api/axiosConfig";
import { AuthContext } from "../../context/AuthContext";

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updating, setUpdating] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch all orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!user) return;
                const res = await axiosInstance.get("/orders/all", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setOrders(res.data.orders);
                setFilteredOrders(res.data.orders);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to load orders.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    // Handle search by order ID
    useEffect(() => {
        if (!searchTerm) {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(
                orders.filter((o) =>
                    o._id.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, orders]);

    // Update order status
    const handleStatusChange = async (orderId, newStatus) => {
        if (!window.confirm(`Change status to ${newStatus}?`)) return;

        setUpdating(orderId);
        try {
            const res = await axiosInstance.put(
                `/orders/${orderId}/status`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setOrders((prev) =>
                prev.map((o) =>
                    o._id === orderId ? { ...o, status: res.data.updatedOrder.status } : o
                )
            );
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update order status.");
        } finally {
            setUpdating(null);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600 text-lg">Loading orders...</p>
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );

    if (orders.length === 0)
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600 text-lg">No orders found.</p>
            </div>
        );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Manage Orders</h1>

            {/* Search input */}
            <div className="mb-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by Order ID"
                    className="border rounded px-3 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full table-auto text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Order ID</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Products</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{order._id.slice(-6)}</td>
                                    <td className="p-3">
                                        {order.user?.name} <br />
                                        <span className="text-gray-500 text-xs">
                                            {order.user?.email}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        {order.products.map((p, index) => (
                                            <div key={index} className="text-sm">
                                                <span className="font-medium">{p.name}</span> × {p.quantity}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="p-3 font-semibold">${order.totalAmount.toFixed(2)}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "Pending"
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
                                    </td>
                                    <td className="p-3 text-center">
                                        <select
                                            className="border rounded px-2 py-1 text-sm"
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            disabled={updating === order._id}
                                        >
                                            <option>Pending</option>
                                            <option>Processing</option>
                                            <option>Shipped</option>
                                            <option>Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-gray-500">
                                    No orders match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
