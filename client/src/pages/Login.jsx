import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/common/Loader";
import { Navigate, Link } from "react-router-dom";

const Login = () => {
    const { user, login, loading } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    // Redirect if logged in
    if (user) return <Navigate to="/" replace />; 

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            {loading && <Loader />}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-md"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-md"
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full">
                    Login
                </button>
                <p className="mt-4 text-sm">
                    Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
