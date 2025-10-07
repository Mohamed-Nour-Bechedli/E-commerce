import { useState } from "react";
import { FaUser, FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/logo.png"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-50 border border-gray-200 rounded-lg">
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo + Categories */}
                <div className="flex items-center space-x-10">
                    <div className="flex items-center">
                        <img
                            src={Logo}
                            alt="Shop Logo"
                            className="h-16 w-auto md:h-20 object-contain" 
                        />
                    </div>

                    {/* Categories for desktop */}
                    <ul className="hidden md:flex space-x-4 text-gray-700 font-medium">
                        <li>
                            <a href="#" className="hover:text-blue-600 transition">PC Gamers</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600 transition">Smartphones</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600 transition">Accessories</a>
                        </li>
                    </ul>
                </div>

                {/* Desktop Search + Icons */}
                <div className="hidden md:flex items-center space-x-6">
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-700 hover:text-blue-600">
                            <FaUser size={20} />
                        </button>
                        <button className="text-gray-700 hover:text-blue-600 relative">
                            <FaShoppingCart size={20} />
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1">
                                2
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center">
                    <button
                        className="text-gray-700 hover:text-blue-600"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3">
                    {/* Search bar for mobile */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>

                    {/* Categories for mobile */}
                    <ul className="flex flex-col space-y-2 text-gray-700 font-medium">
                        <li>
                            <a href="#" className="hover:text-blue-600 transition">PC Gamers</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600 transition">Smartphones</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600 transition">Accessories</a>
                        </li>
                    </ul>

                    {/* Icons */}
                    <div className="flex space-x-4 mt-2">
                        <button className="text-gray-700 hover:text-blue-600">
                            <FaUser size={20} />
                        </button>
                        <button className="text-gray-700 hover:text-blue-600 relative">
                            <FaShoppingCart size={20} />
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1">
                                2
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
