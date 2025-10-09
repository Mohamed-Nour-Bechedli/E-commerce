import { useContext } from "react";
import ProductList from "../components/products/ProductList";
import { FaArrowRight } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext";
import Loader from "../components/common/Loader";

const Home = () => {
    const { products, loading } = useContext(ProductContext);

    if (loading) return <Loader />; // show loader while fetching

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Carousel Section */}
            <div className="relative w-full">
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    {["Carousel+1", "Carousel+2", "Carousel+3"].map((text, idx) => (
                        <div key={idx} className="absolute block w-full h-full">
                            <img
                                src={`https://via.placeholder.com/1200x400?text=${text}`}
                                alt={text}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Categories</h2>
                <div className="flex flex-col sm:flex-row gap-6">
                    {["PC Gamers", "Smartphones", "Accessories"].map((category) => (
                        <div
                            key={category}
                            className="relative flex-1 bg-white rounded-lg shadow-md h-40 flex items-center justify-center group cursor-pointer overflow-hidden"
                        >
                            <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
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
            <ProductList /> {/* already uses ProductContext */}
        </div>
    );
};

export default Home;
