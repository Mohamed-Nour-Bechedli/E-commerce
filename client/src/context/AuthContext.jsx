import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user profile
    const fetchUserProfile = async () => {
        try {
            const res = await axiosInstance.get("/users/profile");
            const profileData = res.data;

            // Use backend-provided image directly (backend already includes timestamp)
            profileData.image = profileData.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

            setUser(profileData);
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                jwtDecode(token);
                fetchUserProfile();
            } catch (error) {
                console.error("Token decode error:", error);
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const loginUser = async ({ email, password }) => {
        try {
            const res = await axiosInstance.post("/users/login", { email, password });
            const token = res.data.token;
            localStorage.setItem("token", token);
            await fetchUserProfile();

            // Return user for role-based navigation
            return { success: true, user: res.data.user };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login failed",
            };
        }
    };


    const registerUser = async ({ name, email, password }) => {
        try {
            const res = await axiosInstance.post("/users/register", { name, email, password });
            return { success: true, message: res.data.message };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed",
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const verifyEmail = async (token) => {
        try {
            const res = await axiosInstance.get(`/users/verify/${token}`);
            if (res.data.success && res.data.token) {
                localStorage.setItem("token", res.data.token);
                await fetchUserProfile();
                return { success: true };
            } else {
                return { success: false, message: res.data.message };
            }
        } catch (error) {
            console.error("Email verification failed:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Verification failed",
            };
        }
    };

    // Update user image in context
    const updateUserImage = (newImage) => {
        setUser((prevUser) => (prevUser ? { ...prevUser, image: newImage } : null));
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                loginUser,
                registerUser,
                logout,
                verifyEmail,
                updateUserImage,
                fetchUserProfile,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};
