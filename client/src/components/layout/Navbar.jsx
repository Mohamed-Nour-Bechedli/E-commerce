import { useState, useContext, useEffect } from "react";
import {
    FaUser,
    FaShoppingCart,
    FaSearch,
    FaBars,
    FaTimes,
    FaChevronDown,
} from "react-icons/fa";
import Logo from "../../assets/logo.png";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CartSidebar from "../cart/CartSidebar";
import { ProductContext } from "../../context/ProductContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const { cartItems } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const { products } = useContext(ProductContext);
    const navigate = useNavigate();

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const categories = [
        { name: "PC Gamers", products: ["Gaming Laptop", "Custom PC Build", "Monitors"] },
        { name: "Smartphones", products: ["iPhone 15", "Samsung Galaxy S24", "OnePlus 12"] },
        { name: "Accessories", products: ["Keyboard", "Mouse", "Headphones"] },
    ];

    // FILTER SEARCH RESULTS
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        const query = searchQuery.toLowerCase();

        const productMatches = products.filter((p) =>
            p.name.toLowerCase().includes(query)
        );

        const categoryMatches = categories.filter((c) =>
            c.name.toLowerCase().includes(query)
        );

        setSearchResults([...categoryMatches, ...productMatches]);
    }, [searchQuery, products]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        const category = categories.find(
            (c) => c.name.toLowerCase() === searchQuery.toLowerCase()
        );
        if (category) {
            navigate(`/category/${encodeURIComponent(category.name)}`);
        } else {
            const product = products.find(
                (p) => p.name.toLowerCase() === searchQuery.toLowerCase()
            );
            if (product) navigate(`/product/${product.id}`);
        }

        setSearchQuery("");
        setSearchResults([]);
        setShowSearch(false);
    };

    const renderSuggestion = (item) => {
        const isCategory = item.products !== undefined;
        const linkTo = isCategory
            ? `/category/${encodeURIComponent(item.name)}`
            : `/product/${item.id}`;

        return (
            <div
                key={isCategory ? `cat-${item.name}` : `prod-${item.id}`}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                onClick={() => {
                    navigate(linkTo);
                    setSearchQuery("");
                    setSearchResults([]);
                    setShowSearch(false);
                }}
            >
                {isCategory ? (
                    <div className="flex-1 font-semibold text-gray-700">
                        Category: {item.name}
                    </div>
                ) : (
                    <>
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded mr-3"
                        />
                        <div className="flex-1">
                            <div className="text-gray-800 font-medium">{item.name}</div>
                            <div className="text-gray-500 text-sm">
                                {item.category} - ${item.price.toFixed(2)}
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    };

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
                                <Link
                                    to={`/category/${encodeURIComponent(cat.name)}`}
                                    className="flex items-center select-none"
                                >
                                    {cat.name}
                                    <FaChevronDown className="ml-1 text-gray-500 text-sm" />
                                </Link>

                                {/* Dropdown */}
                                <div
                                    className={`absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md py-2 transition-all duration-200 ease-in-out transform ${activeDropdown === idx
                                            ? "opacity-100 translate-y-0 visible"
                                            : "opacity-0 -translate-y-2 invisible"
                                        } group-hover:visible`}
                                >
                                    {cat.products.map((product, i) => (
                                        <Link
                                            key={i}
                                            to={`/category/${encodeURIComponent(cat.name)}`}
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
                        <form
                            onSubmit={handleSearchSubmit}
                            className="hidden md:block relative w-64"
                        >
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <FaSearch
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={handleSearchSubmit}
                            />

                            {/* Suggestions dropdown */}
                            {searchResults.length > 0 && (
                                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1 z-50 max-h-72 overflow-y-auto">
                                    {searchResults.map(renderSuggestion)}
                                </div>
                            )}
                        </form>

                        {/* Search icon (mobile) */}
                        <button
                            className="md:hidden text-gray-700 hover:text-blue-600"
                            onClick={() => setShowSearch(!showSearch)}
                        >
                            <FaSearch size={20} />
                        </button>

                        {/* Account icon */}
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
                    <form
                        onSubmit={handleSearchSubmit}
                        className="md:hidden px-4 pb-3 animate-fadeIn relative"
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <FaSearch
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={handleSearchSubmit}
                        />

                        {searchResults.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1 z-50 max-h-72 overflow-y-auto">
                                {searchResults.map(renderSuggestion)}
                            </div>
                        )}
                    </form>
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
                                                    to={`/category/${encodeURIComponent(cat.name)}`}
                                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                                                    onClick={() => setIsOpen(false)}
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
