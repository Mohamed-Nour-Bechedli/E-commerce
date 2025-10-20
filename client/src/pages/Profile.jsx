import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axiosConfig";
import Modal from "../components/common/Modal";
import { AiOutlineUpload, AiOutlineDelete } from "react-icons/ai"; // icons

const Profile = () => {
    const { user, updateUserImage } = useContext(AuthContext);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [image, setImage] = useState(
        user?.image
            ? `${user.image}?t=${Date.now()}`
            : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    );
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Update Profile Image
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axiosInstance.put("/users/profile/image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            // append timestamp to prevent caching
            const newImage = `${res.data.image}?t=${Date.now()}`;
            setImage(newImage);
            updateUserImage(newImage);
            setModalMessage("Profile image updated successfully!");
            setModalOpen(true);
        } catch (error) {
            console.error(error);
            setModalMessage("Failed to update image.");
            setModalOpen(true);
        }
    };

    // Remove Profile Image
    const handleRemoveImage = async () => {
        try {
            const res = await axiosInstance.delete("/users/profile/image");
            const newImage = `${res.data.image}?t=${Date.now()}`;
            setImage(newImage);
            updateUserImage(newImage);
            setModalMessage(res.data.message);
            setModalOpen(true);
        } catch (error) {
            console.error(error);
            setModalMessage("Failed to remove image.");
            setModalOpen(true);
        }
    };

    // Update Profile Info
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put("/users/profile", { name, email, phone });
            setModalMessage("Profile updated successfully!");
            setModalOpen(true);
        } catch (error) {
            console.error(error);
            setModalMessage(error.response?.data?.message || "Failed to update profile.");
            setModalOpen(true);
        }
    };

    // Change Password
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setModalMessage("New password and confirmation do not match.");
            setModalOpen(true);
            return;
        }

        try {
            await axiosInstance.put("/users/profile", {
                password: newPassword,
                currentPassword,
            });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setModalMessage("Password updated successfully!");
            setModalOpen(true);
        } catch (error) {
            console.error(error);
            setModalMessage(error.response?.data?.message || "Failed to update password.");
            setModalOpen(true);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">My Profile</h1>

            {/* Profile Image */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src={image}
                    alt={name}
                    className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg"
                />
                <div className="flex space-x-4">
                    {/* Upload Icon */}
                    <label className="cursor-pointer text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <AiOutlineUpload size={20} />
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>

                    {/* Remove Icon */}
                    <button
                        onClick={handleRemoveImage}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                        <AiOutlineDelete size={20} />
                        Remove Image
                    </button>
                </div>
            </div>

            {/* Profile Info Form */}
            <form onSubmit={handleProfileSubmit} className="space-y-4 mb-8">
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

            {/* Change Password Form */}
            <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Change Password</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition"
                    >
                        Update Password
                    </button>
                </form>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Profile Update">
                <p>{modalMessage}</p>
            </Modal>
        </div>
    );
};

export default Profile;
