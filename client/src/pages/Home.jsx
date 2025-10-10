import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import Loader from "../components/common/Loader";
import HeroCarousel from "../components/HeroCarousel";
import ProductTabs from "../components/products/ProductTabs";
import { FaArrowRight, FaShippingFast, FaLock, FaUndo, FaHeadset } from "react-icons/fa";

const Home = () => {
    const { loading } = useContext(ProductContext);

    if (loading) return <Loader />;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* HERO CAROUSEL */}
            <HeroCarousel />

            {/* CATEGORIES SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold mb-10 text-gray-900 text-center">
                    Shop by Category
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                        {
                            name: "PC Gamers",
                            img: "https://via.placeholder.com/600x400?text=PC+Gamers",
                        },
                        {
                            name: "Smartphones",
                            img: "https://via.placeholder.com/600x400?text=Smartphones",
                        },
                        {
                            name: "Accessories",
                            img: "https://via.placeholder.com/600x400?text=Accessories",
                        },
                    ].map((category) => (
                        <div
                            key={category.name}
                            className="relative bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer hover:shadow-xl transition"
                        >
                            <img
                                src={category.img}
                                alt={category.name}
                                className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-500"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition flex flex-col items-center justify-center text-white">
                                <h3 className="text-2xl font-semibold mb-2">
                                    {category.name}
                                </h3>
                                <span className="flex items-center opacity-0 group-hover:opacity-100 transition">
                                    Discover Now
                                    <FaArrowRight className="ml-2" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PRODUCT TABS */}
            <ProductTabs />

            {/* BENEFITS SECTION */}
            <section className="bg-white py-16 mt-10 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {/* Free Shipping */}
                    <div className="flex flex-col items-center">
                        <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
                            <FaShippingFast className="text-3xl" />
                        </div>
                        <h4 className="font-semibold text-lg mb-2 text-gray-900">
                            Free Shipping
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Enjoy free shipping on all orders over $50.
                        </p>
                    </div>

                    {/* Secure Payment */}
                    <div className="flex flex-col items-center">
                        <div className="bg-green-100 text-green-600 p-4 rounded-full mb-4">
                            <FaLock className="text-3xl" />
                        </div>
                        <h4 className="font-semibold text-lg mb-2 text-gray-900">
                            Secure Payment
                        </h4>
                        <p className="text-gray-600 text-sm">
                            We ensure your payments are safe and encrypted.
                        </p>
                    </div>

                    {/* Easy Returns */}
                    <div className="flex flex-col items-center">
                        <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full mb-4">
                            <FaUndo className="text-3xl" />
                        </div>
                        <h4 className="font-semibold text-lg mb-2 text-gray-900">
                            Easy Returns
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Not satisfied? Return your order within 14 days.
                        </p>
                    </div>

                    {/* 24/7 Support */}
                    <div className="flex flex-col items-center">
                        <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-4">
                            <FaHeadset className="text-3xl" />
                        </div>
                        <h4 className="font-semibold text-lg mb-2 text-gray-900">
                            24/7 Support
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Our support team is here anytime you need help.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
