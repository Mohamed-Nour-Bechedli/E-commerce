import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import Loader from "../components/common/Loader";
import ProductCard from "../components/products/ProductCard";

const Category = () => {
    const { categoryName } = useParams(); 
    const { products, loading } = useContext(ProductContext);

    if (loading) return <Loader />;

    // Filter products by category name 
    const filteredProducts = products.filter(
        (p) => p.category?.toLowerCase() === categoryName.toLowerCase()
    );

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center capitalize">
                    {categoryName}
                </h2>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 text-lg">
                        No products found in this category.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Category;
