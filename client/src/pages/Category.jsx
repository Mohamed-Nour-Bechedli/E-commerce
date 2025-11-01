import { useParams, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import Loader from "../components/common/Loader";
import ProductCard from "../components/products/ProductCard";

const Category = () => {
    const { categoryName } = useParams(); 
    const location = useLocation(); 
    const { products, loading } = useContext(ProductContext);

    // Extract the subcategory filter from the URL query string
    const queryParams = new URLSearchParams(location.search);
    const subCategoryFilter = queryParams.get("sub");

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (loading) return;

        // Filter products based on category and subcategory
        const filtered = products.filter(product => {
            const matchCategory = product.category?.toLowerCase() === categoryName.toLowerCase();
            const matchSubCategory = subCategoryFilter
                ? product.subCategory?.toLowerCase() === subCategoryFilter.toLowerCase()
                : true;
            return matchCategory && matchSubCategory;
        });

        setFilteredProducts(filtered);
    }, [categoryName, subCategoryFilter, loading, products]);

    if (loading) return <Loader />;

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center capitalize">
                    {categoryName}
                    {subCategoryFilter ? ` - ${subCategoryFilter}` : ""}
                </h2>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product._id} {...product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 text-lg">
                        No products found in this category{subCategoryFilter ? ` and subcategory` : ""}.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Category;
