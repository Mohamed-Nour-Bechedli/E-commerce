import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../common/Loader";

const AdminProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [checking, setChecking] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Only check after AuthContext finishes loading
        if (!loading) {
            if (user && user.role === "admin") {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
            setChecking(false);
        }
    }, [user, loading]);

    // Still verifying show loader
    if (loading || checking) return <Loader />;

    // Not logged in send to login
    if (!user) return <Navigate to="/login" replace />;

    // Logged in but not admin send to home
    if (user.role !== "admin") return <Navigate to="/" replace />;

    // Admin access granted
    return children;
};

export default AdminProtectedRoute;
