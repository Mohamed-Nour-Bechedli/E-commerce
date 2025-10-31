import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../common/Loader";

const AdminProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <Loader />;

    // If not logged in → go to login
    if (!user) return <Navigate to="/login" replace />;

    // If logged in but not admin → redirect to home
    if (user.role !== "admin") return <Navigate to="/" replace />;

    // Admin can access
    return children;
};

export default AdminProtectedRoute;
