import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const NavbarMobileMenu = ({
    isOpen,
    setIsOpen,
    categories,
    activeDropdown,
    setActiveDropdown,
}) => {
    if (!isOpen) return null;

    return (
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
    );
};

export default NavbarMobileMenu;
