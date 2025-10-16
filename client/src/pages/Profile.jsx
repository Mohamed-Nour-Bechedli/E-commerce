import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axiosConfig";
import Modal from "../components/common/Modal";

const Profile = () => {
    const { user, updateUserImage } = useContext(AuthContext);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [image, setImage] = useState(user?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Upload image to backend
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axiosInstance.put("/users/profile/image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setImage(res.data.image);
            updateUserImage(res.data.image); // Update context
            setModalMessage("Profile image updated successfully!");
            setModalOpen(true);
        } catch (error) {
            console.error(error);
            setModalMessage("Failed to update image.");
            setModalOpen(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.put("/users/profile", { name, email, phone });
            setModalMessage("Profile updated successfully!");
            setModalOpen(true);
        } catch (error) {
            console.error(error);
            setModalMessage("Failed to update profile.");
            setModalOpen(true);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">My Profile</h1>

            {/* Profile Image */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src={image}
                    alt={name}
                    className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg"
                />
                <label className="cursor-pointer text-blue-600 hover:underline">
                    Change Profile Image
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone number"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
                >
                    Update Profile
                </button>
            </form>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Profile Update">
                <p>{modalMessage}</p>
            </Modal>
        </div>
    );
};

export default Profile;
