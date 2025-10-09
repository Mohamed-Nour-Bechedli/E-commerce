import { useState, useContext } from "react";
import { FaUser, FaShoppingCart, FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import CartSidebar from "../cart/CartSidebar";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const { cartItems } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const categories = [
        {
            name: "PC Gamers",
            products: ["Gaming Laptop", "Custom PC Build", "Monitors"],
        },
        {
            name: "Smartphones",
            products: ["iPhone 15", "Samsung Galaxy S24", "OnePlus 12"],
        },
        {
            name: "Accessories",
            products: ["Keyboard", "Mouse", "Headphones"],
        },
    ];

    return (
        <>
            {/* Navbar */}
            <nav className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm relative z-50">
                <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Left: Logo */}
                    <div className="flex items-center space-x-4">
                        <Link to="/">
                            <img
                                src={Logo}
                                alt="Shop Logo"
                                className="h-16 w-auto md:h-20 object-contain"
                            />
                        </Link>
                    </div>

                    {/* Center: Categories */}
                    <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
                        {categories.map((cat, idx) => (
                            <li
                                key={idx}
                                className="relative group flex items-center cursor-pointer"
                                onMouseEnter={() => setActiveDropdown(idx)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <span className="flex items-center select-none">
                                    {cat.name}
                                    <FaChevronDown className="ml-1 text-gray-500 text-sm" />
                                </span>

                                {/* Dropdown with animation and persistent hover */}
                                <div
                                    className={`absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md py-2 transition-all duration-200 ease-in-out transform ${activeDropdown === idx
                                            ? "opacity-100 translate-y-0 visible"
                                            : "opacity-0 -translate-y-2 invisible"
                                        } group-hover:visible`}
                                >
                                    {cat.products.map((product, i) => (
                                        <Link
                                            key={i}
                                            to="#"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            {product}
                                        </Link>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Right: Search + Icons */}
                    <div className="flex items-center space-x-4">
                        {/* Search bar (desktop) */}
                        <div className="hidden md:block relative w-64">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>

                        {/* Search icon (mobile) */}
                        <button
                            className="md:hidden text-gray-700 hover:text-blue-600"
                            onClick={() => setShowSearch(!showSearch)}
                        >
                            <FaSearch size={20} />
                        </button>

                        {/* Account icon (auth-aware) */}
                        <Link
                            to={user ? "/profile" : "/login"}
                            className="text-gray-700 hover:text-blue-600"
                        >
                            <FaUser size={20} />
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

                        {/* Logout (only when logged in) */}
                        {user && (
                            <button
                                onClick={logout}
                                className="text-gray-700 hover:text-red-500 text-sm ml-2"
                            >
                                Logout
                            </button>
                        )}

                        {/* Hamburger menu (mobile) */}
                        <button
                            className="md:hidden text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>

                {/* Search bar for mobile */}
                {showSearch && (
                    <div className="md:hidden px-4 pb-3 animate-fadeIn">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                )}

                {/* Mobile dropdown menu */}
                {isOpen && (
                    <div className="md:hidden px-4 pb-4 space-y-3">
                        {categories.map((cat, idx) => (
                            <div key={idx}>
                                <button
                                    className="w-full text-left flex items-center justify-between text-gray-700 font-medium"
                                    onClick={() =>
                                        setActiveDropdown(activeDropdown === idx ? null : idx)
                                    }
                                >
                                    {cat.name}
                                    <FaChevronDown
                                        className={`ml-2 transition-transform duration-200 ${activeDropdown === idx ? "rotate-180" : "rotate-0"
                                            }`}
                                    />
                                </button>
                                {activeDropdown === idx && (
                                    <ul className="mt-2 ml-4 space-y-1">
                                        {cat.products.map((product, i) => (
                                            <li key={i}>
                                                <Link
                                                    to="#"
                                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                                                >
                                                    {product}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </nav>

            {/* Cart Sidebar */}
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navbar;
