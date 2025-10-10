import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

const HeroCarousel = () => {
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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
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
    );
};

export default HeroCarousel;
