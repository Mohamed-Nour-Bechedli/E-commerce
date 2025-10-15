import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return setLoading(false);

                // fetch user profile from backend
                const res = await axiosInstance.get("/users/profile");
                setUser(res.data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // login method 
    const loginUser = async ({ email, password }) => {
        try {
            const res = await axiosInstance.post("/users/login", { email, password });
            localStorage.setItem("token", res.data.token);

            // fetch user profile after login
            const profileRes = await axiosInstance.get("/users/profile");
            setUser(profileRes.data);

            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
    };

    // register method 
    const registerUser = async ({ name, email, password }) => {
        try {
            const res = await axiosInstance.post("/users/register", { name, email, password });
            return { success: true, message: res.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Registration failed" };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, registerUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
