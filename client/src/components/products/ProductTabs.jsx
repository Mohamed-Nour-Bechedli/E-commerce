import { useState, useContext, useRef } from "react";
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
            const cardWidth = sliderRef.current.firstChild.offsetWidth + 24; 
            sliderRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            const cardWidth = sliderRef.current.firstChild.offsetWidth + 24; 
            sliderRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Tabs */}
            <div className="flex justify-center mb-8 space-x-6">
                <button
                    className={`px-6 py-2 rounded-full font-medium transition ${activeTab === "new"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    onClick={() => setActiveTab("new")}
                >
                    New Arrivals
                </button>
                <button
                    className={`px-6 py-2 rounded-full font-medium transition ${activeTab === "sales"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    onClick={() => setActiveTab("sales")}
                >
                    Sales
                </button>
            </div>

            {/* Carousel */}
            {filteredProducts.length > 0 ? (
                <div className="relative">
                    {/* Left arrow */}
                    {filteredProducts.length > 4 && (
                        <button
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 hover:bg-white shadow-lg p-3 rounded-full transition backdrop-blur-sm"
                        >
                            <FaChevronLeft />
                        </button>
                    )}

                    {/* Products container */}
                    <div
                        ref={sliderRef}
                        className="flex space-x-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
                    >
                        {filteredProducts.map((product) => (
                            <div key={product._id} className="min-w-[250px] flex-shrink-0 snap-start">
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>

                    {/* Right arrow */}
                    {filteredProducts.length > 4 && (
                        <button
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 hover:bg-white shadow-lg p-3 rounded-full transition backdrop-blur-sm"
                        >
                            <FaChevronRight />
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
