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
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 12;

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

    // Handle search by order ID or customer name
    useEffect(() => {
        if (!searchTerm) {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(
                orders.filter(
                    (o) =>
                        o._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        o.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
        setCurrentPage(1); // Reset to first page on search
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

    // Pagination helpers
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

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
                    placeholder="Search by Order ID or Customer Name"
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
                            <th className="p-3">Phone</th>
                            <th className="p-3">Products</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.length > 0 ? (
                            currentOrders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-b hover:bg-gray-50 cursor-pointer"
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <td className="p-3">{order._id.slice(-6)}</td>
                                    <td className="p-3">
                                        {order.user?.name} <br />
                                        <span className="text-gray-500 text-xs">{order.user?.email}</span>
                                    </td>
                                    <td className="p-3">{order.phone}</td>
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
                                            onClick={(e) => e.stopPropagation()}
                                            disabled={updating === order._id}
                                        >
                                            <option>Pending</option>
                                            <option>Processing</option>
                                            <option>Shipped</option>
                                            <option>Delivered</option>
                                            <option>Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="p-4 text-center text-gray-500">
                                    No orders match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            {filteredOrders.length > ordersPerPage && (
                <div className="flex justify-center mt-4 space-x-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-2 py-2">{currentPage} / {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setSelectedOrder(null)}
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-4">Order Details</h2>
                        <p>
                            <strong>Order ID:</strong> {selectedOrder._id}
                        </p>
                        <p>
                            <strong>Customer:</strong> {selectedOrder.user?.name} ({selectedOrder.user?.email})
                        </p>
                        <p>
                            <strong>Phone:</strong> {selectedOrder.phone}
                        </p>
                        <p className="mt-2 font-semibold">Products:</p>
                        <ul className="list-disc ml-5">
                            {selectedOrder.products.map((p, i) => (
                                <li key={i}>
                                    {p.name} × {p.quantity} (${(p.price * p.quantity).toFixed(2)})
                                </li>
                            ))}
                        </ul>
                        <p className="mt-2 font-bold">Total: ${selectedOrder.totalAmount.toFixed(2)}</p>
                        <p>
                            <strong>Status:</strong> {selectedOrder.status}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
