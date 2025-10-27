import { FaUser, FaShoppingCart, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const NavbarIcons = ({
    setIsCartOpen,
    isOpen,
    setIsOpen,
    showSearch,
    setShowSearch,
    iconClassName = "text-gray-700 hover:text-blue-600",
    cartBadgeClassName = "bg-blue-600 text-white text-xs rounded-full px-1",
    userAvatar
}) => {
    const { cartItems } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate("/");
    };

    return (
        <div className="flex items-center space-x-4 relative">

            {/* Mobile search icon */}
            <button
                className="md:hidden text-gray-700 hover:text-blue-600"
                onClick={() => setShowSearch(!showSearch)}
            >
                <FaSearch size={20} />
            </button>

            {/* User avatar with dropdown */}
            {user ? (
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={`w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none ${iconClassName}`}
                    >
                        <img
                            src={user.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                        />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                        className={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 transform transition-all duration-200 origin-top-right
                            ${dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                    >
                        <Link
                            to="/profile"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => setDropdownOpen(false)}
                        >
                            Profile
                        </Link>
                        <Link
                            to="/orders"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => setDropdownOpen(false)}
                        >
                            Orders
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <Link to="/login" className={iconClassName}>
                    <FaUser size={20} />
                </Link>
            )}

            {/* Shopping cart */}
            <button
                onClick={() => setIsCartOpen(true)}
                className={`relative ${iconClassName}`}
            >
                <FaShoppingCart size={20} />
                {totalQuantity > 0 && (
                    <span
                        className={cartBadgeClassName}
                        style={{
                            position: "absolute",
                            top: "-0.35rem",  // Move the badge slightly up from the icon
                            right: "-0.35rem", // Move the badge slightly right from the icon
                            width: ".9rem",  // Smaller width
                            height: ".9rem", // Smaller height
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",  // Smaller font size for the number
                            borderRadius: "50%",  // Ensure the badge remains circular
                        }}
                    >
                        {totalQuantity}
                    </span>
                )}
            </button>


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
