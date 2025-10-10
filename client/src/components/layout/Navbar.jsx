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
            <nav className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm relative z-50">
                <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Left: Logo */}
                    <NavbarLogo />

                    {/* Center: Categories */}
                    <NavbarCategories
                        categories={categories}
                        activeDropdown={activeDropdown}
                        setActiveDropdown={setActiveDropdown}
                    />

                    {/* Right: Search + Icons */}
                    <div className="flex items-center space-x-4">
                        <NavbarSearch
                            categories={categories}
                            showSearch={showSearch}
                            setShowSearch={setShowSearch}
                        />
                        <NavbarIcons
                            setIsCartOpen={setIsCartOpen}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            showSearch={showSearch}
                            setShowSearch={setShowSearch}
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
                />
            </nav>

            {/* Cart Sidebar */}
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navbar;
