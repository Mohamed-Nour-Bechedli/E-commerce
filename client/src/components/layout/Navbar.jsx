import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
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

    const { user } = useContext(AuthContext);

    // Hardcoded categories with subcategories
    const categories = [
        {
            name: "PC Gamers",
            subCategories: ["Gaming Laptop", "Custom PC Build", "Monitors"]
        },
        {
            name: "Smartphones",
            subCategories: ["iPhone", "Android", "Other"]
        },
        {
            name: "Accessories",
            subCategories: ["Keyboard", "Mouse", "Headphones"]
        }
    ];

    return (
        <>
            <nav className="bg-white border-b border-gray-200 shadow-md relative z-50">
                <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
                    <NavbarLogo className="text-sky-500 hover:text-sky-600 transition-colors" />

                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/products"
                            className="text-gray-800 font-medium hover:text-sky-500 transition-colors"
                        >
                            Products
                        </Link>

                        <NavbarCategories
                            categories={categories}
                            activeDropdown={activeDropdown}
                            setActiveDropdown={setActiveDropdown}
                        />
                    </div>

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
                            userAvatar={user?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                        />
                    </div>
                </div>

                <NavbarMobileMenu
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    categories={categories}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                    mobileMenuClassName="bg-white shadow-md p-4"
                />
            </nav>

            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navbar;
