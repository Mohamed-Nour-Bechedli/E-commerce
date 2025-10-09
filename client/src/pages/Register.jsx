import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/common/Loader";
import { Navigate, Link } from "react-router-dom";

const Register = () => {
    const { user, login, loading } = useContext(AuthContext); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    // redirect if already logged in
    if (user) return <Navigate to="/" replace />; 

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            {loading && <Loader />}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6">Register</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-md"
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-md"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-md"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition-all"
                >
                    Register
                </button>

                <p className="mt-4 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
