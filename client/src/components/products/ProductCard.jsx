import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ id, name, price, image }) => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 mx-auto sm:mx-0">
            {/* Product image links to details */}
            <Link to={`/product/${id}`}>
                <img
                    className="p-4 sm:p-6 rounded-t-lg object-contain h-48 sm:h-60 w-full"
                    src={image}
                    alt={name}
                />
            </Link>

            <div className="px-4 sm:px-5 pb-5">
                <Link to={`/product/${id}`}>
                    <h5 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3 hover:text-blue-600 transition">
                        {name}
                    </h5>
                </Link>

                <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        ${price}
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
