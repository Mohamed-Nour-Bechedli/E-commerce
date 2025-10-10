import { useState } from "react";
import NavbarLogo from "./NavbarLogo";
import NavbarCategories from "./NavbarCategories";
import NavbarSearch from "./NavbarSearch";
import NavbarIcons from "./NavbarIcons";
import NavbarMobileMenu from "./NavbarMobileMenu";
import CartSidebar from "../cart/CartSidebar";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const categories = [
        { name: "PC Gamers", products: ["Gaming Laptop", "Custom PC Build", "Monitors"] },
        { name: "Smartphones", products: ["iPhone 15", "Samsung Galaxy S24", "OnePlus 12"] },
        { name: "Accessories", products: ["Keyboard", "Mouse", "Headphones"] },
    ];

    return (
        <>
            <nav className="bg-white border-b border-gray-200 shadow-md relative z-50">
                <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">

                    {/* Left: Logo */}
                    <NavbarLogo className="text-sky-500 hover:text-sky-600 transition-colors" />

                    {/* Center: Categories */}
                    <NavbarCategories
                        categories={categories}
                        activeDropdown={activeDropdown}
                        setActiveDropdown={setActiveDropdown}
                        className="hidden md:flex space-x-6 text-gray-800 font-medium"
                        dropdownClassName="bg-white shadow-lg rounded-lg p-4 text-gray-800"
                        hoverTextColor="text-sky-500"
                    />

                    {/* Right: Search + Icons */}
                    <div className="flex items-center space-x-4">
                        <NavbarSearch
                            categories={categories}
                            showSearch={showSearch}
                            setShowSearch={setShowSearch}
                            inputClassName="pl-10 pr-3 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                        />
                        <NavbarIcons
                            setIsCartOpen={setIsCartOpen}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            showSearch={showSearch}
                            setShowSearch={setShowSearch}
                            iconClassName="text-gray-800 hover:text-sky-500 transition-colors"
                            cartBadgeClassName="bg-sky-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-2"
                        />
                    </div>
                </div>

                {/* Mobile Menu */}
                <NavbarMobileMenu
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    categories={categories}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                    mobileMenuClassName="bg-white shadow-md p-4"
                />
            </nav>

            {/* Cart Sidebar */}
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navbar;
