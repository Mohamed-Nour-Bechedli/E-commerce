import { FaShoppingCart } from "react-icons/fa";

const ProductCard = () => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 mx-auto sm:mx-0">
            <a href="#">
                <img
                    className="p-4 sm:p-6 rounded-t-lg object-contain h-48 sm:h-60 w-full"
                    src="/docs/images/products/apple-watch.png"
                    alt="Apple Watch"
                />
            </a>
            <div className="px-4 sm:px-5 pb-5">
                <a href="#">
                    <h5 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3">
                        Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                    </h5>
                </a>
                <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        $599
                    </span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg">
                        <FaShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
