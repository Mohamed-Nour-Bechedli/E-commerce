import { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(false);

    // Simulate login function
    const login = (email, password) => {
        setLoading(true);
        setTimeout(() => {
            // Temporary mock login
            setUser({ name: "John Doe", email });
            setLoading(false);
        }, 1000);
    };

    // Simulate logout
    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setUser(null);
            setLoading(false);
        }, 500);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
