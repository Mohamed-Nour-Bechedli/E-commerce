import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/products/ProductCard";
import Loader from "../components/common/Loader";

const Products = () => {
    const { products, loading } = useContext(ProductContext);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;

    // Category filter state
    const categories = [...new Set(products.map((p) => p.category))]; 
    const [selectedCategories, setSelectedCategories] = useState([]);

    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
        setCurrentPage(1); 
    };

    // Filter products
    const filteredProducts =
        selectedCategories.length > 0
            ? products.filter((p) => selectedCategories.includes(p.category))
            : products;

    // Pagination logic
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex gap-6">
            {/* Sidebar */}
            <aside className="w-1/4 border-r pr-4">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                {categories.map((category) => (
                    <label key={category} className="block mb-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="mr-2"
                        />
                        {category}
                    </label>
                ))}
            </aside>

            {/* Products Grid */}
            <section className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {currentProducts.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6 space-x-2">
                        {[...Array(totalPages)].map((_, idx) => (
                            <button
                                key={idx + 1}
                                onClick={() => setCurrentPage(idx + 1)}
                                className={`px-3 py-1 rounded ${currentPage === idx + 1
                                        ? "bg-sky-500 text-white"
                                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    }`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Products;
