import { FaUser, FaShoppingCart, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const NavbarIcons = ({ setIsCartOpen, isOpen, setIsOpen, showSearch, setShowSearch }) => {
    const { cartItems } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="flex items-center space-x-4">
            {/* Mobile search icon */}
            <button
                className="md:hidden text-gray-700 hover:text-blue-600"
                onClick={() => setShowSearch(!showSearch)}
            >
                <FaSearch size={20} />
            </button>

            {/* User icon / avatar */}
            <Link to={user ? "/profile" : "/login"} className="flex items-center">
                {user ? (
                    <img
                        src={user.image} // uses uploaded image or default from schema
                        alt={user.name || "User Avatar"}
                        className="w-6 h-6 rounded-full object-cover"
                    />
                ) : (
                    <FaUser size={20} className="text-gray-700 hover:text-blue-600" />
                )}
            </Link>

            {/* Cart icon */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="text-gray-700 hover:text-blue-600 relative"
            >
                <FaShoppingCart size={20} />
                {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1">
                        {totalQuantity}
                    </span>
                )}
            </button>

            {/* Logout button if user exists */}
            {user && (
                <button
                    onClick={logout}
                    className="text-gray-700 hover:text-red-500 text-sm ml-2"
                >
                    Logout
                </button>
            )}

            {/* Mobile menu toggle */}
            <button
                className="md:hidden text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
        </div>
    );
};

export default NavbarIcons;
