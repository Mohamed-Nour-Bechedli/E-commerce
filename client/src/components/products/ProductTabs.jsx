import { useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductTabs = () => {
    const { products } = useContext(ProductContext);
    const [activeTab, setActiveTab] = useState("new");

    const filteredProducts =
        activeTab === "new"
            ? products.filter((p) => p.isNew)
            : products.filter((p) => p.salePrice && p.salePrice < p.price);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">
                        No products found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;
