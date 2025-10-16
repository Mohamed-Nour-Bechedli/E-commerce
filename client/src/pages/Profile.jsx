import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axiosConfig";
import Modal from "../components/common/Modal";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
    const { user, updateUserImage, updateUserData } = useContext(AuthContext);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [image, setImage] = useState(user?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);

    // Fetch recent orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axiosInstance.get("/orders/my-orders");
                setOrders(res.data || []);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setOrdersLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Upload profile image
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axiosInstance.put("/users/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setImage(res.data.user.image);
            updateUserImage(res.data.user.image);
            setModalMessage("Profile image updated successfully!");
            setModalOpen(true);
        } catch (error) {
            console.error(error);
            setModalMessage(error?.response?.data?.message || "Failed to update image.");
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    // Update profile data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axiosInstance.put("/users/profile", { name, email, phone });
            updateUserData(res.data.user);
            setModalMessage(res.data.message || "Profile updated successfully!");
            setModalOpen(true);
        } catch (error) {
            console.error(error);
            setModalMessage(error?.response?.data?.message || "Failed to update profile.");
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold mb-10 text-gray-900 text-center">My Profile</h1>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Profile Section */}
                <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                    <div className="relative mb-6">
                        <img
                            src={image}
                            alt={name}
                            className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-gray-100"
                        />
                        <label className="absolute bottom-0 right-0 cursor-pointer bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-700 transition">
                            <FaCamera className="text-white" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Phone</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                placeholder="Enter phone number"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Profile"}
                        </button>
                    </form>
                </div>

                {/* Recent Orders Section */}
                <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Recent Orders</h2>

                    {ordersLoading ? (
                        <p>Loading orders...</p>
                    ) : orders.length === 0 ? (
                        <p className="text-gray-500">No orders found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border border-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border-b">Order ID</th>
                                        <th className="px-4 py-2 border-b">Date</th>
                                        <th className="px-4 py-2 border-b">Total</th>
                                        <th className="px-4 py-2 border-b">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-2 border-b">{order._id.slice(-6)}</td>
                                            <td className="px-4 py-2 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="px-4 py-2 border-b">${order.total.toFixed(2)}</td>
                                            <td className="px-4 py-2 border-b capitalize">{order.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Profile Update">
                <p>{modalMessage}</p>
            </Modal>
        </div>
    );
};

export default Profile;
