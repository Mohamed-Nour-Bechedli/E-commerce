import pcGamersImg from "../assets/PC_Gamer.jpg";
import smartphonesImg from "../assets/Smartphones.jpg";
import accessoriesImg from "../assets/Accessories.png";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import Loader from "../components/common/Loader";
import HeroCarousel from "../components/HeroCarousel";
import ProductTabs from "../components/products/ProductTabs";
import { FaArrowRight, FaShippingFast, FaLock, FaUndo, FaHeadset } from "react-icons/fa";

const Home = () => {
    const { loading } = useContext(ProductContext);

    if (loading) return <Loader />;

    const categories = [
        { name: "PC Gamers", img: pcGamersImg },
        { name: "Smartphones", img: smartphonesImg },
        { name: "Accessories", img: accessoriesImg },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <HeroCarousel />

            {/* CATEGORIES */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold mb-10 text-gray-900 text-center">
                    Shop by Category
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            to={`/category/${category.name}`}
                            className="relative bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col items-center"
                        >
                            {/* Image with fixed height */}
                            <div className="w-full h-64 flex items-center justify-center">
                                <img
                                    src={category.img}
                                    alt={category.name}
                                    className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            {/* Caption below image */}
                            <div className="w-full bg-black bg-opacity-50 text-white text-center py-2">
                                <h3 className="text-lg font-semibold">{category.name}</h3>
                                <span className="inline-flex items-center mt-1">
                                    Discover Now <FaArrowRight className="ml-1" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <ProductTabs />

            {/* Benefits */}
            <section className="bg-white py-16 mt-10 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
                            <FaShippingFast className="text-3xl" />
                        </div>
                        <h4 className="font-semibold text-lg mb-2 text-gray-900">Free Shipping</h4>
                        <p className="text-gray-600 text-sm">Orders over $50</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-green-100 text-green-600 p-4 rounded-full mb-4">
                            <FaLock className="text-3xl" />
                        </div>
                        <h4 className="font-semibold text-lg mb-2 text-gray-900">Secure Payment</h4>
                        <p className="text-gray-600 text-sm">Safe and encrypted</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full mb-4">
                            <FaUndo className="text-3xl" />
                        </div>
                        <h4 className="font-semibold text-lg mb-2 text-gray-900">Easy Returns</h4>
                        <p className="text-gray-600 text-sm">Return within 14 days</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-4">
                            <FaHeadset className="text-3xl" />
                        </div>
                        <h4 className="font-semibold text-lg mb-2 text-gray-900">24/7 Support</h4>
                        <p className="text-gray-600 text-sm">Anytime help</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
