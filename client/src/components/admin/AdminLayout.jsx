import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaHome, FaBoxOpen, FaListAlt, FaSignOutAlt } from "react-icons/fa";

const AdminLayout = () => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Security fallback — just in case
    if (!user || user.role !== "admin") {
        navigate("/");
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700">Admin Panel</h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-2 rounded-md ${isActive
                                ? "bg-blue-500 text-white"
                                : "text-gray-700 hover:bg-gray-200"}`
                        }
                    >
                        <FaHome /> Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/products"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-2 rounded-md ${isActive
                                ? "bg-blue-500 text-white"
                                : "text-gray-700 hover:bg-gray-200"}`
                        }
                    >
                        <FaBoxOpen /> Create Product
                    </NavLink>

                    <NavLink
                        to="/admin/orders"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-2 rounded-md ${isActive
                                ? "bg-blue-500 text-white"
                                : "text-gray-700 hover:bg-gray-200"}`
                        }
                    >
                        <FaListAlt /> Orders
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-red-600 hover:text-red-700"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
