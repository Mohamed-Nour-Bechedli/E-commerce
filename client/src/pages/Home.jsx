import ProductList from "../components/products/ProductList";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
    return (
        <div className="bg-gray-50">
            {/* Carousel Section */}
            <div className="relative w-full">
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    {/* Slide 1 */}
                    <div className="absolute block w-full h-full">
                        <img
                            src="https://via.placeholder.com/1200x400?text=Carousel+1"
                            alt="Slide 1"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    {/* Slide 2 */}
                    <div className="absolute block w-full h-full">
                        <img
                            src="https://via.placeholder.com/1200x400?text=Carousel+2"
                            alt="Slide 2"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    {/* Slide 3 */}
                    <div className="absolute block w-full h-full">
                        <img
                            src="https://via.placeholder.com/1200x400?text=Carousel+3"
                            alt="Slide 3"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    Categories
                </h2>
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Category Card */}
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
            <ProductList />
        </div>
    );
};

export default Home;
