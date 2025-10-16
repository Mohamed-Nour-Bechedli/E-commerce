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
            sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
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
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition"
                        >
                            <FaChevronLeft />
                        </button>
                    )}

                    {/* Products container */}
                    <div
                        ref={sliderRef}
                        className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth"
                    >
                        {filteredProducts.map((product) => (
                            <div key={product._id} className="min-w-[250px] flex-shrink-0">
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>

                    {/* Right arrow */}
                    {filteredProducts.length > 4 && (
                        <button
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition"
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
