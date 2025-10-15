import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig"; e

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    // Persistent login check
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axiosInstance
                .get("/auth/me") 
                .then((res) => setUser(res.data))
                .catch(() => {
                    localStorage.removeItem("token");
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    // LOGIN
    const loginUser = async (formData) => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.post("/auth/login", formData);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            return { success: true };
        } catch (err) {
            console.error(err);
            return { success: false, message: err.response?.data?.message || "Login failed" };
        } finally {
            setLoading(false);
        }
    };

    // REGISTER
    const registerUser = async (formData) => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.post("/auth/register", formData);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            return { success: true };
        } catch (err) {
            console.error(err);
            return { success: false, message: err.response?.data?.message || "Registration failed" };
        } finally {
            setLoading(false);
        }
    };

    // LOGOUT
    const logoutUser = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, registerUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
