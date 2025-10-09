import { useState, useEffect, useContext } from "react";
import ProductList from "../components/products/ProductList";
import { FaArrowRight } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";
import Loader from "../components/common/Loader";

const Home = () => {
    const { products, loading } = useContext(ProductContext);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            img: "https://via.placeholder.com/1920x1080?text=Carousel+1",
            title: "Explore Powerful PC Gamers",
            desc: "Experience high performance for gaming and productivity.",
        },
        {
            img: "https://via.placeholder.com/1920x1080?text=Carousel+2",
            title: "Latest Smartphones",
            desc: "Stay connected with the newest mobile technology.",
        },
        {
            img: "https://via.placeholder.com/1920x1080?text=Carousel+3",
            title: "Accessories That Complete You",
            desc: "Find the perfect additions for your setup.",
        },
    ];

    // Auto slide every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    if (loading) return <Loader />;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Full-Screen Auto Carousel Section */}
            <div className="relative w-full h-screen overflow-hidden">
                {slides.map((slide, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    >
                        <img
                            src={slide.img}
                            alt={slide.title}
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white px-4">
                            <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
                                {slide.title}
                            </h1>
                            <p className="text-lg sm:text-xl mb-6">{slide.desc}</p>
                            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center space-x-2 transition">
                                <span>Shop Now</span> <FaArrowRight />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Dots indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-3 h-3 rounded-full transition ${currentSlide === idx ? "bg-white" : "bg-gray-400"
                                }`}
                        ></button>
                    ))}
                </div>
            </div>

            {/* Categories Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
                    Categories
                </h2>
                <div className="flex flex-col sm:flex-row gap-6">
                    {["PC Gamers", "Smartphones", "Accessories"].map((category) => (
                        <div
                            key={category}
                            className="relative flex-1 bg-white rounded-lg shadow-md h-40 flex items-center justify-center group cursor-pointer overflow-hidden"
                        >
                            <h3 className="text-xl font-semibold text-gray-900 z-10">
                                {category}
                            </h3>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition duration-300">
                                <span className="text-white text-lg flex items-center opacity-0 group-hover:opacity-100 transition duration-300">
                                    Discover Now <FaArrowRight className="ml-2" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Products Section */}
            <ProductList />
        </div>
    );
};

export default Home;
