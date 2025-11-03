import { useState, useEffect, useContext } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const HeroCarousel = () => {
    const { products, loading } = useContext(ProductContext);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const navigate = useNavigate();

    // Filter featured products
    useEffect(() => {
        if (!loading) {
            const featured = products.filter((p) => p.isFeatured);
            setFeaturedProducts(featured);
        }
    }, [products, loading]);

    // Autoplay every 3 seconds
    useEffect(() => {
        if (featuredProducts.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [featuredProducts]);

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? featuredProducts.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    };

    if (loading || featuredProducts.length === 0) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <p>Loading featured products...</p>
            </div>
        );
    }

    console.log("featured product:", featuredProducts);

    return (
        <div className="relative w-full h-[80vh] min-h-[400px] overflow-hidden bg-gray-200">
            {featuredProducts.map((product, idx) => (
                <div
                    key={product._id}
                    className="absolute top-0 left-0 w-full h-full transition-opacity duration-700"
                    style={{
                        opacity: idx === currentSlide ? 1 : 0,
                        zIndex: idx === currentSlide ? 10 : 0,
                    }}
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover min-h-[400px]"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white px-4 pointer-events-none">
                        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
                            {product.name}
                        </h1>
                        <p className="text-lg sm:text-xl mb-4">{product.description}</p>
                        <div className="mb-6 text-2xl sm:text-3xl font-bold">
                            {product.salePrice ? (
                                <>
                                    <span className="text-red-500 mr-2">
                                        ${product.salePrice.toFixed(2)}
                                    </span>
                                    <span className="line-through text-gray-300">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                <span>${product.price.toFixed(2)}</span>
                            )}
                        </div>
                        <button
                            onClick={() => navigate("/products")}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center space-x-2 transition pointer-events-auto"
                        >
                            <span>Shop Now</span> <FaArrowRight />
                        </button>
                    </div>
                </div>
            ))}

            {/* Left/Right Arrows */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 z-20"
            >
                <FaArrowLeft />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 z-20"
            >
                <FaArrowRight />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
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
