import { useState, useEffect, useContext } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const HeroCarousel = () => {
    const { products, loading } = useContext(ProductContext);
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const featuredProducts = products.filter((p) => p.isFeatured);

    // Autoplay
    useEffect(() => {
        if (featuredProducts.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [featuredProducts]);

    if (loading)
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <p>Loading featured products...</p>
            </div>
        );

    if (featuredProducts.length === 0)
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <p>No featured products available.</p>
            </div>
        );

    return (
        <div className="relative w-full h-[75vh] bg-gray-100 overflow-hidden rounded-2xl shadow-lg">
            {featuredProducts.map((product, idx) => (
                <div
                    key={product._id}
                    className={`absolute inset-0 flex transition-opacity duration-700 ease-in-out ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {/* Left side: Product image */}
                    <div className="w-1/2 h-full">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right side: Text info */}
                    <div className="w-1/2 flex flex-col justify-center px-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
                        <h1 className="text-5xl font-extrabold mb-4">{product.name}</h1>
                        <p className="text-lg mb-6 text-gray-200">{product.description}</p>

                        <div className="text-3xl font-semibold mb-6">
                            {product.salePrice ? (
                                <>
                                    <span className="text-red-400 mr-2">
                                        ${product.salePrice.toFixed(2)}
                                    </span>
                                    <span className="line-through text-gray-400">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                <span>${product.price.toFixed(2)}</span>
                            )}
                        </div>

                        <button
                            onClick={() => navigate("/products")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold w-fit transition-all duration-300"
                        >
                            Shop Now
                        </button>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={() =>
                    setCurrentSlide((prev) =>
                        prev === 0 ? featuredProducts.length - 1 : prev - 1
                    )
                }
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
            >
                <FaArrowLeft size={20} />
            </button>
            <button
                onClick={() =>
                    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
                }
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
            >
                <FaArrowRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
