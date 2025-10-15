import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "./ProductCard";
import Loader from "../common/Loader";

const ProductList = () => {
    const { products, loading } = useContext(ProductContext);

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
                Our Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        {...product} 
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
