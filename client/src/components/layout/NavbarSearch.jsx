import { useState, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

const NavbarSearch = ({ categories, showSearch, setShowSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { products } = useContext(ProductContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!searchQuery.trim()) return setSearchResults([]);
        const query = searchQuery.toLowerCase();
        const productMatches = products.filter((p) =>
            p.name.toLowerCase().includes(query)
        );
        const categoryMatches = categories.filter((c) =>
            c.name.toLowerCase().includes(query)
        );
        setSearchResults([...categoryMatches, ...productMatches]);
    }, [searchQuery, products, categories]);

    const handleSearchSubmit = (e) => {
        e?.preventDefault();
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
            {/* Desktop Search */}
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

                {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1 z-50 max-h-72 overflow-y-auto">
                        {searchResults.map(renderSuggestion)}
                    </div>
                )}
            </form>

            {/* Mobile Search */}
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
        </>
    );
};

export default NavbarSearch;
