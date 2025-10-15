import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize auth state from localStorage on app load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    _id: decoded._id,
                    name: decoded.name,
                    email: decoded.email,
                    role: decoded.role,
                    image: decoded.image,
                    verified: true,
                });
            } catch (error) {
                console.error("Token decode error:", error);
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    // LOGIN
    const loginUser = async ({ email, password }) => {
        try {
            const res = await axiosInstance.post("/users/login", { email, password });
            const token = res.data.token;
            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);
            setUser({
                _id: decoded._id,
                name: decoded.name,
                email: decoded.email,
                role: decoded.role,
                image: decoded.image,
                verified: true,
            });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login failed",
            };
        }
    };

    // REGISTER
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

    // LOGOUT
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    // VERIFY EMAIL & AUTO-LOGIN
    const verifyEmail = async (token) => {
        try {
            const res = await axiosInstance.get(`/users/verify/${token}`);
            if (res.data.success && res.data.token) {
                // Save token
                localStorage.setItem("token", res.data.token);

                // Set user state
                setUser(res.data.user);

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

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                loginUser,
                registerUser,
                logout,
                verifyEmail,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};
