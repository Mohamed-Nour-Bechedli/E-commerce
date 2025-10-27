import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavbarCategories = ({ categories }) => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
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

                    <div
                        className={`absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md py-2 transition-all duration-200 ease-in-out transform ${activeDropdown === idx
                            ? "opacity-100 translate-y-0 visible"
                            : "opacity-0 -translate-y-2 invisible"
                            } group-hover:visible`}
                    >
                        {cat.subCategories?.map((subCategory, i) => (
                            <Link
                                key={i}
                                to={`/category/${encodeURIComponent(cat.name)}?sub=${encodeURIComponent(subCategory)}`}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                {subCategory}
                            </Link>
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default NavbarCategories;
