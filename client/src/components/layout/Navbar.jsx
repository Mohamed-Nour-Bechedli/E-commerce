import { useState } from "react";
import { FaUser, FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        alt="Shop Logo"
                        className="h-8 w-auto"
                    />
                    <span className="text-2xl font-semibold text-gray-800">ShopName</span>
                </div>

                {/* Desktop Search Bar */}
                <div className="relative w-1/3 hidden md:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>

                {/* Desktop Links + Icons */}
                <div className="hidden md:flex items-center space-x-6">
                    <ul className="flex space-x-6 text-gray-700 font-medium">
                        <li>
                            <a href="#" className="hover:text-blue-600 transition">Home</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600 transition">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600 transition">Contact</a>
                        </li>
                    </ul>
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
                <div className="md:hidden flex items-center space-x-3">
                    <button className="text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    <ul className="flex flex-col space-y-2 text-gray-700 font-medium">
                        <li>
                            <a href="#" className="hover:text-blue-600 transition">Home</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600 transition">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600 transition">Contact</a>
                        </li>
                    </ul>
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
}
