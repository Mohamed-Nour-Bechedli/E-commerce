import { useState, useEffect, useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";

const HeroCarousel = () => {
    const { products, loading } = useContext(ProductContext);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    // Filter featured products whenever products change
    useEffect(() => {
        if (!loading) {
            const featured = products.filter((product) => product.isFeatured);
            setFeaturedProducts(featured);
        }
    }, [products, loading]);

    // Auto slide change
    useEffect(() => {
        if (featuredProducts.length === 0) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [featuredProducts]);

    if (loading || featuredProducts.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading featured products...</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {featuredProducts.map((product, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white px-4">
                        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
                            {product.name}
                        </h1>
                        <p className="text-lg sm:text-xl mb-4">
                            {product.description}
                        </p>
                        <div className="mb-6 text-2xl sm:text-3xl font-bold">
                            {product.salePrice ? (
                                <span>
                                    <span className="text-red-500 mr-2">
                                        ${product.salePrice.toFixed(2)}
                                    </span>
                                    <span className="line-through text-gray-300">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </span>
                            ) : (
                                <span>${product.price.toFixed(2)}</span>
                            )}
                        </div>
                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center space-x-2 transition">
                            <span>Shop Now</span> <FaArrowRight />
                        </button>
                    </div>
                </div>
            ))}

            {/* Dots indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {featuredProducts.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-3 h-3 rounded-full transition ${currentSlide === idx ? "bg-white" : "bg-gray-400"
                            }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
