import { useState, useContext, useRef, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductTabs = () => {
    const { products } = useContext(ProductContext);
    const [activeTab, setActiveTab] = useState("new");
    const sliderRef = useRef(null);

    const filteredProducts =
        activeTab === "new"
            ? products.filter((p) => p.isNew)
            : products.filter((p) => p.salePrice && p.salePrice < p.price);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    // Optional: hide scrollbar on all browsers
    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.scrollbarWidth = "none"; // Firefox
            sliderRef.current.style.msOverflowStyle = "none"; // IE 10+
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Tabs */}
            <div className="flex justify-center mb-8 relative">
                <div className="flex space-x-4 bg-gray-100 rounded-full p-1 shadow-inner">
                    <button
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === "new"
                                ? "bg-white shadow text-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                            }`}
                        onClick={() => setActiveTab("new")}
                    >
                        New Arrivals
                    </button>
                    <button
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === "sales"
                                ? "bg-white shadow text-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                            }`}
                        onClick={() => setActiveTab("sales")}
                    >
                        Sales
                    </button>
                </div>
            </div>

            {/* Carousel */}
            {filteredProducts.length > 0 ? (
                <div className="relative">
                    {/* Left arrow */}
                    {filteredProducts.length > 4 && (
                        <button
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 shadow-lg p-3 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                        >
                            <FaChevronLeft className="text-lg" />
                        </button>
                    )}

                    {/* Products container */}
                    <div
                        ref={sliderRef}
                        className="flex space-x-6 overflow-x-auto overflow-y-hidden scroll-smooth py-2 scrollbar-hide"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="min-w-[250px] flex-shrink-0 transform transition duration-300 hover:scale-105"
                            >
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>

                    {/* Right arrow */}
                    {filteredProducts.length > 4 && (
                        <button
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 shadow-lg p-3 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                        >
                            <FaChevronRight className="text-lg" />
                        </button>
                    )}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-6">
                    No products found.
                </p>
            )}
        </div>
    );
};

export default ProductTabs;
